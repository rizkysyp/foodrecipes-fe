import React from "react";
import style from "./page.module.css";
import axios from "axios";
import Router from "next/router";

export const Recipe = ({ recipe, loading, token }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {recipe.map((item, i) => {
        return (
          <div className="container col-4 mt-4">
            <div
              className="card"
              onClick={() => Router.push(`/recipes/${item.id_recipes}`)}
            >
              <div className="row">
                {/* <div className={style.card}> */}
                <div className="col">
                  <img
                    src={item.photo}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="col" style={{ marginTop: "40px" }}>
                  <p>{item.recipes_name}</p>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </div>
          // </div>
        );
      })}
    </div>
  );
};

export default Recipe;
