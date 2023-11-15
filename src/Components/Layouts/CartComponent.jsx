import UseCart from "../../Pages/Products/hooks/UseCart"

const CartComponent = () => {
	const { cart, totalValue } = UseCart()

	return (
		<div>
			{/* Access the cart and totalValue from the context */}
			<p>Cart: {JSON.stringify(cart)}</p>
			<p>Total Value: {totalValue}</p>
		</div>
	)
}

export default CartComponent
