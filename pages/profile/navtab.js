import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image from "next/image";
// import { useSelector } from "react-redux";
import axios from "axios";

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
  console.log(token, "ssr");
  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

const NavTabs = ({ isLogin, token }) => {
  const [key, setKey] = useState("myrecipe");
  const [data, setData] = useState([]);
  const user = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(token, "token");
  useEffect(() => {
    const getdata = async () => {
      try {
        let result = await axios.get(
          `http://localhost:3006/recipes/user-recipes/`,
          {
            ...user,
          }
        );
        setData(result.data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);
  return (
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
              {data ? (
                data.map((item) => (
                  <div className="col-3">
                    <Image src={item.photo} height={300} width={300} />
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
                ))
              ) : (
                <div>Loading</div>
              )}
            </div>
          </Tab>
          <Tab eventKey="savedrecipe" title="Saved Recipe">
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
  );
};
export default NavTabs;
