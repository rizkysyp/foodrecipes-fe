import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

const Header = ({ isLogin }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await fetch("/api/logout");
      const { logout } = await result.json();
      if (logout) {
        Swal.fire("success", "Anda Berhasil Logout", "success");
        router.push("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="navbar">
        {!isLogin ? (
          <div>
            <p>
              <Link href="/auth/login">Login</Link>
            </p>
          </div>
        ) : (
          <div>
            <button
              onClick={handleLogout}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
