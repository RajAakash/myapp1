import Link from 'next/link'
import Image from 'next/image'
import React, { useContext } from 'react'
import { XCircleIcon } from '@heroicons/react/solid'
import { Store } from '../utils/Store'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'

function CartScreen() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)

  const {
    cart: { cartItems },
  } = state

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  return (
    <Layout title='Shoping cart'>
      <h1 className='mb-4 text-xl'>Shopping cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <div className='grid md:grid-cols-4'>
            <div></div>
            <div className='text-xl'>Cart is empty</div>
            <div>
              <Link href='/'>
                <button className='primary-button'>Go shopping</button>
              </Link>
            </div>
          </div>
          &nbsp;
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Item</th>
                  <th className='px-5 text-right'>Quantity</th>
                  <th className='px-5 text-right'>Price</th>
                  <th className='p-5'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className='border-b'>
                    <td>
                      <Link href={`/product/${item.id}`}>
                        <a className='flex items-center'>&nbsp; {item.name}</a>
                      </Link>
                    </td>
                    <td className='p-5 text-right'>{item.quantity}</td>
                    <td className='p-5 text-right'>{item.price}</td>
                    <td className='p-5 text-center'>
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className='h-5 w-5'></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='card p-5'>
            <ul>
              <li>
                <div className='pb-3 text-xl'>
                  Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}) :$
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  className='primary-button w-full'
                  onClick={() => router.push('login?redirect=/shipping')}
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
