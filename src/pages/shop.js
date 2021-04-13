import React from 'react'
import { Helmet } from 'react-helmet'

import * as css from './shop.module.css'

import App from '../App'
import Product from '../components/product/Product'

const products = [
  {
    name: 'VIPка',
    price: 1,
    description: 'Это ВИПка, да, купи её пожалуйста',
    img: 'https://avatars.githubusercontent.com/u/26817340',
  },
  {
    name: 'Взлом жопы',
    price: 123,
    description: 'Yes',
    img: 'https://avatars.githubusercontent.com/u/26817340',
  }
]

const ShopPage = () => {
  return (
    <App>
      <div className={css.page}>
        <Helmet bodyAttributes={{ class: css.showScroll }} />
        <div className={css.header}>
          <h1>Ocean of Anarchy Shop</h1>
        </div>
        <div className={css.content}>
          <div className={css.contentInner}>
            {products.map(product => (
              <Product
                key={product.name}
                name={product.name}
                description={product.description}
                price={product.price}
                img={product.img}
              />
            ))}
          </div>
        </div>
      </div>
    </App>
  )
}

export default ShopPage
