import Image from "next/image";
import UserBarStyle from "./UserBar.module.css"

const UserBar = () => {
  return (
    <div className={UserBarStyle.user_bar}>
      <Image src="/ava.png" width="50" height="50" className={UserBarStyle.avatar} alt="avatar"/>
      <h2>Elon Musk</h2>
      <span>$223.800.000.000</span>
      <h2>Inventory</h2>
    </div>
  )
}

export default UserBar;
