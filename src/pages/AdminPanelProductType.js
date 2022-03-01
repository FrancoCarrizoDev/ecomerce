import { addStyleOnSelectedRow } from 'src/helpers/addStyleOnSelectedRow'
import { useEffect } from 'react'
import // getProductValuesCategories,
'src/services/productCategories'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { createModal } from 'src/helpers/sweetAlert'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'
import { columnsProductCategories } from 'src/constants/columns'
import { getProductType } from 'src/actions/productType'
import { createProductType, disableProductType, updateProductType } from 'src/services/productType'

// TODO que la llamada a los servicios se haga por un dispatch

export const AdminPanelType = () => {
  const dispatch = useDispatch()
  const { productType } = useSelector((state) => state.rootReducer.productType)
  // const [typeSelected, setTypeSelected] = useState({})
  // const [subTypes, setSubTypes] = useState([])
  // const [typeCategories, setTypeCategories] = useState([])

  useEffect(() => {
    dispatch(getProductType())
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
    })

  const deleteProductCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar la categoría ${productValue.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `La categoría ${productValue.name} fue eliminada`,
      service: disableProductType,
      successDispatch: () => dispatch(getProductType()),
      // next: () => setCategorySelected({}),
      id,
    })

  // TODO modularizar la tabla con su título
  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        <div className='container col-12'>
          <DynamicDataTable
            title={'Tipos de producto'}
            handleClickAdd={handleClickAddProductTypes}
            data={productType}
            columns={columnsProductCategories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
              // getProductValuesCategories(row, setCategorySelected, setValuesCategories)
            }}
            actionDelete={deleteProductCategories}
            actionEdit={editProductTypes}
          />
        </div>
        {/* {categorySelected.name && (
          <div className='col-12 col-md-6 fadeIn'>
            <DynamicDataTable
              title={categorySelected.name}
              handleClickAdd={handleClickAddProductValueCategories}
              data={valuesCategories}
              columns={columnsProductsValuesCategories}
              actionDelete={deleteProductValuesCategories}
              actionView={viewProductValuesCategories}
              actionEdit={editProductValuesCategories}
            />
          </div>
        )} */}
      </div>
    </div>
  )
}
