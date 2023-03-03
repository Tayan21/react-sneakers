import React from 'react';

const Header = (props) => {
    return (
        <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logotype"/>
          <div className="headerInfo">
            <h3 className="text-uppercase">React Snickers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>

        <ul className="d-flex">
          <li className="mr-30 cu-p">
            <img onClick={props.onClickCart} width={18} height={18} src="/img/cart.svg" alt="cart" />
            <span>6000тг</span>
          </li>
          <li>
          <img width={18} height={18} src="/img/user.svg" alt="user"/>
          </li>
        </ul>
      </header>
    );
};

export default Header;