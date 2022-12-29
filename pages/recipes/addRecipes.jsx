import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { useState } from "react";
import { Navbar } from "react-bootstrap";

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
      isLogin: token ? true : false,
      token: token,
    },
  };
};

const addRecipes = ({ isLogin, token }) => {
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
      data.append("name", name);
      data.append("description", description);
      data.append("photo", photo.file);
      data.append("video", video.file);
      // const config = {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const user = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(user, "token");
      await axios.post(process.env.HOST + "recipes", data, user);
      Swal.fire("Success", "Add Recipes Success", "success");
    } catch (err) {
      Swal.fire("Failed", "Add Recipes Fails", "error");
      console.log(err);
    }
  };

  return (
    <>
      <header>
        <Navbar isLogin={isLogin} />
      </header>
      <div className="container">
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

        <div className="row">
          <div className="col-lg-12">
            <p>Tittle</p>
            <input
              className="form-control bg-light"
              type="text"
              placeholder="Tittle"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <p>Ingredients</p>
        <textarea
          id="exampleFormControlTextarea1"
          className="form-control bg-light"
          placeholder="ingredients"
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Video</p>
        <input
          type="file"
          name="video"
          accept="video/*"
          placeholder="video"
          onChange={handleVideo}
          className="form-control bg-light"
        />
        <button className="btn btn-primary" onClick={handleRecipes}>
          Input
        </button>
      </div>
    </>
  );
};

export default addRecipes;
