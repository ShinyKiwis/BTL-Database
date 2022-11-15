import { useState } from "react";
import {addToInventory, deleteProduct} from "../../firebase/database.js"
import ItemCardStyle from "./ItemCard.module.css";

const QuantityButton = ({ productQuantity, quantity, setQuantity}) => {
  const onIncrease = () => {
    setQuantity(Math.min(quantity + 1, productQuantity));
  };
  const onDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };
  return (
    <div className={ItemCardStyle.quantity_buttons}>
      <h3>Quantity: </h3>
      <button onClick={onIncrease}>+</button>
      <span>{quantity}</span>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

const ItemCard = ({
  balance,
  setBalance,
  imgSrc,
  title,
  type,
  price,
  productQuantity,
  action,
  zIndex,
  setReload
}) => {
  const [quantity, setQuantity] = useState(1);
  const purchaseItem = async () => {
    const purchasedItem = {
      imgSrc: imgSrc,
      name: title,
      tags: type,
      price: price,
      quantity: quantity
    }
    setBalance(balance - price * quantity);
    setQuantity(1)
    await addToInventory(purchasedItem);
  };
  const sellItem = async () => {
    setBalance(balance + price * quantity);
    await deleteProduct(title, quantity)
    setReload(true)
  }
  return (
    <div className={ItemCardStyle.item_card} style={{zIndex: `${zIndex}`}}>
      <img src={imgSrc} className={ItemCardStyle.item_image} alt="item card" />
      <h2>{title}</h2>
      <span className={ItemCardStyle.item_type}>{type}</span>
      <QuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        productQuantity={productQuantity}
      />
      <div className={ItemCardStyle.item_card_bottom}>
        <span className={ItemCardStyle.price}>${price}</span>
        <button onClick={action == "buy" ? purchaseItem: sellItem}>{action.toUpperCase()}</button>
      </div>
    </div>
  );
};

export default ItemCard;
