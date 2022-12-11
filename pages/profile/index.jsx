import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import Navbar from "../../components/module/Navbar/Navbar";
export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

const profile = ({ isLogin, token }) => {
  const [key, setKey] = useState("myrecipe");
  const [recipes, setRecipes] = useState([]);
  const [profile, setProfile] = useState([]);
  const user = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(token, "token");
  useEffect(() => {
    const getProfile = async () => {
      try {
        let result = await axios.get(`http://localhost:3006/users/`, {
          ...user,
        });
        setProfile(result.data.data);
        console.log(recipes);
      } catch (error) {
        console.log(error);
      }
    };

    const getRecipes = async () => {
      try {
        let result = await axios.get(
          `http://localhost:3006/recipes/user-recipes/`,
          {
            ...user,
          }
        );
        setRecipes(result.data.data);
        console.log(recipes);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes(), getProfile();
  }, []);
  return (
    <>
      <header>
        <Navbar isLogin={isLogin} />
      </header>
      <div className="container">
        <div>
          {profile ? (
            profile.map((item) => (
              <div>
                <div className="row justify-content-center">
                  <div className="col-1">
                    <div
                      style={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        width: "200px",
                        height: "200px",
                      }}
                    >
                      <Image
                        src={item.photo}
                        width={200}
                        height={200}
                        className="rounded-full"
                      ></Image>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center mt-5 ml-5">
                  <div className="col-1">Edit Photo</div>
                </div>
                <div className="row">
                  <div
                    className="col-6"
                    style={{ marginLeft: "600px", marginTop: "-50px" }}
                  >
                    <h4>{item.name}</h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>Loading</h1>
            </div>
          )}
        </div>

        {/* navbar */}
        <div className="row">
          <div className="container text-start  rounded-2 mt-1 bg-white">
            <div className="row  rounded-3">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="myrecipe" title="My Recipe">
                  <div className="row">
                    {recipes ? (
                      recipes.map((item) => (
                        <div className="col-3">
                          <div
                            style={{ borderRadius: "10%", overflow: "hidden" }}
                          >
                            <Image src={item.photo} height={300} width={300} />
                          </div>
                          <h4
                            style={{
                              marginTop: "-40px",
                              marginLeft: "13px",
                              color: "white",
                            }}
                          >
                            {item.recipes_name}
                          </h4>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h1>Loading</h1>
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="savedrecipe" title="Saved Recipe">
                  <div className="row">
                    <div className="col-3">
                      <div>
                        <Image
                          src="/food9.png"
                          height={300}
                          width={300}
                          className="rounded"
                        />
                      </div>
                      <h4
                        style={{
                          marginTop: "-40px",
                          marginLeft: "13px",
                          color: "white",
                        }}
                      >
                        Indian Salad
                      </h4>
                    </div>
                    <div className="col-3">
                      <Image src="/food9.png" height={300} width={300} />
                      <h4
                        style={{
                          marginTop: "-40px",
                          marginLeft: "13px",
                          color: "white",
                        }}
                      >
                        Indian Salad
                      </h4>
                    </div>
                    <div className="col-3">
                      <Image src="/food9.png" height={300} width={300} />
                      <h4
                        style={{
                          marginTop: "-40px",
                          marginLeft: "13px",
                          color: "white",
                        }}
                      >
                        Indian Salad
                      </h4>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="likedrecipe" title="Liked Recipe">
                  <div className="row">
                    <div className="col-3">
                      <Image src="/food9.png" height={300} width={300} />
                      <h4
                        style={{
                          marginTop: "-40px",
                          marginLeft: "13px",
                          color: "white",
                        }}
                      >
                        Indian Salad
                      </h4>
                    </div>
                    <div className="col-3">
                      <Image src="/food9.png" height={300} width={300} />
                      <h4
                        style={{
                          marginTop: "-40px",
                          marginLeft: "13px",
                          color: "white",
                        }}
                      >
                        Indian Salad
                      </h4>
                    </div>
                    <div className="col-3">
                      <Image src="/food9.png" height={300} width={300} />
                      <h4
                        style={{
                          marginTop: "-40px",
                          marginLeft: "13px",
                          color: "white",
                        }}
                      >
                        Indian Salad
                      </h4>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
