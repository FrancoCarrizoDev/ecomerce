// TODO ver que se está usando y que no

export const types = {
  authLogin: '[auth] Login',
  authAdminLogin: '[auth] Admin login',
  authChekingFinish: '[auth] Finish chechking login state',
  authLogout: '[auth] Logout',

  startLoading: '[loading] Start',
  stopLoading: '[loading] Stop',

  getProductValueCategories: '[PVC] Get PVC',
  createProductValueCategories: '[PVC] Create PVC',

  getProductCategories: '[ProdCat] Get ProdCat',
  createProductCategories: '[ProdCat] Create ProdCat',
  productCategoriesStartChecking: '[ProdCat] Start Checking',
  productCategoriesStopChecking: '[ProdCat] Stop Checking',
  clearProductCategories: '[ProdCat] Clear Products Cat',

  getProductTypeCategories: '[ProdTyCat] Get ProdTypeCat',
  createProductTypeCategories: '[ProdTyCat] Create ProdTypeCat',
  clearProductTypeCategories: '[ProdTyCat] Clear ProdTypeCat',
  productTypeCategoriesStartChecking: '[ProdTyCat] Cheking start',
  productTypeCategoriesStopChecking: '[ProdTyCAt] Cheking stop',

  getProductSubType: '[ProdSubCat] Get Product Sub Types',
  getProductSubTypeCheking: '[ProdSubType] Cheking Get Product Sub Types',
  productSubTypeStartChecking: '[ProdSubType] Cheking start',
  productSubTypeStopChecking: '[ProdSubType] Cheking stop',

  getProductType: '[ProdType] Get Product Types',
  selectProductType: '[ProdType] Select Product Types',
  productTypeStartChecking: '[ProdType] Cheking start',
  productTypeStopChecking: '[ProdType] Cheking stop',
  cleanSelectedType: '[ProdType] Clean Selected Product Tpye',

  newProductChangeName: '[CreatingNewProduct]  Change Name',
  newProductChangePrice: '[CreatingNewProduct] Change Price',
  newProductChangeQuantity: '[CreatingNewProduct] Change Quantity',
  newProductChangeImg: '[CreatingNewProduct] Change Img',
  newProductChangeDescription: '[CreatingNewProduct] Change Description',
  newProductChangeCode: '[CreatingNewProduct] Change Code',
  newProductChangeType: '[CreatingNewProduct] Change select type',
  newProductChangeSubType: '[CreatingNewProduct] Change select subtype',
  newProductChangeTypeCategory: '[CreatingNewProduct] Change select Type And Value Cat',
  newProductChangeTypeAndValueCategory: '[CreatingNewProduct] Change select Type And Value Cat',
  newProductChangeCategoriesAndValueCategory: '[CreatingNewProduct] Change select Cat and Val cat',
  newProductStartChecking: '[CreatingNewProduct] Start Checking',
  newProductStopChecking: '[CreatingNewProduct] Stop Checking',
  cleanNewProductState: '[CreatingNewProduct] Clean ',

  appSelected: '[App] Selected App',
}
