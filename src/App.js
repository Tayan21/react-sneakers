import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Orders } from "./pages/Orders";

export const AppContext = React.createContext();

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorite, setFavorite] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const itemResponse = await axios.get(
        "https://640190060a2a1afebeece040.mockapi.io/items"
      );
      const cartResponse = await axios.get(
        "https://640190060a2a1afebeece040.mockapi.io/cart"
      );

      setCartItems(cartResponse.data);
      setItems(itemResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );
    if (findItem) {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
      await axios.delete(
        `https://640190060a2a1afebeece040.mockapi.io/cart/${findItem.id}`
      );
    } else {
      const { data } = await axios.post(
        "https://640190060a2a1afebeece040.mockapi.io/cart",
        obj
      );
      setCartItems((prev) => [...prev, data]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://640190060a2a1afebeece040.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onAddToFavorite = (obj) => {
    if (favorite.find((favObj) => favObj.title === obj.title)) {
      setFavorite((prev) => prev.filter((item) => item.title !== obj.title));
    } else {
      setFavorite((prev) => [...prev, obj]);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorite,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                items={items}
                cartItems={cartItems}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          >
            <Route path="favorites" element={<Favorites />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
