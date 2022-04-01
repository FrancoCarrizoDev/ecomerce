import { addStyleOnSelectedRow } from 'src/helpers/addStyleOnSelectedRow'
import { useEffect, useState } from 'react'
import {
  createProductTypeCategory,
  createProductsTypeValueCategory,
  disableProductTypeCategories,
  disableProductTypeValueCategories,
  getProductTypeValuesCategories,
  updateProductTypeCategory,
  updateProductTypeValueCategory,
} from 'src/services/productTypeCategories'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { createModal } from 'src/helpers/sweetAlert'
import { getProductTypeCategories } from 'src/actions/productTypeCategories'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'
import {
  columnsProductsTypeValuesCategories,
  columnsProductTypeCategories,
} from 'src/constants/columns'

// TODO que la llamada a los servicios se haga por un dispatch

export const ProductTypeCategories = () => {
  const dispatch = useDispatch()
  const { typeCategories, checking } = useSelector(
    (state) => state.rootReducer.productTypeCategories
  )

  const { selectedType } = useSelector((state) => state.rootReducer.productType)
  const [categorySelected, setCategorySelected] = useState({})
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    dispatch(getProductTypeCategories(selectedType.id))
    setCategorySelected({})
    setValuesCategories([])
  }, [selectedType])

  const handleClickAddProductTypeCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar una nueva categoría por tipo`,
      successMessage: 'Categoría agregada!',
      service: createProductTypeCategory,
      id: selectedType.id,
      input: 'text',
      successDispatch: () => dispatch(getProductTypeCategories(selectedType.id)),
    })

  const viewProductTypeCategories = (text) =>
    createModal(MODAL_TYPES.simpleModal, {
      title: 'Valor de la categoría por tipo',
      message: text.name || '',
      status: MODAL_STATUS.info,
    })

  const editProductTypeCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Editar valor de la categoría ${productValue.name}`,
      successMessage: 'Tu valor ya ha sido actualizado.',
      service: updateProductTypeCategory,
      input: 'text',
      successDispatch: () => dispatch(getProductTypeCategories(selectedType.id)),
      id,
      inputValue: productValue.name,
    })

  const deleteProductTypeCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar la categoría por tipo ${productValue.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `La categoría ${productValue.name} fue eliminada`,
      service: disableProductTypeCategories,
      successDispatch: () => dispatch(getProductTypeCategories(selectedType.id)),
      next: () => setCategorySelected({}),
      id,
    })

  const handleClickAddProductTypeValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categoría "${categorySelected.name}"`,
      successMessage: 'Valor de categoría agregada!',
      service: createProductsTypeValueCategory,
      id: categorySelected.id,
      input: 'text',
      next: () =>
        getProductTypeValuesCategories(categorySelected, setCategorySelected, setValuesCategories),
    })

  const viewProductTypeValuesCategories = (text) =>
    createModal(MODAL_TYPES.simpleModal, {
      title: `Valor de la categoría ${categorySelected.name}`,
      message: text.value || '',
      status: MODAL_STATUS.info,
    })

  const editProductTypeValuesCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Editar valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      successMessage: 'Tu valor ya ha sido actualizado.',
      service: updateProductTypeValueCategory,
      input: 'text',
      inputValue: productValue.value,
      next: () =>
        getProductTypeValuesCategories(categorySelected, setCategorySelected, setValuesCategories),
      id,
    })

  const deleteProductTypeValuesCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar el valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `El valor ${productValue.value} de la categoría ${categorySelected.name} ha sido borrado exitosamente`,
      service: disableProductTypeValueCategories,
      next: () =>
        getProductTypeValuesCategories(categorySelected, setCategorySelected, setValuesCategories),
      id,
    })

  // TODO modularizar la tabla con su título
  return (
    <div className='row'>
      <div className='col-12 col-md-6 fadeIn'>
        <DynamicDataTable
          title={'Categorías Por Tipo'}
          handleClickAdd={handleClickAddProductTypeCategories}
          data={typeCategories}
          columns={columnsProductTypeCategories}
          onRowClicked={(row) => {
            addStyleOnSelectedRow(row.id)
            getProductTypeValuesCategories(row, setCategorySelected, setValuesCategories)
          }}
          actionDelete={deleteProductTypeCategories}
          actionView={viewProductTypeCategories}
          actionEdit={editProductTypeCategories}
          progressPending={checking}
        />
      </div>
      {categorySelected.name && (
        <div className='col-12 col-md-6 fadeIn'>
          <DynamicDataTable
            title={categorySelected.name}
            handleClickAdd={handleClickAddProductTypeValueCategories}
            data={valuesCategories}
            columns={columnsProductsTypeValuesCategories}
            actionDelete={deleteProductTypeValuesCategories}
            actionView={viewProductTypeValuesCategories}
            actionEdit={editProductTypeValuesCategories}
          />
        </div>
      )}
    </div>
  )
}
