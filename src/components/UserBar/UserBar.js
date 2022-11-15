import Image from "next/image";
import { useState } from "react";
import Inventory from "../Inventory/Inventory";
import UserBarStyle from "./UserBar.module.css"

const UserBar = ({balance, setBalance}) => {
  const [toggle, setToggle] = useState(false)
  const toggleOn = () => {
    setToggle(true)
  } 
  return (
    <div className={UserBarStyle.user_bar}>
      <Image src="/ava.png" width="50" height="50" className={UserBarStyle.avatar} alt="avatar"/>
      <h2>Elon Musk</h2>
      <span>${balance}</span>
      <h2 onClick={toggleOn}>Inventory</h2>
      {toggle && <Inventory setToggle={setToggle} balance={balance} setBalance={setBalance}/>}
    </div>
  )
}

export default UserBar;
