import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhone] = useState("");

  const postData = async () => {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.append("phonenumber", phonenumber);
      // const config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      console.log(user, "token");
      await axios.post("http://localhost:3006/users/register", data);
      Swal.fire("Success", "Add Recipes Success", "success");
    } catch (err) {
      Swal.fire("Failed", "Add Recipes Fails", "error");
      console.log(err);
    }
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
          <div className="col-lg-4 offset-1">
            <h3 className="text-warning text-center">Let’s Get Started !</h3>
            <h6 className="text-center">
              Create new account to access all features
            </h6>
            <hr />
            <form onSubmit={postData}>
              <label for="basic-url" className="form-label">
                Name
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="fullname_user"
                  aria-describedby="basic-addon3"
                  placeholder="Name"
                />
              </div>
              <label for="basic-url" className="form-label mt-4">
                Email address*
              </label>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email_user"
                  aria-describedby="basic-addon3"
                  placeholder="Enter email address"
                />
              </div>
              <label for="basic-url" className="form-label mt-4">
                Phone Number
              </label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  value={phonenumber}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  aria-describedby="basic-addon3"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <label for="basic-url" className="form-label mt-4">
                Create New Password
              </label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password_user"
                  aria-describedby="basic-addon3"
                  placeholder="Create New Password"
                />
              </div>
              {/* <label for="basic-url" className="form-label mt-4">
                New Password
              </label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="basic-addon3"
                  placeholder="New Password"
                />
              </div> */}
              <button
                type="submit"
                className="btn btn-warning text-white mt-4"
                style={{ position: "absolute", width: "420px", height: "50px" }}
              >
                Register Account
              </button>
            </form>
            <Link href="/login">
              <h6
                style={{ marginTop: "100px", marginRight: "50px" }}
                className="text-center"
              >
                Already have account?{" "}
                <p
                  className="text-warning "
                  style={{ marginLeft: "250px", marginTop: "-19px" }}
                >
                  Log in Here
                </p>
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
