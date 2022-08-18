import Link from 'next/link'
import { Store } from '../utils/Store'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'
import { useContext } from 'react'

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store)
  const { query } = useRouter()
  // const router = useRouter()
  const { id } = query

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    // router.push('/cart')
  }
  return (
    <div className='card'>
      <Link href={`/product/${product.id}`}>
        <a>
          <Image
            width={250}
            height={400}
            src={require(`../uploads/${product?.images[0]}`)}
            alt={product.name}
            className='rounded shadow'
          />
        </a>
      </Link>

      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.id}`}>
          <a>
            <h2 className='text-lg'>{product.name}</h2>
          </a>
        </Link>
        <p className='mb-2'>{product.brand}</p>
        <p>${product.price}</p>
        <button
          className='primary-button'
          type='button'
          onClick={addToCartHandler}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
