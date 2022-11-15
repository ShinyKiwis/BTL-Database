const { updateDoc } = require("firebase/firestore")

const objExists = (data, obj) => {
  return data.some(item => item.name == obj.name)
}

const updateData = async (itemRef, product) => {
  await updateDoc(itemRef, product)
}

module.exports = {
  objExists,
  updateData
}
