import { useEffect, useState } from "react";
import {getInventory} from "../../firebase/database.js"
import ItemCard from "../ItemCard/ItemCard.js";
import InventoryStyle from "./Inventory.module.css"

const Inventory = ({setToggle, balance, setBalance}) => {
  const toggleOff = () => {
    setToggle(false)
  }
  
  const [inventory, setInventory] = useState([]);

  useEffect(()=> {
    const fetchData = async () => {
      const items = await getInventory()
      setInventory(items)
    }
    fetchData()
  }, [])
  return (
    <div className={InventoryStyle.dim}>
      <div className={InventoryStyle.container}>
        <h1>Inventory</h1>
        <h4 onClick={toggleOff}>Close</h4>
        <div className={InventoryStyle.item_list}>
          {
            inventory.map((product,idx) => (
              <ItemCard 
                balance={balance}
                setBalance={setBalance}
                key={idx}
                imgSrc={product.imgSrc}
                title={product.name}
                price={product.price}
                type={product.tags}
                productQuantity={product.quantity}
                action="sell"
              />
            ))
          }  
        </div>
      </div>
    </div>
  )
}

export default Inventory;
