import HomeStyle from "../styles/Home.module.css";
import SideBar from "../components/SideBar/SideBar";
import UserBar from "../components/UserBar/UserBar";
import ItemCard from "../components/ItemCard/ItemCard";
import { queryProduct } from "../firebase/database";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export default function Home() {
  const [balance, setBalance] = useState(223800000000)
  const [products, setProducts] = useState([])
  const getProducts = (tags) => {
    const queryResult = queryProduct(tags);
    onSnapshot(queryResult, (snapshot)=> {
      let queryProducts = []
      snapshot.docs.forEach(doc => {
        queryProducts.push(doc.data())
      })
      console.log("QUERYPRODUCTS: ", queryProducts)
      console.log("PRODUCTS", products)
      setProducts([...products, ...queryProducts])
    })
  }
  useEffect(() => {
    console.log("INDEX!")
    getProducts("Electronics")
  }, []);
  console.log(products)
  return (
    <main>
      <SideBar products={products} setProducts={setProducts} getProducts={getProducts}/>
      <UserBar balance={balance}/>
      <div className={HomeStyle.container}>
        {products.map((product, idx) => (
          <ItemCard 
            balance={balance}
            setBalance={setBalance}
            key={idx}
            imgSrc={product.imgSrc}
            title={product.name}
            price={product.price}
            type={product.tags}
            productQuantity={product.quantity}
          />
        ))}
      </div>
    </main>
  );
}
