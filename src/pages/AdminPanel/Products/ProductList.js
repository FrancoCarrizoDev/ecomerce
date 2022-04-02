import { useEffect, useState } from 'react'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { columnsProducts } from 'src/constants/columns'
import { getProducts } from 'src/services/product'

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
      maxHeigth: '100px',
      cursor: 'pointer',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      maxWidth: '200px !important',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      maxWidth: '200px !important',
    },
  },
}

export const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    return () => {
      const product = document.getElementById('product')
      product.classList.remove('text-danger')
    }
  }, [])

  const handleClickAddProduct = () => {
    const product = document.getElementById('product')
    product.classList.add('text-danger')
  }

  return (
    <div className='p-3'>
      <div className='bg-white'>
        <DynamicDataTable
          highlightOnHover
          title={'Producto'}
          handleClickAdd={handleClickAddProduct}
          data={products}
          columns={columnsProducts}
          dense
          customStyles={customStyles}
          progressPending={loading}
          onRowClicked={() => {}}
          actionDelete={() => {}}
          actionEdit={() => {}}
        />
      </div>
    </div>
  )
}
