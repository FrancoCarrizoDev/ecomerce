import { useEffect, useState } from "react";
import { getProductsCategories } from "services/productCategories";
import { DynamicDataTable } from "components/DynamicDataTable";

export const AdminPanelProductCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    getProductsCategories()
      .then((data) => data.json())
      .then((response) =>
        isSubscribed ? setCategories(response.categories) : null
      )
      .catch((err) => {
        throw new Error(err);
      });
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h4>Categorías</h4>

          <DynamicDataTable
            data={categories}
            onRowClicked={(row, event) => {
              console.log(row);
            }}
          />
        </div>
        {/* <div className="col-6">
          <h4>Talles</h4>
          <DataTable columns={columns} data={data} />
        </div> */}
      </div>
    </div>
  );
};
