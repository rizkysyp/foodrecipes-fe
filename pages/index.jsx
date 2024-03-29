import Head from "next/head";
import Image from "next/image";

import Navbar from "../components/module/Navbar/Navbar";
import Button from "../components/module/Button/button";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Home({ isLogin, href, children }) {
  const [data, setData] = useState([]);
  console.log(process.env.REACT_APP_BACKEND_API_HOST, "data");
  useEffect(() => {
    const getdata = async () => {
      try {
        const limit = 6;
        let result = await axios.get(
          `http://localhost:3006/recipes/search?limit=${limit}`
        );
        setData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    Router.push(href);
  };
  return (
    <>
      <header>
        <Navbar isLogin={isLogin} />
      </header>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4" style={{ marginTop: "150px" }}>
            <h1>
              <p>Discover Recipe</p>
              <p>& Delicious Food</p>
            </h1>
            <input
              type="text"
              className="form-control rounded-2 bg-light"
              name="search"
              placeholder="Search Restaurant,Food"
              style={{ height: "60px" }}
            />
          </div>
          <div
            className="col-5 offset-2"
            style={{ marginBottom: "120px", marginTop: "70px" }}
          >
            <Image src="/Icon/food1.png" height={530} width={530} priority />
          </div>
          <div className="row align-items-center">
            <div className="col-1">
              <div
                style={{
                  backgroundColor: "#EFC81A",
                  height: "100px",
                  width: "25px",
                }}
              ></div>
            </div>
            <div className="col-11">
              <h3 className="mt-1">Popular For You !</h3>
            </div>
            <div className="col-8 mt-5">
              <Image src="/Icon/food2.png" height={530} width={530} priority />
            </div>
            <div className="col-4">
              <h1>Healthy Bone Broth Ramen(Quick & Easy)</h1>
              <div
                style={{
                  backgroundColor: "#6F6A40",
                  height: "1px",
                  width: "100px",
                  marginTop: "20px",
                }}
              />
              <p className="mt-2">
                Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in
                a hurry? That’s right!
              </p>

              <Button title="Learn More" />
            </div>
          </div>
          <div className="row align-items-center mt-5">
            <div className="col-1">
              <div
                style={{
                  backgroundColor: "#EFC81A",
                  height: "100px",
                  width: "25px",
                }}
              ></div>
            </div>
            <div className="col-11">
              <h3>Popular Recipes</h3>
            </div>
          </div>
          <div className="row align-items-center mt-5">
            {data ? (
              data.map((item) => (
                <div className="col-3 mt-5 d-flex flex-column">
                  <img
                    src={item.photo}
                    style={{ height: "300px", width: "300px" }}
                    className="rounded"
                    onClick={() => Router.push(`/recipes/${item.id_recipes}`)}
                  />
                  <h6
                    style={{ marginTop: "-40px", marginLeft: "20px" }}
                    className=""
                  >
                    {item.recipes_name}
                  </h6>
                </div>
              ))
            ) : (
              <h3>Loading</h3>
            )}
          </div>
        </div>
      </div>
      {/* <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div> */}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  return {
    props: {
      isLogin: token ? true : false,
    },
  };
};
