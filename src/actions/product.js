import { createModal } from 'src/helpers/sweetAlert'
import {
  createCatValCat,
  createTycValTyc,
  deleteCatValCatById,
  deleteTycValTycById,
  editProducts,
  getCatValCatsByProductId,
  getTycValTycsByProductId,
  updateProductTycValTycByProductId,
} from 'src/services/product'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'

const { types } = require('src/types/types')

const selectCategoryAction = (categorySelected = []) => ({
  type: types.selectProductCategory,
  payload: categorySelected,
})

export const cleanSelectedProductCategories = () => ({
  type: types.cleanSelectedProductCategory,
})

export const selectCategory = (app) => {
  return async (dispatch) => {
    dispatch(selectCategoryAction(app))
  }
}

export const editProduct = ({ productToEdit, typeCatVal, catVal }, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true)
      const editProduct = await editProducts(productToEdit)
        .then((resp) => resp.json())
        .then((data) => data)

      await deleteTycValTycById(productToEdit.id || productToEdit._id)
      await deleteCatValCatById(productToEdit.id || productToEdit._id)

      for (const tycValTyc of typeCatVal) {
        await createTycValTyc(productToEdit.id || productToEdit._id, tycValTyc)
          .then((resp) => resp.json())
          .then((data) => data)
      }

      for (const catValCat of catVal) {
        await createCatValCat(productToEdit.id || productToEdit._id, catValCat)
          .then((resp) => resp.json())
          .then((data) => data)
      }

      const newsTycValTycs = await getTycValTycsByProductId(productToEdit.id)
      const newsCatValCats = await getCatValCatsByProductId(productToEdit.id)

      await updateProductTycValTycByProductId(productToEdit.id, newsTycValTycs, newsCatValCats)

      createModal(MODAL_TYPES.simpleModal, {
        title: `Producto ${editProduct.name} agregado!`,
        status: MODAL_STATUS.success,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
}
