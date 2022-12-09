import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const result = await axios.post(
        "http://localhost:3006/users/register",
        user
      );
      console.log(result.data.message);
      if (result.data.status === 403) {
        Swal.fire("Warning", "Email Already Registered", "error");
        router.push("/auth/login");
        console.log(result);
      } else {
        Swal.fire("Success", "Register Success", "success");
        router.push("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            name="name"
          />
          <p>E-mail</p>
          <input
            type="text"
            placeholder="Enter your email"
            onChange={handleChange}
            name="email"
          />
          <p>Phone Number</p>
          <input
            type="number"
            placeholder="Enter your phone Number"
            onChange={handleChange}
            name="phonenumber"
          />
          <p>Create New Password</p>
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            name="password"
          />
        </form>
        <button
          className="btn btn-primary"
          title="Register"
          onClick={handleSubmit}
        >
          Button
        </button>
      </div>
    </>
  );
};

export default register;
