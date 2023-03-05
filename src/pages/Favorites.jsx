import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";

export const Favorites = () => {
  const { favorite, onAddToFavorite } = React.useContext(AppContext)
  
  return (
    <div className="content p-40 mb-40">
      <div className="d-flex align-center justify-between">
        <h1>My Favorites</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorite.map((obj) => (
            <Card
              key={obj.title}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...obj}
            />
          ))}
      </div>
    </div>
  );
};
