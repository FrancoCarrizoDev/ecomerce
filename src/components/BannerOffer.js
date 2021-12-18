export const BannerOffer = () => {
  return (
    <div className="container my-5" id="bannerOffer">
      <h4>Todo al alcance de un clic</h4>
      <hr />
      <div className="grid-container">
        <div className="grid-item border shadow-sm tall" id="bannerOffer_IMG1">
          <div className="w-100 h-100 text-white d-flex flex-column justify-content-end align-items-center">
            <h4>Mujer</h4>
            <p>Todo para ellas</p>
          </div>
        </div>
        <div className="grid-item border shadow-sm tall" id="bannerOffer_IMG4">
          <div className="w-100 h-100 text-white  d-flex flex-column justify-content-end align-items-center">
            <h4>Niña</h4>
            <p>Temporada de verano on!</p>
          </div>
        </div>
        <div className="grid-item border shadow-sm wide" id="bannerOffer_IMG2">
          <div className="w-100 h-100 text-white  d-flex flex-column justify-content-end align-items-center">
            <h4>Hombre</h4>
            <p>Todo para ellos</p>
          </div>
        </div>

        <div className="grid-item border shadow-sm wide" id="bannerOffer_IMG3">
          <div className="w-100 h-100 text-white  d-flex flex-column justify-content-end align-items-center">
            <h4>Niño</h4>
            <p>Temporada de verano on!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
