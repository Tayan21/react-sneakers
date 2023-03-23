import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App";

const Header = (props) => {
  const { cartItems } = React.useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, ob) => ob.price + sum, 0);

  return (
    <>
      <header className="d-flex justify-between align-center p-40">
        <Link to="/">
          <div className="d-flex align-center">
            <img width={40} height={40} src="img/logo.png" alt="logotype" />
            <div className="headerInfo">
              <h3 className="text-uppercase">React Snickers</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>

        <ul className="d-flex">
          <li className="mr-30 cu-p">
            <img
              onClick={props.onClickCart}
              width={18}
              height={18}
              src="img/cart.svg"
              alt="cart"
            />
            <span>{totalPrice}тг</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img
                width={18}
                height={18}
                src="img/favorite.svg"
                alt="favorite"
              />
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={18} height={18} src="img/user.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
