import React from 'react'
import { Helmet } from 'react-helmet'

import * as css from './shop.module.css'

import useServerStatus from '../utils/useServerStatus'

import Product from '../components/product/Product'

const products = [
  {
    name: 'VIP',
    price: '99,99',
    description: 'Это ВИПка, да, купи её пожалуйста',
    img: 'https://avatars.githubusercontent.com/u/26817340',
  },
  {
    name: 'Взлом жопы',
    price: '123',
    description: 'Yes',
    img: 'https://avatars.githubusercontent.com/u/26817340',
  }
]

const ShopPage = () => {
  return (
    <div className={css.page}>
      <Helmet bodyAttributes={{ class: css.showScroll }} />
      <div className={css.header}>
        <h1>Ocean of Anarchy Shop</h1>
      </div>
      <div className={css.content}>
        <div className={css.contentInner}>
          {products.map(product => (
            <Product
              name={product.name}
              description={product.description}
              price={product.price}
              img={product.img}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
