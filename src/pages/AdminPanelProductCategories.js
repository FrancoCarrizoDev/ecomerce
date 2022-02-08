import { useEffect, useState } from "react";
import { getProductsCategories } from "services/productCategories";
import { DynamicDataTable } from "components/DynamicDataTable";

export const AdminPanelProductCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProductsCategories()
      .then((data) => data.json())
      .then((response) => {
        setCategories(response.categories);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [categories]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h4>Categorías</h4>

          <DynamicDataTable data={categories} />
        </div>
        {/* <div className="col-6">
          <h4>Talles</h4>
          <DataTable columns={columns} data={data} />
        </div> */}
      </div>
    </div>
  );
};
