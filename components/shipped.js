import products from '../data/products';

export default function Shipped() {
  return (
    <div id="shipped" className="pt-8 mt-8">
      <div className="mx-auto leading-4 text-gray-800">
        <h2 className="mb-2 text-3xl font-semibold leading-7 text-gray-900">
          Shipped
        </h2>
        <div className="overflow-auto mt-10">
          {products.map((product) => (
            <div key={product.title} className="float-left w-1/3">
              <img src={product.img_url} className="w-full" />
              <p className="m-5 text-sm break-words">{product.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
