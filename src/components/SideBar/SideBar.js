import { useState } from "react"
import SideBarStyle from "./SideBar.module.css"

const FilterItem = ({text, optionA, optionB}) => {
  // true is optionA
  // false is optionB
  const [option, setOption] = useState(true)
  const toggle = () => {
    setOption(!option)
  }
  return (
    <div className={SideBarStyle.filter_container}>
      <h3>{text}:</h3>
      <button onClick={toggle}>{option ? optionB : optionA}</button>
    </div>
  )
}

const SideBar = () => {
  const [selected, setSeleted] = useState(['Electronics'])
  const categories = ['Electronics', 'Football', 'Real Estate', 'Social Media']
  const addToSeleted = (category) => {
    if(selected.includes(category)){
      setSeleted(selected => selected.filter(item => item !== category))
    }else{
      setSeleted(selected => [...selected, category])
    }
  }
  return (
    <div className={SideBarStyle.side_bar}>
      <h2>Category</h2>
      <div className={SideBarStyle.item_container}>
        {categories.map((category,idx) => (
          <span className={SideBarStyle.item} 
            style={selected.includes(category) ? {color: "#49465A" } : {color: "#D7D7D7"}}
            onClick={() => {addToSeleted(category)}}
            key={idx}
          >
            {category}
          </span>
        ))}
      </div>
      <h2>Filter by: </h2>
      <FilterItem text="Price" optionA="Increase" optionB="Decrease"/>
      <FilterItem text="Alphabet" optionA="A-Z" optionB="Z-A"/>
    </div>
  )
}

export default SideBar
