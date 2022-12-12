import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const editRecipes = ({ token }) => {
  const router = useRouter();
  const { id } = router.query;
  const [photo, setPhoto] = useState({});
  const [video, setVideo] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handlePhoto = (e) => {
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

  const handleEdit = async () => {
    try {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("photo", photo.file);
      data.append("video", video.file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:3006/recipes/update/${id}`, data);
      Swal.fire("Success", "Edit Recipes Sukses", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Errror", "Edit Recipes gagal", "error");
    }
  };

  return (
    <>
      <header>{/* <Navbar isLogin={isLogin} /> */}</header>
      <div className="container">
        <div>
          <p>Photo</p>
          <input
            type="file"
            name="photo"
            accept="image/*"
            placeholder="Photo"
            onChange={handlePhoto}
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
        <button className="btn btn-primary" onClick={handleEdit}>
          Input
        </button>
      </div>
    </>
  );
};

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
export default editRecipes;
