import React, { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import {
  constructorDataColumns,
  constructorDataRows,
} from "src/helpers/constructorsDataTable"

export const DynamicDataTable = ({
  data,
  actionDelete,
  actionView,
  actionEdit,
  ...props
}) => {
  const [dataColumns, setDataColumns] = useState([{}])
  const [dataRows, setDataRows] = useState([{}])

  useEffect(() => {
    if (!data) return
    setDataRows(constructorDataRows(data, actionDelete, actionView, actionEdit))
    setDataColumns(constructorDataColumns(data[0]))
  }, [data])

  return <DataTable columns={dataColumns} data={dataRows} {...props} />
}
