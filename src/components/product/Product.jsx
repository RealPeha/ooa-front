import React from 'react'

import * as css from './style.module.css'

const Product = ({ name, description, price, img }) => {
	return (
		<div className={css.product}>
			<img src={img} />
			<div className={css.header}>
				<span className={css.name}>{name}</span>
				<span className={css.price}>💵 {price} RUB</span>
			</div>
			<div className={css.body} >
				<p>{description}</p>
				<button>Купить!!!</button>
			</div>
		</div>
	)
}

export default Product
