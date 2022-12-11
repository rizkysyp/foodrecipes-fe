import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

const register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    otp: "",
    email: "",
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
      await axios.post("http://localhost:3006/users/verif", user);

      Swal.fire("Success", "Verifiaction Success,Silahkan Login", "success");
      router.push("/auth/login");
    } catch (err) {
      console.log(user.email);
      if (err.response.data.message == "email not found") {
        return Swal.fire("Warning", "Email Not Found", "error");
      } else {
        return Swal.fire("Warning", "wrong Verification Token", "error");
      }
    }
  };
  return (
    <>
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

          <div className="col-lg-4 offset-2">
            <h3 className="text-warning text-center">Let’s Get Started !</h3>
            <h6 className="text-center">
              Create new account to access all features
            </h6>
            <hr />
            <form onSubmit={handleSubmit}>
              <label for="basic-url" className="form-label">
                Email
              </label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Masukan Email"
                  onChange={handleChange}
                  name="email"
                  aria-describedby="basic-addon3"
                  className="form-control"
                />
              </div>

              <label for="basic-url" className="form-label">
                Kode Verifikasi
              </label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  placeholder="Masukan Kode Aktivasi"
                  onChange={handleChange}
                  name="otp"
                  className="form-control"
                />
              </div>
            </form>
            <button
              className="btn btn-primary mt-2"
              title="Register"
              onClick={handleSubmit}
              style={{ width: "420px", backgroundColor: "#EFC81A" }}
            >
              Button
            </button>
            <h6
              style={{
                marginTop: "20px",
                textDecoration: "none",
                color: "#999999",
              }}
              className="text-center"
            >
              Already Had Account?
              <Link href="/auth/login" style={{ textDecoration: "none" }}>
                <p
                  className="text-warning "
                  style={{
                    marginLeft: "250px",
                    marginTop: "-19px",
                    textDecoration: "none",
                    color: "#999999",
                  }}
                >
                  Sign in
                </p>
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
