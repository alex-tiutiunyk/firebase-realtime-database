import { useState } from "react";
import PropTypes from "prop-types";
import { ref, remove, set } from 'firebase/database'
import { db } from "../firebase";

const Item = ({item, fetchData}) => {
  const [editText, setEditText] = useState(item.title);
  const [isUpdate, setIsUpdate] = useState(false);

  // start edit contact
  const editContact = () => {
    setIsUpdate(true)
  }

  // save edited contact
  const saveContact = async (item) => {
    if (editText !== item.title) {
      try {
        const contactsRef = ref(db, `contacts/${item.id}`)
        await set(contactsRef, {
          title: editText
        })
        fetchData()
      } catch (error) {
        console.log(error)
      }
    }
    setIsUpdate(false)
  }

  // delete contact
  const deleteContact = async (item) => {
    const {id} = item;
    const delContactRef = ref(db, `contacts/${id}`);
    await remove(delContactRef)
    fetchData();
  }

  return (
    <li>
      {isUpdate 
        ? <input type="text" value={editText} placeholder={item.title} onChange={(e) => setEditText(e.target.value)}/> 
        : item.title}
      {isUpdate 
        ? <button type="button" onClick={() => saveContact(item)}>Save</button>
        : <button type="button" onClick={editContact}>Update</button>
      }
      <button type="button" onClick={() => deleteContact(item)}>&times;</button>
    </li>
  )
}

Item.propTypes = {
  item: PropTypes.object,
  fetchData: PropTypes.func
}

export default Item
