import { useState } from "react";
import PropTypes from "prop-types";
import { push, ref, set } from 'firebase/database'
import { db } from "../firebase";

const AddContact = ({data, fetchData}) => {
  const [input, setInput] = useState('');

  const addContact = async () => {
    const newContactRef = push(ref(db, 'contacts'));
    await set(newContactRef, {
      title: input
    })
    fetchData();
    setInput('');
    console.log(data)
  }

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
      <button type="button" onClick={addContact}>Add</button>
    </div>
  )
}

AddContact.propTypes = {
  data: PropTypes.array,
  fetchData: PropTypes.func
}

export default AddContact
