import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

import { constructorData } from 'src/helpers/constructorsDataTable'
import { SpinnerDataTable } from './SpinnerDataTable'

export const DynamicDataTable = ({
  data,
  actionDelete,
  actionView,
  actionEdit,
  columns,
  title,
  handleClickAdd,
  ...props
}) => {
  const [dataRows, setDataRows] = useState([{}])
  useEffect(() => {
    if (!data) return
    setDataRows(constructorData(data, actionDelete, actionView, actionEdit))
  }, [data])

  const [filterText, setFilterText] = React.useState('')
  const filteredItems = data?.filter(
    (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  )

  useEffect(() => {
    filteredItems && setDataRows(filteredItems)
  }, [filterText])

  const SubHeaderComponent = (
    <div>
      <InputGroup className='mb-3' size='sm' onChange={(e) => setFilterText(e.target.value)}>
        <FormControl
          placeholder='Buscar...'
          aria-label='Buscar...'
          aria-describedby='basic-addon2'
        />
        <InputGroup.Text id='basic-addon2'>
          <FontAwesomeIcon icon={faSearch} size='sm' />
        </InputGroup.Text>
      </InputGroup>
    </div>
  )

  return (
    <div className=' bg-white pt-3 px-3 pb-0 sweetBorderRadius shadow-sm'>
      <div className='d-flex justify-content-between mb-1'>
        <h6 className='capitalize'>{title.toLowerCase()}</h6>
        <Button variant='primary' className='btn-circle' onClick={handleClickAdd}>
          <FontAwesomeIcon icon={faPlus} size='sm' />
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={dataRows}
        {...props}
        noDataComponent={'No hay registros disponibles'}
        progressComponent={<SpinnerDataTable />}
        pagination
        paginationComponentOptions={{ rowsPerPageText: 'Filas por página:' }}
        subHeader
        subHeaderComponent={SubHeaderComponent}
      />
    </div>
  )
}
