import Button from "./Button";
import {IoMdAddCircle} from 'react-icons/io'
import {AiFillDelete} from 'react-icons/ai'

export default function Product({ id, name, image, price, setEditedProduct, carts,setCarts,product,products,setProducts }) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>{name}</h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>
        <div>
          <Button
            variant="tonal"
            onClick={() =>
              setEditedProduct({
                id,
                name,
                image,
                price,
              })
            }
          >
            Edit
          </Button>
          <Button onClick={() => {
            if (carts.find((p) => p.id === product.id)) {
              setCarts(
                carts.map((p) =>
                  p.id === product.id
                    ? {
                      ...p,
                      count: p.count + 1,
                    }
                    : p
                )
              );
            } else {
              setCarts([...carts, { ...product, count: 1 }]);
            }
          }}>
            <IoMdAddCircle/>
          </Button>
          <Button onClick={()=>{
            confirm(`Apakah Anda yakin ingin menghapus ${product.name}?`) &&
            setProducts(products.filter((p) => p.id !== product.id))
          }}>
            <AiFillDelete/>
          </Button>
        </div>
      </section>
    </div>
  );
}
