import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
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
  // eslint-disable-next-line prefer-const
  let history = useHistory()

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const handleClickAddProduct = () => {
    history.push('/my-account/products/create')
  }

  const handleClickEditProduct = (id) => {
    history.push('/my-account/products/edit/' + id)
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
          onRowClicked={(row) => console.log(row)}
          actionDelete={() => {}}
          actionEdit={handleClickEditProduct}
        />
      </div>
    </div>
  )
}
