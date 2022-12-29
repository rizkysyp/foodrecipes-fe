import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Navbar from "../../../components/module/Navbar/Navbar";
import { Recipe } from "../../../components/module/Recipe-card";
import { Pagination } from "../../../components/module/Pagination/Pagination";

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

export default function Search({ isLogin, token }) {
  const [recipe, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const result = await axios.get(
        process.env.HOST + `recipes/search?search=${search}`
      );
      setRecipes(result.data.data);
      setLoading(false);
    };

    fetchRecipe();
  }, [search]);

  //Get Current Recipes
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = recipe.slice(indexOfFirstPost, indexOfLastPost);

  //Ganti halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <header>
        <Navbar isLogin={isLogin} />
      </header>
      <div className="container justify-align-center">
        <div className="flex-row">
          <input
            className="rounded-pill"
            type="search"
            placeholder="Search"
            id="right-search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <Recipe recipe={currentPost} loading={loading} />
          <Pagination
            postPerPage={postPerPage}
            totalPost={recipe.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

// export default function Search({ isLogin, token }) {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const fetchData = async () => {
//     const response = await axios.get(
//       `http://localhost:3006/recipes/search?search=${search}&page=${page}`
//     );
//     const result = await response.data.data;
//     setData(result);
//   };
//   useEffect(() => {
//     fetchData();
//   }, [search]);

//   const handleSave = async (id_recipes) => {
//     try {
//       const header = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const bodyParameters = { id_resep: `${id_recipes}` };
//       console.log(user, "token");
//       console.log(id_recipes, "id resep");
//       await axios.post(
//         `http://localhost:3006/recipes/save/`,
//         bodyParameters,
//         header
//       );
//     } catch (error) {}
//   };
//   return (
//     <>
//       <header>
//         <Navbar isLogin={isLogin} />
//       </header>
//       <div className="container justify-align-center">
//         <div className="flex-row">
//           <input
//             className="rounded-pill"
//             type="search"
//             placeholder="Search"
//             id="right-search"
//             onChange={(e) => setSearch(e.target.value.toLowerCase())}
//           />
//           {data.map((item, i) => {
//             return (
//               <div className={style.card}>
//                 <img
//                   src={item.photo}
//                   style={{ width: "70px", height: "70px" }}
//                 />
//                 <p>{item.recipes_name}</p>
//                 <p>{item.id_recipes}</p>
//                 <div onClick={() => handleSave(item.id_recipes)}>
//                   <img
//                     className="mt-3"
//                     src="/Icon/trash.png"
//                     style={{
//                       height: "30px",
//                       width: "30px",
//                       cursor: "pointer",
//                     }}
//                   ></img>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }
