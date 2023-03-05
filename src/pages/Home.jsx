import React from "react";
import Card from "../components/Card/Card";

export const Home = ({
  searchValue,
  items,
  cartItems,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
  return (
    <div className="content p-40 mb-40">
      <div className="d-flex align-center justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="remove"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="search..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items.length > 0 ? items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj) => (
            <Card
              key={obj.title}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              added={cartItems.some((item) => Number(item.id) === Number(obj.id))}
              {...obj}
            />
          )) : <h3 className="mt-20">Loading...</h3>}
      </div>
    </div>
  );
};
