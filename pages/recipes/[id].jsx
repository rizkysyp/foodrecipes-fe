import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  try {
    const { token } = context.req.cookies;
    const id = context.params.id;
    console.log(id);
    const result = await axios.get(process.env.HOST + `recipes/detail/${id}`);
    const data = result.data.data[0];
    console.log(data);
    return {
      props: {
        data,
        token,
      },
    };
  } catch (e) {
    console.log(e);
  }
}

const detailRecipes = ({ data, token }) => {
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
        PROCESS.ENV.HOST + `recipes/save/`,
        bodyParameters,
        header
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  return (
    <div className="container">
      <div className="row">
        <div onClick={() => handleSave(data.id_recipes)}>
          <img
            className="mt-3"
            src="/Icon/trash.png"
            style={{
              height: "30px",
              width: "30px",
              cursor: "pointer",
            }}
          ></img>
        </div>
        <div>
          <h1>{data.recipes_name}</h1>
        </div>
        <div>
          <Image src={data.photo} width="500" height="400" />
        </div>
        <div>
          <h3>Ingredients</h3>
          <p>{data.description}</p>
        </div>
        <div>
          <h2>Video Step</h2>
          {data ? (
            <video width="60%" controls>
              <source src={data.video} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          ) : (
            <p>Loading....</p>
          )}
        </div>
      </div>
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
