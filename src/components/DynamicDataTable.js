import React, { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import {
  constructorDataColumns,
  constructorDataRows,
} from "src/helpers/constructorsDataTable"

export const DynamicDataTable = ({ data, ...props }) => {
  const [dataColumns, setDataColumns] = useState([{}])
  const [dataRows, setDataRows] = useState([{}])

  useEffect(() => {
    if (!data) return
    setDataRows(constructorDataRows(data))
    setDataColumns(constructorDataColumns(data[0]))
  }, [data])

  return <DataTable columns={dataColumns} data={dataRows} {...props} />
}
