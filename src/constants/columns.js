export const columnsProductCategories = [
  {
    name: 'Nombres',
    selector: (row) => row.name,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const columnsProductsValuesCategories = [
  {
    name: 'Valor',
    selector: (row) => row.value,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const columnsProductTypeCategories = [
  {
    name: 'Nombres',
    selector: (row) => row.name,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const columnsProductSubTypeCategories = [
  {
    name: 'Nombres',
    selector: (row) => row.name,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const columnsProductsTypeValuesCategories = [
  {
    name: 'Valor',
    selector: (row) => row.value,
  },
  {
    name: 'Acción',
    selector: (row) => row.action,
  },
]

export const columnsProducts = [
  {
    name: 'Imágenes',
    selector: (row) => {
      const imgs = row.img?.map((item) => (
        <img
          key={`img-${item.asset_id}`}
          className='xSmallImgToUpload  mx-1 my-1'
          style={{ backgroundImage: `url(${item.secure_url})` }}
        />
      ))
      return <div>{imgs}</div>
    },
  },
  {
    name: 'Nombre',
    selector: (row) => row.name,
  },
  {
    name: 'Precio',
    selector: (row) => row.price,
  },
  {
    name: 'Tipo',
    selector: (row) => row.product_type_fk?.name,
  },
  {
    name: 'Sub Tipo',
    selector: (row) => row.product_sub_type_fk?.name,
  },
  {
    name: 'Categorías Globales',
    selector: (row) => {
      const globalCategories = row.product_cat_val_cat_fk?.map((item) => (
        <li key={`columnsProducts-${item._id}`}>
          {item.product_cat_fk.name + ' ' + item.product_val_cat_fk.value}
        </li>
      ))
      return (
        <ul className='mb-0 overflow-auto' style={{ maxHeight: '75px' }}>
          {globalCategories}
        </ul>
      )
    },
  },
  {
    name: 'Categorías Por Tipo',
    selector: (row) => {
      const typeCategories = row.product_tyc_val_tyc_fk?.map((item) => (
        <li key={`columnsProductsTypes-${item._id}`}>
          {item.product_tyc_fk.name + ' ' + item.product_val_tyc_fk.value}
        </li>
      ))
      return (
        <ul className='mb-0 overflow-auto' style={{ maxHeight: '75px' }}>
          {typeCategories}
        </ul>
      )
    },
  },
  {
    name: 'Descripción',
    selector: (row) => row.description,
  },
  {
    name: 'Cantidad',
    selector: (row) => row.quantity,
  },
  {
    name: 'Código',
    selector: (row) => row.code,
  },
]
