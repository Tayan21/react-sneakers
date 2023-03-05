import React from 'react'
import Card from '../components/Card/Card'

export const Orders = () => {
  return (
    <div className="content p-40 mb-40">
      <div className="d-flex align-center justify-between">
        <h1>My Orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {[].map((obj) => (
            <Card
              // key={obj.title}
              // favorited={true}
              // onFavorite={onAddToFavorite}
              // {...obj}
            />
          ))}
      </div>
    </div>
  )
}
