import React from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Router, useRouter } from 'next/router'

export default function Upload() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  const onSubmit = async (data) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      if (key === 'images') {
        ;[...data.images].forEach((image) => {
          formData.append('images', image)
        })
      } else {
        formData.append(key, data[key])
      }
    })
    for (const key of formData) {
      console.log(key, formData[key])
    }
    await axios.post('/api/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    router.replace('/')
  }

  return (
    <Layout title='upload'>
      <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='mb-4 text-xl'> Upload</h1>
        <div className='mb-4'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            {...register('name', { required: 'Please enter Name' })}
            className='w-full'
            id='name'
            autoFocus
          ></input>
          {errors.name && (
            <div className='text-red-500'>{errors.name.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            {...register('price', { required: 'Please enter price' })}
            className='w-full'
            id='price'
            autoFocus
          ></input>
          {errors.price && (
            <div className='text-red-500'>{errors.price.message}</div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='countInStock'>In Stock</label>
          <input
            type='number'
            {...register('countInStock', {
              required: 'Please enter count in stock',
            })}
            className='w-full'
            id='countInStock'
            autoFocus
          ></input>
          {errors.countInStock && (
            <div className='text-red-500'>{errors.countInStock.message}</div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='Image'>Image</label>
          <input
            type='file'
            {...register('images', { required: 'Please link image' })}
            className='w-full'
            id='Image'
            autoFocus
          ></input>
          {errors.Image && (
            <div className='text-red-500'>{errors.Image.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='description'>Description</label>
          <textarea
            rows={5}
            type='text'
            {...register('description', {
              required: 'Please enter description',
            })}
            className='w-full'
            id='description'
            autoFocus
          ></textarea>
          {errors.description && (
            <div className='text-red-500'>{errors.description.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <button className='primary-button'>Upload</button>
        </div>
      </form>
    </Layout>
  )
}
