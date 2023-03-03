import React from "react";
import style from "./Card.module.scss";

const Card = ({onFavorite, title, imageUrl, price, onPlus}) => {
  const [isAdded, setIsAdded] = React.useState(false)

  const onClickPlus = () => {
    setIsAdded(!isAdded)
    onPlus({title, imageUrl, price})
  }

  return (
    <div className={style.card}>
      <div className={style.favorite} onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
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
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="plus"
        />
      </div>
    </div>
  );
};

export default Card;
