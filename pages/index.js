import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import axios from 'axios'

export default function Home({ products }) {
  return (
    <Layout title='Home page'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductItem product={product} key={product.id}></ProductItem>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const products = await axios.get('http://localhost:3000/api/product')
  return {
    props: {
      products: products.data,
    },
  }
}
