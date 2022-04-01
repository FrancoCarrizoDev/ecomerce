import { createModal } from 'src/helpers/sweetAlert'
import {
  createCatValCat,
  createProduct,
  createTycValTyc,
  getCatValCatsByProductId,
  getTycValTycsByProductId,
  updateProductTycValTycByProductId,
} from 'src/services/product'
import { MODAL_STATUS, MODAL_TYPES } from 'src/types/modalTypes'

const { types } = require('src/types/types')

const newProductChangeNameAction = (name) => ({
  type: types.newProductChangeName,
  payload: name,
})

export const newProductChangeName = (name) => {
  return async (dispatch) => {
    dispatch(newProductChangeNameAction(name))
  }
}

const newProductChangePriceAction = (price) => ({
  type: types.newProductChangePrice,
  payload: price,
})

export const newProductChangePrice = (price) => {
  return async (dispatch) => {
    dispatch(newProductChangePriceAction(price))
  }
}

const newProductChangeQuantityAction = (quantity) => ({
  type: types.newProductChangeQuantity,
  payload: quantity,
})

export const newProductChangeQuantity = (quantity) => {
  return async (dispatch) => {
    dispatch(newProductChangeQuantityAction(quantity))
  }
}

const newProductChangeImgAction = (img) => ({
  type: types.newProductChangeImg,
  payload: img,
})

export const newProductStartUploadImgAction = () => ({
  type: types.newProductStartUploadImg,
})

export const newProductFinishUploadImgAction = () => ({
  type: types.newProductFinishUploadImg,
})

export const newProductChangeImg = (img) => {
  return async (dispatch) => {
    dispatch(newProductChangeImgAction(img))
  }
}

const newProductChangeDescriptionAction = (description) => ({
  type: types.newProductChangeDescription,
  payload: description,
})

export const newProductChangeDescription = (description) => {
  return async (dispatch) => {
    dispatch(newProductChangeDescriptionAction(description))
  }
}

const newProductChangeCodeAction = (code) => ({
  type: types.newProductChangeCode,
  payload: code,
})

export const newProductChangeCode = (code) => {
  return async (dispatch) => {
    dispatch(newProductChangeCodeAction(code))
  }
}

const newProductChangeTypeAction = (type) => ({
  type: types.newProductChangeType,
  payload: type,
})

export const newProductChangeType = (type) => {
  return async (dispatch) => {
    dispatch(newProductChangeTypeAction(type))
  }
}

const newProductChangeSubTypeAction = (subType) => ({
  type: types.newProductChangeSubType,
  payload: subType,
})

export const newProductChangeSubType = (subType) => {
  return async (dispatch) => {
    dispatch(newProductChangeSubTypeAction(subType))
  }
}

export const newProductStartChecking = () => ({
  type: types.newProductStartChecking,
})

export const newProductStopChecking = () => ({
  type: types.newProductStopChecking,
})

const cleanNewProductAction = () => ({
  type: types.cleanNewProductState,
})

export const cleanNewProduct = () => {
  return async (dispatch) => {
    dispatch(cleanNewProductAction())
  }
}

const newProductChangeTycValTycAction = (tycValTyc) => ({
  type: types.newProductChangeTypeAndValueCategory,
  payload: tycValTyc,
})

export const newProductChangeTycValTyc = (tycValTyc) => {
  return async (dispatch) => {
    dispatch(newProductChangeTycValTycAction(tycValTyc))
  }
}

const newProductChangeCatValCatsAction = (catValCats) => ({
  type: types.newProductChangeCategoriesAndValueCategory,
  payload: catValCats,
})

export const newProductChangeCatValCats = (tycValTyc) => {
  return async (dispatch) => {
    dispatch(newProductChangeCatValCatsAction(tycValTyc))
  }
}

export const createNewProduct = ({
  name,
  price,
  quantity,
  type,
  subType,
  description,
  img,
  code,
  tycValTycs,
  catValCats,
}) => {
  return async (dispatch) => {
    dispatch(newProductStartChecking())
    try {
      const data = {
        name: name.value,
        price: price.value,
        quantity: quantity.value,
        product_type_fk: type.value,
        product_sub_type_fk: subType.value,
        description: description.value,
        img,
        code: code.value,
      }
      const newProduct = await createProduct(data)
        .then((resp) => resp.json())
        .then((data) => data)

      for (const tycValTyc of tycValTycs) {
        await createTycValTyc(newProduct._id, tycValTyc)
          .then((resp) => resp.json())
          .then((data) => data)
      }

      for (const catValCat of catValCats) {
        await createCatValCat(newProduct._id, catValCat)
          .then((resp) => resp.json())
          .then((data) => data)
      }

      const newsTycValTycs = await getTycValTycsByProductId(newProduct._id)
      const newsCatValCats = await getCatValCatsByProductId(newProduct._id)

      await updateProductTycValTycByProductId(newProduct._id, newsTycValTycs, newsCatValCats)

      dispatch(newProductStopChecking())
      dispatch(cleanNewProduct())
      createModal(MODAL_TYPES.simpleModal, {
        title: `Producto ${newProduct.name} agregado!`,
        status: MODAL_STATUS.success,
      })
    } catch (error) {
      dispatch(newProductStopChecking())
      console.log(error)
    }
  }
}
