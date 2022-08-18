import React, { useContext } from 'react'
import Router, { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import data from '../../utils/data'
import Link from 'next/link'
import Image from 'next/image'
import { Store } from '../../utils/Store'
import axios from 'axios'

export default function ProductScreen({ products }) {
  const { state, dispatch } = useContext(Store)
  const { query } = useRouter()
  // const router = useRouter()
  const { id } = query
  const product = products.find((x) => x.id === id)

  if (!product) {
    return <div>Product not Found</div>
  }

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
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href='/'>
          <button className='primary-button'>Back</button>
        </Link>
      </div>
      <div className='grid md:grid-cols-7 md:gap-3'>
        <div></div>
        <div className='md:col-span-2'>
          <Image
            src={require(`../../uploads/${product?.images[0]}`)}
            alt={product.name}
            width={500}
            height={640}
            layout='responsive'
          ></Image>
        </div>

        <div className='md:col-span-2 content-center text-center align-middle'>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Category:Jeans</li>
            <li></li>
            <li>Count In Stock : {product.countInStock}</li>
            <li>Description : {product.description}</li>
          </ul>
        </div>

        <div className='card p-5'>
          <div className='mb-2 flex justify-between'>
            <div>Price</div>
            <div>${product.price}</div>
          </div>

          <div className='mb-2 flex justify-between'>
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In-stock' : 'Unavailable'}</div>
          </div>
          <button className='primary-button w-full' onClick={addToCartHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;
// }

export async function getServerSideProps() {
  const products = await axios.get(
    'https://myapp2-rajaakash.vercel.app/api/product'
  )
  return {
    props: {
      products: products.data,
    },
  }
}
