import React from "react";
import { AppContext } from "../../App";
import style from "./Card.module.scss";

const Card = ({
  id,
  onFavorite,
  title,
  imageUrl,
  price,
  onPlus,
  favorited = false,
}) => {
  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price }
  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={style.card}>
      <div className={style.favorite}>
        <img
          onClick={onClickFavorite}
          src={isFavorite ? "img/liked.svg" : "img/unliked.svg"}
          alt="Unliked"
        />
      </div>

      <img width={133} height={112} src={imageUrl} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price}тг</b>
        </div>
        <img
          className={style.plus}
          onClick={onClickPlus}
          src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
};

export default Card;
