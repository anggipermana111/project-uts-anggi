import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import { AiFillFolderAdd, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import {BsCartPlusFill} from 'react-icons/bs'
import { MdClose } from "react-icons/md";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      category: "laptop"
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      category: "hp"
    },
    {
      id: 3,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      category: "hp"
    },
    {
      id: 4,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      category: "vr"
    },
    {
      id: 5,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      category: "watch"
    },
    {
      id: 6,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      category: "ipad"
    },
    {
      id: 7,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      category: "laptop"
    },
    {
      id: 8,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      category: "hp"
    },
    {
      id: 9,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      category: "hp"
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      category: "vr"
    },
    {
      id: 11,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      category: "watch"
    },
    {
      id: 12,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      category: "ipad"
    },
  ]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();
  const [addProduct, setAddProduct] = useState();
  const [newProduct, setNewProduct] = useState({
    id: 13,
    name: "",
    image: "",
    price: 0,
    category: "laptop"
  })
  const [carts,setCarts] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category,setCategory] = useState("")
  const [countPage,setCountPage] = useState(3);

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice && 
        product.category.includes(category)
    );

  return (
    <div className="products">
      <header>
        <button onClick={() => {
          setAddProduct(true)
        }}>
          <AiFillFolderAdd />Buat
        </button>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <section>
          Kategori:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Normal</option>
            <option value="laptop">Laptop</option>
            <option value="hp">Hp</option>
            <option value="vr">Vr</option>
            <option value="watch">Watch</option>
          </select>
          Urutkan:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <button onClick={() => setIsCartOpen(true)}>
          <BsCartPlusFill />{carts.reduce((a, p) => a + p.count, 0)}
        </button>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
            .filter((_product, i) => i >= countPage * page - countPage && i < countPage * page)
            .map((product) => (
              <Product
                key={product.id}
                {...product}
                setEditedProduct={setEditedProduct}
                carts={carts}
                setCarts={setCarts}
                product={product}
                products={products}
                setProducts={setProducts}
              />
            ))
          : "Tidak ada produk ditemukan."}
      </main>
      <label style={{ 
        margin:"auto",
       }}>
        Banyak Page:
      <input style={{ 
        textAlign:"center",
        width: "50px",
        padding: "10px 0"
       }} type="number" min={1} max={4} onClick={(e)=>{
        setCountPage(e.target.value)
      }}/>
      </label>
      <footer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % countPage === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
        >
          Berikutnya
        </Button>
      </footer>
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <select onChange={(e) => {
            setEditedProduct({
              ...editedProduct,
              category: e.target.value,
            })
          }}>
            <option value="laptop">Laptop</option>
            <option value="hp">Smart Phone</option>
            <option value="vr">Virtual Reality</option>
            <option value="watch">Watch</option>
          </select>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
      {addProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts([...products, {
              ...newProduct
            }]);
            setAddProduct(undefined);
            setNewProduct({
              id: newProduct.id+1,
              name: "",
              image: "",
              price: 0,
              category: "laptop"
            })
          }}
        >
          <h1>Tambah Produk</h1>
          <label>
            Tambah
            <input
              type="text"
              value={newProduct.id}
              disabled
            />
          </label>
          <label>
            Nama
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              autoFocus
            />
          </label>
          <label>
            Url Gambar
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </label>
          <select onChange={(e) => {
            setNewProduct({ ...newProduct, category: e.target.value })
          }}>
            <option value="laptop">Laptop</option>
            <option value="hp">Smart Phone</option>
            <option value="vr">Virtual Reality</option>
            <option value="watch">Watch</option>
          </select>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => {
                setNewProduct({
                  id: newProduct.id,
                  name: "",
                  image: "",
                  price: 0,
                  category: "laptop"
                })
                setAddProduct(undefined)
              }}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
      {isCartOpen && (
        <div className="card dialog">
          <button onClick={() => setIsCartOpen(false)}>
            <MdClose />
          </button>
          <h1>Keranjang</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Kategori</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.count.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        if (product.count > 1) {
                          setCarts(
                            carts.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCarts(carts.filter((p) => p.id !== product.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      <AiOutlineMinusCircle />
                    </button>
                    <button
                      onClick={() => {
                        setCarts(
                          carts.map((p) =>
                            p.id === product.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      <AiOutlinePlusCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total Harga : Rp.{carts.reduce((a,p)=>a+(p.price*p.count),0).toLocaleString('id')}</h3>
        </div>
      )}
    </div>
  );
}
