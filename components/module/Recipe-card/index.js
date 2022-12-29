import React from "react";
import style from "./page.module.css";
import axios from "axios";

export const Recipe = ({ recipe, loading, token }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const handleSave = async (id_recipes) => {
    try {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const bodyParameters = { id_resep: `${id_recipes}` };
      console.log(user, "token");
      console.log(id_recipes, "id resep");
      await axios.post(
        process.env.HOST + `recipes/save/`,
        bodyParameters,
        header
      );
    } catch (error) {}
  };
  return (
    <div>
      {recipe.map((item, i) => {
        return (
          <div className={style.card}>
            <img src={item.photo} style={{ width: "70px", height: "70px" }} />
            <p>{item.recipes_name}</p>
            <p>{item.id_recipes}</p>
            <div onClick={() => handleSave(item.id_recipes)}>
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
          </div>
        );
      })}
    </div>
  );
};

export default Recipe;
