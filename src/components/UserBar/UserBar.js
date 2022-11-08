import Image from "next/image";
import UserBarStyle from "./UserBar.module.css"

const UserBar = ({balance}) => {
  return (
    <div className={UserBarStyle.user_bar}>
      <Image src="/ava.png" width="50" height="50" className={UserBarStyle.avatar} alt="avatar"/>
      <h2>Elon Musk</h2>
      <span>${balance}</span>
      <h2>Inventory</h2>
    </div>
  )
}

export default UserBar;
