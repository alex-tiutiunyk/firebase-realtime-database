import './App.css'

import { get, push, ref, remove, set } from 'firebase/database'
import { db } from './firebase'
import { useState } from 'react'
import { useEffect } from 'react';

function App() {
  const [data, getData] = useState([]);
  const [input, setInput] = useState('');

  const fetchData = async () => {
    try {
      const contactsRef = ref(db, 'contacts')
      const snapshot = await get(contactsRef)
      if (snapshot.exists()) {
        getData(Object.entries(snapshot.val()))
      } else {
        console.log("No data")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addContact = async () => {
    const newContactRef = push(ref(db, 'contacts'));
    set(newContactRef, {
      id: new Date().toISOString(),
      title: input
    })
    fetchData();
    setInput('');
    console.log(data)
  }

  const deleteContact = async (id) => {
    const delContactRef = remove(ref(db, `contacts/${id}`));
    await remove(delContactRef)
    fetchData();
    console.log(id)
  }

  return (
    <>
      <h1>Inde xpage</h1>
      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button type="button" onClick={addContact}>Add</button>
      </div>
      <ul>
        {data.map((item) => <li key={item[1].id}>
          {item[1].title} <button type="button" onClick={() => deleteContact(item[0])}>&times;</button>
        </li>)}
      </ul>
    </>
  )
}

export default App
