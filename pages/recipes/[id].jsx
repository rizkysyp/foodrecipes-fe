import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/module/Navbar/Navbar";
import Swal from "sweetalert2";
import Footer from "../../components/module/Footer";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  try {
    const { token } = context.req.cookies;

    const id = context.params.id;
    console.log(id);
    const result = await axios.get(process.env.HOST + `recipes/detail/${id}`);
    const data = result.data.data[0];
    console.log(data);

    console.log(id);
    if (!token) {
      return {
        props: {
          data,
          isLogin: false,
        },
      };
    }

    return {
      props: {
        isLogin: true,
        token,
        data,
      },
    };
  } catch (e) {
    console.log(e);
  }
}

const detailRecipes = ({ isLogin, data, token }) => {
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState([]);
  console.log(comments);
  useEffect(() => {
    const fetchComment = async () => {
      const result = await axios.get(
        process.env.HOST + `recipes/comments/${data.id_recipes}`
      );
      setComments(result.data.data);
    };

    fetchComment();
  }, []);

  const handleSave = async (id_recipes) => {
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const bodyParameters = { id_resep: `${id_recipes}` };

      console.log(id_recipes, "id resep");
      await axios.post(
        process.env.HOST + `recipes/save/`,
        bodyParameters,
        header
      );

      Swal.fire("success", "Anda Berhasil Bookmark Recipes", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id_recipes) => {
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const bodyParameters = { id_resep: `${id_recipes}` };

      console.log(id_recipes, "id resep");
      await axios.post(
        process.env.HOST + `recipes/liked/`,
        bodyParameters,
        header
      );

      Swal.fire("success", "Anda Berhasil Like Recipes", "success");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setPostComment({
      ...postComment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.post(
        process.env.HOST + `recipes/comments/${data.id_recipes}`,
        postComment,
        header
      );

      Swal.fire("Success", "Post Comment Success", "success");
    } catch (err) {
      Swal.fire("Warning", "Post Comment Failed", "error");
    }
  };
  // return (
  //   <div className="container">
  //     <div className="row">
  //       <div onClick={() => handleSave(data.id_recipes)}>
  //         <img
  //           className="mt-3"
  //           src="/Icon/trash.png"
  //           style={{
  //             height: "30px",
  //             width: "30px",
  //             cursor: "pointer",
  //           }}
  //         ></img>
  //       </div>
  //       <div>
  //         <h1>{data.recipes_name}</h1>
  //       </div>
  //       <div>
  //         <Image src={data.photo} width="500" height="400" />
  //       </div>
  //       <div>
  //         <h3>Ingredients</h3>
  //         <p>{data.description}</p>
  //       </div>
  //       <div>
  //         <h2>Video Step</h2>
  //         {data ? (
  //           <video width="60%" controls>
  //             <source src={data.video} type="video/mp4" />
  //             Your browser does not support HTML video.
  //           </video>
  //         ) : (
  //           <p>Loading....</p>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <header>
        <Navbar isLogin={isLogin} />
      </header>
      <div className="container">
        <div className="" style={{ marginLeft: "50px" }}>
          <h1 className="row d-flex justify-content-center mt-4">
            {data.recipes_name}
          </h1>
        </div>
        <div
          className="row d-flex justify-content-center mt-5"
          style={{ marginLeft: "50px" }}
        >
          <div className="row d-flex justify-content-center">
            <img src={data.photo} style={{ width: "900px", height: "500px" }} />
            <div className="d-flex justify-content-center">
              <img
                onClick={() => handleSave(data.id_recipes)}
                className="mt-3"
                src="/Icon/bookmark.png"
                style={{
                  height: "50px",
                  width: "50px",
                  cursor: "pointer",
                  marginTop: "-50px",
                }}
              ></img>
              <img
                onClick={() => handleLike(data.id_recipes)}
                className="mt-3"
                src="/Icon/Like1.png"
                style={{
                  height: "50px",
                  width: "50px",
                  cursor: "pointer",

                  marginLeft: "10px",
                }}
              ></img>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-start mt-5"
          style={{ marginLeft: "50px" }}
        >
          <div className="col-2">
            <h3>Ingredients</h3>
          </div>
        </div>
        <div
          className="row justify-content-start mt-3"
          style={{ marginLeft: "50px" }}
        >
          <div className="col-2">
            <p>{data.description}</p>
          </div>
        </div>
        <div
          className="row justify-content-start mt-3"
          style={{ marginLeft: "50px" }}
        >
          <div className="col-2">
            <h3>Video Step</h3>
          </div>
        </div>
        {data ? (
          <video width="60%" controls>
            <source src={data.video} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        ) : (
          <p>Loading....</p>
        )}
        <div
          className="row justify-content-start mt-5"
          style={{ marginLeft: "50px" }}
        >
          <div className="col-12">
            <textarea
              class="form-control bg-light"
              id="exampleFormControlTextarea1"
              rows="9"
              placeholder="Comments :"
              name="comments"
              onChange={handleChange}
              type="text"
            ></textarea>
          </div>
        </div>
        <div
          className="row justify-content-center  mt-3"
          style={{ marginLeft: "50px" }}
        >
          <div className="col-3">
            <button
              className="btn btn-warning text-white"
              style={{ width: "250px", height: "35px" }}
              onClick={handleSubmit}
            >
              <h6>Send</h6>
            </button>
          </div>
        </div>
        <div
          className="row justify-content-start mt-3"
          style={{ marginLeft: "50px" }}
        >
          <div className="col-2">
            <h3>Comment</h3>
          </div>
        </div>
        <div
          className="row justify-content-start mt-3"
          style={{ marginLeft: "50px" }}
        >
          {comments ? (
            comments.map((item) => (
              <>
                <div className="row">
                  <div className="col-1">
                    <Image
                      src={item.photo}
                      width={50}
                      height={50}
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <div className="col-5">
                    <h6>{item.name}</h6>
                    <p>{item.comments}</p>
                  </div>
                </div>
              </>
            ))
          ) : (
            <h3>Loading</h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default detailRecipes;
// export default function Profile() {
//   const [data, setData] = useState([]);
//   const router = useRouter();
//   const { id } = router.query;
//   console.log(id);
//   const getData = () => {
//     axios
//       .get("http://localhost:3006/recipes/detail/12")
//       .then((res) => {
//         setData(res.data.data);

//         console.log("get data success");
//       })
//       .catch((err) => {
//         console.log(err, "get data fail");
//       });
//   };
//   useEffect(() => {
//     getData(id);
//   }, []);

//   return (
//     <>
//       {data.map((item, i) => {
//         return (
//           <div key={i} className="container mt-5">
//             <div className="container row">
//               <div>
//                 <Image src={item.photo} width="500" height="400" />
//               </div>
//               <div>
//                 <p>Ingredients</p>
//                 <p>{item.description}</p>
//               </div>
//               <div>
//                 <p>Video</p>
//                 {data ? (
//                   <video width="60%" controls>
//                     <source src={item.video} type="video/mp4" />
//                     Your browser does not support HTML video.
//                   </video>
//                 ) : (
//                   <p>Loading....</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// }
