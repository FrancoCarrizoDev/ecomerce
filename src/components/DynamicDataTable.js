import React, { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons"
import { capitalizeFirstLetter } from "src/helpers/capitalizeFirstLetter"

export const constructorDataColumns = (dataColumn = {}) => {
  if (Object.keys(dataColumn).length === 0) return

  const selectorAndSortable = (key) => ({
    selector: (row) => row[key],
    sortable: true,
  })

  const action = { name: "Action", selector: (row) => row.action }
  const filtrado = Object.entries(dataColumn).filter((arr) => arr[0] !== "_id")

  const arr = []
  filtrado.forEach((data) => {
    arr.push({
      name: capitalizeFirstLetter(data[0]),
      ...selectorAndSortable(data[0]),
    })
  })
  arr.push(action)

  return arr
}

export const constructorDataRows = (dataRows = []) => {
  if (dataRows.length === 0) return
  const newDataRows = dataRows.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
    action: (
      <div className="d-flex gap-sm">
        <FontAwesomeIcon
          icon={faEye}
          className="pointer"
          onClick={() => alert("click Ver " + _id)}
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="pointer"
          onClick={() => alert("click Editar")}
        />{" "}
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="pointer"
          onClick={() => alert("click Borrar")}
        />
      </div>
    ),
  }))
  return newDataRows
}

export const DynamicDataTable = ({ data, ...props }) => {
  const [dataColumns, setDataColumns] = useState([{}])
  const [dataRows, setDataRows] = useState([{}])

  useEffect(() => {
    setDataRows(constructorDataRows(data))
    setDataColumns(constructorDataColumns(data[0]))
  }, [data])

  return <DataTable columns={dataColumns} data={dataRows} {...props} />
}
