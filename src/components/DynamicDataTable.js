import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import DataTable from "react-data-table-component"
import { constructorData } from "src/helpers/constructorsDataTable"

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

  return (
    <div className=" bg-white pt-3 px-3 pb-0 sweetBorderRadius shadow-sm">
      <div className="d-flex justify-content-between mb-1">
        <h6 className="capitalize">{title.toLowerCase()}</h6>
        <Button variant="primary" className="btn-circle" onClick={handleClickAdd}>
          <FontAwesomeIcon icon={faPlus} size="sm" />
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={dataRows}
        {...props}
        noDataComponent={"No hay registros disponibles"}
        pagination
        paginationComponentOptions={{ rowsPerPageText: "Filas por página:" }}
      />
    </div>
  )
}
