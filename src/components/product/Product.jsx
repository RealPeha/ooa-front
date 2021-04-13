import React, { useEffect, useState } from 'react'

import * as css from './style.module.css'

import { get } from '../../utils/api'

const Product = ({ name, description, price, img }) => {
	const [signature, setSignature] = useState('')
	const [date, setDate] = useState('')

	const handleBuy = (e) => {
		
		// e.preventDefault()
	}

	useEffect(() => {
		get('/buy')
			.then(res => {
				setSignature(res.data.merchantSignature)
				setDate(res.data.orderDate)
			})
	}, [])

	return (
		<div className={css.product}>
			<img src={img} />
			<div className={css.header}>
				<span className={css.name}>{name}</span>
				<span className={css.price}>💵 {price} RUB</span>
			</div>
			<form
				className={css.body}
				onSubmit={handleBuy}
				action='https://secure.wayforpay.com/pay'
				method='post'
				acceptCharset='utf-8'
			>
				<p>{description}</p>
				<input type='hidden' name='merchantAccount' value='peha_fun' />
				<input type='hidden' name='merchantDomainName' value='peha.fun' />
				<input type='hidden' name='merchantTransactionType' value='SALE' />
				<input type='hidden' name='merchantTransactionSecureType' value='AUTO' />
				<input type='hidden' name='merchantSignature' readOnly value={signature} />
				<input type='hidden' name='orderReference' value={5} />
				<input type='hidden' name='orderDate' value={date} />
				<input type='hidden' name='amount' value={price} />
				<input type='hidden' name='currency' value='UAH' />
				<input type='hidden' name='productName[]' value={name} />
				<input type='hidden' name='productPrice[]' value={price} />
				<input type='hidden' name='productCount[]' value={1} />
				<input type='hidden' name='serviceUrl' value='' />
				<input className={css.button} type='submit' value='Купить!!!' />
			</form>
		</div>
	)
}

export default Product
