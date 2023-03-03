import React from 'react';
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
      fetch('https://640190060a2a1afebeece040.mockapi.io/items')
    .then(res => res.json())
    .then(json => setItems(json))
    .catch(err => new Error(err))
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40 mb-40">
        <div className="d-flex align-center justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <img className="clear cu-p" src="/img/btn-remove.svg" alt="remove" />
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="search..." />
          </div>
        </div>
        
        <div className="d-flex flex-wrap">
          {items.map(obj => (
            <Card
            key={obj.title}
            title = {obj.title}
            price = {obj.price}
            imageUrl = {obj.imageUrl}
            onFavorite = {() => console.log('Favorite')}
            onPlus = {(obj) => onAddToCart(obj)}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default App;
