import creditCard from "../images/banner/credit-cards.png";
import truck from "../images/banner/truck.png";
import security from "../images/banner/security.png";

export const BannerShopInfo = () => {
  return (
    <div className="my-5">
      <div className="container d-flex flex-column flex-md-row justify-content-around ">
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <span className="mb-2">
            <img src={truck} alt="envios" style={{ width: 3 + "em" }} />
          </span>
          <h5>Envíos a todo el país</h5>
          <small>Gratis en compras superiores a $5000</small>
        </div>
        <div className="d-flex flex-column align-items-center  justify-content-center py-4">
          <span className="mb-2">
            <img
              src={creditCard}
              alt="credit card"
              style={{ width: 3 + "em" }}
            />
          </span>
          <h5>Hasta 6 cuotas sin interés</h5>
          <small>3 y 6 cuotas sin interés seleccionando Mobbex</small>
        </div>
        <div className="d-flex flex-column align-items-center  justify-content-center py-4">
          <span className="mb-2">
            <img src={security} alt="credit card" style={{ width: 3 + "em" }} />
          </span>
          <h5>Compra Segura</h5>
          <small>La integridad de tus datos bajo llave</small>
        </div>
      </div>
    </div>
  );
};
