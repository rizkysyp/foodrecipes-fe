import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

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
  console.log(token, "token ssr");
  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

const editPhoto = ({ token }) => {
  // const router = useRouter();
  const [upload, setUpload] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState({});
  const [video, setVideo] = useState([]);
  const [description, setDescription] = useState("");

  const handleImage = (e) => {
    setPhoto({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleVideo = (e) => {
    setVideo({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleRecipes = async () => {
    try {
      setUpload(true);
      const data = new FormData();
      
      data.append("photo", photo.file);
      // const config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const user = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(user, "token");
      await axios.put("http://localhost:3006/recipes", data, user);
      Swal.fire("Success", "Add Recipes Success", "success");
    } catch (err) {
      Swal.fire("Failed", "Add Recipes Fails", "error");
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-items-center">
          <div>
            <p>Photo</p>
            <input
              type="file"
              name="photo"
              accept="image/*"
              placeholder="Photo"
              onChange={handleImage}
              className="form-control bg-light"
              style={{ height: "400px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default editPhoto;
