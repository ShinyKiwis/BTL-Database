import ItemCardStyle from "./ItemCard.module.css"

const ItemCard = ({imgSrc, title, type, price}) => {
  return (
    <div className={ItemCardStyle.item_card}>
      <img src={imgSrc} className={ItemCardStyle.item_image} alt="item card"/>
      <h2>{title}</h2>
      <span className={ItemCardStyle.item_type}>{type}</span>
      <div className={ItemCardStyle.item_card_bottom}>
        <span className={ItemCardStyle.price}>{price}</span>
        <button>BUY</button>
      </div>
    </div>
  )
}

export default ItemCard;
