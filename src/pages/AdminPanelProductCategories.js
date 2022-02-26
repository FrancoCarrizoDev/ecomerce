import { addStyleOnSelectedRow } from 'src/helpers/addStyleOnSelectedRow'
import { useEffect, useState } from 'react'
import {
  createProductCategory,
  createProductsValueCategory,
  disableProductCategories,
  disableProductValueCategories,
  getProductValuesCategories,
  updateProductCategory,
  updateProductValueCategory,
} from 'src/services/productCategories'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicDataTable } from 'src/components/DynamicDataTable'
import { createModal } from 'src/helpers/sweetAlert'
import { getProductCategories } from 'src/actions/productCategories'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'

const columnsProductCategories = [
  {
    name: 'Nombres',
    selector: (row) => row.name,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

const columnsProductsValuesCategories = [
  {
    name: 'Valor',
    selector: (row) => row.value,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const AdminPanelProductCategories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.rootReducer.productCategories)
  const [categorySelected, setCategorySelected] = useState({})
  const [valuesCategories, setValuesCategories] = useState([])

  useEffect(() => {
    dispatch(getProductCategories())
  }, [])

  const handleClickAddProductCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: 'Agregar una nueva categoría',
      successMessage: 'Categoría agregada!',
      service: createProductCategory,
      input: 'text',
      successDispatch: () => dispatch(getProductCategories()),
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
      next: setCategorySelected({}),
      id,
    })

  const handleClickAddProductValueCategories = () =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Agregar nuevo valor de la categoría "${categorySelected.name}"`,
      successMessage: 'Valor de categoría agregada!',
      service: createProductsValueCategory,
      id: categorySelected.id,
      input: 'text',
      next: () =>
        getProductValuesCategories(categorySelected, setCategorySelected, setValuesCategories),
    })

  const viewProductValuesCategories = (text) =>
    createModal(MODAL_TYPES.simpleModal, {
      title: `Valor de la categoría ${categorySelected.name}`,
      message: text.value || '',
      status: MODAL_STATUS.info,
    })

  const editProductValuesCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Editar valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      successMessage: 'Tu valor ya ha sido actualizado.',
      service: updateProductValueCategory,
      input: 'text',
      inputValue: productValue.value,
      next: () =>
        getProductValuesCategories(categorySelected, setCategorySelected, setValuesCategories),
      id,
    })

  const deleteProductValuesCategories = (id, productValue) =>
    createModal(MODAL_TYPES.customizableModal, {
      title: `Estas seguro de eliminar el valor "${productValue.value}" de la categoría ${categorySelected.name}`,
      message: 'Este cambio es irreversible!',
      icon: MODAL_STATUS.warning,
      successMessage: `El valor ${productValue.value} de la categoría ${categorySelected.name} ha sido borrado exitosamente`,
      service: disableProductValueCategories,
      next: () =>
        getProductValuesCategories(categorySelected, setCategorySelected, setValuesCategories),
      id,
    })

  // TODO modularizar la tabla con su título
  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <DynamicDataTable
            title={'Categorías'}
            handleClickAdd={handleClickAddProductCategories}
            data={categories}
            columns={columnsProductCategories}
            onRowClicked={(row) => {
              addStyleOnSelectedRow(row.id)
              getProductValuesCategories(row, setCategorySelected, setValuesCategories)
            }}
            actionDelete={deleteProductCategories}
            actionView={viewProductCategories}
            actionEdit={editProductCategories}
          />
        </div>
        {categorySelected.name && (
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
        )}
      </div>
    </div>
  )
}
