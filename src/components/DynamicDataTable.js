import React, { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { constructorData } from "src/helpers/constructorsDataTable"

export const DynamicDataTable = ({
  data,
  actionDelete,
  actionView,
  actionEdit,
  columns,
  ...props
}) => {
  const [dataRows, setDataRows] = useState([{}])
  useEffect(() => {
    if (!data) return
    setDataRows(constructorData(data, actionDelete, actionView, actionEdit))
  }, [data])

  return (
    <DataTable
      columns={columns}
      data={dataRows}
      {...props}
      noDataComponent={"No hay registros disponibles"}
      pagination
      paginationComponentOptions={{ rowsPerPageText: "Filas por página:" }}
    />
  )
}
