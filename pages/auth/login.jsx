import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const config = {
        withCredentials: true,
      };
      const result = await axios.post(
        "http://localhost:3006/users/login",
        user,
        config
      );
      console.log(user);
      if (result.data.message === "email not found") {
        Swal.fire(
          "Warning",
          "Email Not Found, Please check if your email are registered",
          "error"
        );
        //router push
      } else if (result.data.message === "wrong password") {
        Swal.fire("Warning", "Wrong Password", "error");
      } else {
        const token = result.data.data.token;
        const data = {
          token: token,
        };
        const cookie = await fetch("/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const checkToken = await cookie.json();
        if (!checkToken) {
          return Swal.fire("Warning", "Login Failed", "error");
        }
        Swal.fire("Success", "Login Success,Returning to home", "success");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div
              style={{
                backgroundImage: `url(/Icon/backgroundauth.png)`,
                height: "900px",
                width: "700px",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(/Icon/Rectangle.png)`,
                  height: "100%",
                  width: "100%",
                  opacity: "0.5",
                }}
                className="col p-4 "
              >
                <Image
                  src="/Icon/logo.png"
                  width={300}
                  height={300}
                  style={{
                    opacity: "1",
                    marginTop: "300px",
                    marginLeft: "180px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-1 ml-5">
            <label for="basic-url" className="form-label">
              E-mail
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            />
            <label for="basic-url" className="form-label mt-2">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter your Password"
              name="password"
              onChange={handleChange}
            />
            <br />
            <button
              className="btn btn-warning text-white"
              style={{ position: "absolute", width: "415px", height: "50px" }}
              title={loading ? "Logging in.." : "Login"}
              onClick={handleSubmit}
            >
              Login
            </button>

            <Link href="/forgot-password">
              <h6 style={{ marginTop: "80px" }} className="text-end">
                Forgot Password ?
              </h6>
            </Link>

            <Link href="/register">
              <h6 style={{ marginTop: "20px" }} className="text-center">
                Don’t have an account?{" "}
                <p
                  className="text-warning "
                  style={{ marginLeft: "250px", marginTop: "-19px" }}
                >
                  Sign Up
                </p>
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = context.req.cookies;
  console.log(token);
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        isLogin: false,
      },
    };
  }
};
export default login;
