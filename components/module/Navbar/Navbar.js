import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ isLogin }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const result = await fetch("api/logout");
      const { logout } = await result.json();
      if (logout) {
        Swal.fire("Success", "User Logout", "success");
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(isLogin);
  };
  return (
    <div>
      <div className="navbar">
        <div className="d-flex flex-row">
          <div className="p-2">
            <Link href="/">Home</Link>
          </div>
          <div className="p-2">
            <Link href="/recipes/addRecipes">Add Recipes</Link>
          </div>
          <div className="p-2">
            <Link href="/profile">Profile</Link>
          </div>
          <div className="p-2">
            <Link href="/recipes/search">Search</Link>
          </div>
        </div>
        {!isLogin ? (
          <div className="d-flex flex-row-reverse">
            <p>
              <Link href={`/auth/login`}>Login</Link>
            </p>
          </div>
        ) : (
          <div
            className="d-flex flex-row-reverse mt-2"
            style={{ marginRight: "60px" }}
          >
            <p
              onClick={handleLogout}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
