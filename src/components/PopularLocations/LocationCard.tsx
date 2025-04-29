/* einzelnes Kärtchen im Home Menü */
export const LocationCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>Hier können Infos über die Location hin</p>
      </div>
      <figure>
        <img
          src="https://hansens-esszimmer.de/cms/wp-content/uploads/2021/04/placeholder-2.png"
          alt="Location Picture"
        />
      </figure>
    </div>
  );
};
