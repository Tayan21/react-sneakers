import React from "react";
import { AppContext } from "../../App";
import Info from "../Info";
import styles from './Drawer.module.scss';

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const totalPrice = cartItems.reduce((sum, ob) => ob.price + sum, 0)

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([]);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className=" d-flex justify-between mb-30">
          Trash
          <img
            onClick={onClose}
            className="cu-p removeBtn"
            src="img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} тг</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice}тг</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5}тг</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Cart Empty"}
            description={
              isOrderComplete
                ? `Ваш заказ #18 скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
