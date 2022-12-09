import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "react-router-dom";
import { useRouter } from "next/router";

export default function Profile() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const getData = () => {
    axios
      .get(`http://localhost:3006/recipes/detail/8`)
      .then((res) => {
        setData(res.data.data);

        console.log("get data success");
      })
      .catch((err) => {
        console.log(err, "get data fail");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.map((item, i) => {
        return (
          <div key={i} className="container mt-5">
            <div className="container row">
              <div>
                <Image src={item.photo} width="500" height="400" />
              </div>
              <div>
                <p>Ingredients</p>
                <p>{item.description}</p>
              </div>
              <div>
                <p>Video</p>
                {data ? (
                  <video width="60%" controls>
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                ) : (
                  <p>Loading....</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
