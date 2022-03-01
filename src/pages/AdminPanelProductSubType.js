import { addStyleOnSelectedRow } from 'src/helpers/addStyleOnSelectedRow'
import { useEffect } from 'react'
import { disableProductCategories, updateProductCategory } from 'src/services/productCategories'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { createModal } from 'src/helpers/sweetAlert'
import { getProductCategories } from 'src/actions/productCategories'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'
import { columnsProductCategories } from 'src/constants/columns'
import { getProductSubType } from 'src/actions/productSubTypes'
import { createProductSubType } from 'src/services/productSubTypes'

// TODO que la llamada a los servicios se haga por un dispatch

// TODO acá el productType y Sub Type deben estar juntos

export const AdminPanelProductSubTypes = () => {
  const dispatch = useDispatch()
  const { productSubTypes } = useSelector((state) => state.rootReducer.productSubTypes)
  useEffect(() => {
    dispatch(getProductSubType())
  }, [])

  const handleClickAddProductCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar un sub tipo de categoría',
      successMessage: 'Sub tipo agregado!',
      service: createProductSubType,
      input: 'text',
      successDispatch: () => dispatch(getProductSubType()),
    })

  const viewProductCategories = (text) =>
    createModal(MODAL_TYPES.simpleModal, {
      title: 'Valor de la categoría',
      message: text.name || '',
      status: MODAL_STATUS.info,
    })

  const editProductCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Editar valor de la categoría ${productValue.name}`,
      successMessage: 'Tu valor ya ha sido actualizado.',
      service: updateProductCategory,
      input: 'text',
      successDispatch: () => dispatch(getProductCategories()),
      id,
    })

  const deleteProductCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar la categoría ${productValue.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `La categoría ${productValue.name} fue eliminada`,
      service: disableProductCategories,
      successDispatch: () => dispatch(getProductCategories()),
      id,
    })

  // TODO modularizar la tabla con su título
  return (
    <div className='container pt-3'>
      <div className='row'>
        <div className='col'>
          <DynamicDataTable
            title={'Sub Tipos De Productos'}
            handleClickAdd={handleClickAddProductCategories}
            data={productSubTypes}
            columns={columnsProductCategories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
            }}
            actionDelete={deleteProductCategories}
            actionView={viewProductCategories}
            actionEdit={editProductCategories}
          />
        </div>
      </div>
    </div>
  )
}
