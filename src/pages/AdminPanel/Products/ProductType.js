import { addStyleOnSelectedRow } from 'src/helpers/addStyleOnSelectedRow'
import { useEffect } from 'react'
import // getProductValuesCategories,
'src/services/productCategories'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { createModal } from 'src/helpers/sweetAlert'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'
import { columnsProductCategories } from 'src/constants/columns'
import {
  cleanSelectedProductType,
  getProductType,
  selectProductType,
} from 'src/actions/productType'
import { createProductType, disableProductType, updateProductType } from 'src/services/productType'
import { ProductSubTypes } from './ProductSubType'
import { ProductTypeCategories } from './ProductTypeCategories'

// TODO que la llamada a los servicios se haga por un dispatch

export const ProductType = () => {
  const dispatch = useDispatch()
  const { productType, selectedType, checking } = useSelector(
    (state) => state.rootReducer.productType
  )

  // const [subTypes, setSubTypes] = useState([])
  // const [typeCategories, setTypeCategories] = useState([])

  useEffect(() => {
    dispatch(getProductType())
    dispatch(cleanSelectedProductType())
    // dispatch(cleanProductSubTypes())
  }, [])

  const handleClickAddProductTypes = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar un nuevo tipo',
      successMessage: 'Tipo agregado!',
      service: createProductType,
      input: 'text',
      successDispatch: () => dispatch(getProductType()),
    })

  const editProductTypes = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Editar valor del tipo "${productValue.name}"`,
      successMessage: 'Tu valor ya ha sido actualizado.',
      service: updateProductType,
      input: 'text',
      successDispatch: () => dispatch(getProductType()),
      id,
      inputValue: productValue.name,
    })

  const deleteProductCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar la categor??a ${productValue.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `La categor??a ${productValue.name} fue eliminada`,
      service: disableProductType,
      successDispatch: () => dispatch(getProductType()),
      // next: () => setCategorySelected({}),
      id,
    })

  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        <div className='container col-12 col-md-6 fadeIn'>
          <DynamicDataTable
            title={'Tipos de producto'}
            handleClickAdd={handleClickAddProductTypes}
            data={productType}
            columns={columnsProductCategories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
              dispatch(selectProductType(row))
            }}
            actionDelete={deleteProductCategories}
            actionEdit={editProductTypes}
            progressPending={checking}
          />
        </div>
        <div className='col-12 col-md-6 container fadeIn'>
          {selectedType && Object.keys(selectedType).length > 0 && <ProductSubTypes />}
        </div>
        <div className='container-fluid col-12 pt-3'>
          {selectedType && Object.keys(selectedType).length > 0 && <ProductTypeCategories />}
        </div>
      </div>
    </div>
  )
}
