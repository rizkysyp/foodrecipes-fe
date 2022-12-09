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

  return {
    props: {
      isLogin: true,
      token: token,
    },
  };
};

const addRecipes = ({ isLogin, token }) => {
  const router = useRouter();
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
      await axios.post("http://localhost:3006/recipes", data);
      Swal.fire("Success", "Add Recipes Success", "success");
    } catch (err) {
      Swal.fire("Failed", "Add Recipes Fails", "error");
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <p>Tittle</p>
          <input
            type="text"
            placeholder="Tittle"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p>Photo</p>
          <input
            type="file"
            name="photo"
            accept="image/*"
            placeholder="Photo"
            onChange={handleImage}
          />
        </div>

        <p>Ingredients</p>
        <textarea
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
        />
        <button className="btn btn-primary" onClick={handleRecipes}>
          Input
        </button>
      </div>
    </>
  );
};

export default addRecipes;
