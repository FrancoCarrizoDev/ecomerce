import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { createModal } from 'src/helpers/sweetAlert'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'
import { columnsProductSubTypeCategories } from 'src/constants/columns'
import { getProductSubType } from 'src/actions/productSubTypes'
import {
  createProductSubType,
  disableProductSubType,
  updateProductSubType,
} from 'src/services/productSubTypes'

// TODO que la llamada a los servicios se haga por un dispatch

// TODO acá el productType y Sub Type deben estar juntos

// TODO quitar el isCheking state reducer

export const AdminPanelProductSubTypes = () => {
  const dispatch = useDispatch()
  const { productSubTypes, checking } = useSelector((state) => state.rootReducer.productSubTypes)
  const { selectedType } = useSelector((state) => state.rootReducer.productType)

  useEffect(() => {
    dispatch(getProductSubType(selectedType.id))
  }, [selectedType])

  const handleClickAddProductCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar un sub tipo de categoría',
      successMessage: 'Sub tipo agregado!',
      service: createProductSubType,
      id: selectedType.id,
      input: 'text',
      successDispatch: () => dispatch(getProductSubType(selectedType.id)),
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
      service: updateProductSubType,
      input: 'text',
      successDispatch: () => dispatch(getProductSubType(selectedType.id)),
      id,
      inputValue: productValue.name,
    })

  const deleteProductCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar la categoría ${productValue.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `La categoría ${productValue.name} fue eliminada`,
      service: disableProductSubType,
      successDispatch: () => dispatch(getProductSubType(selectedType.id)),
      id,
    })

  // TODO modularizar la tabla con su título
  return (
    <DynamicDataTable
      title={`Sub Tipos De ${selectedType.name}`}
      handleClickAdd={handleClickAddProductCategories}
      data={productSubTypes}
      columns={columnsProductSubTypeCategories}
      actionDelete={deleteProductCategories}
      actionView={viewProductCategories}
      actionEdit={editProductCategories}
      progressPending={checking}
    />
  )
}
