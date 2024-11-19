import { useState, useEffect } from 'react'
import { get, ref } from 'firebase/database'
import { db } from './firebase'
import Item from './components/Item';

import './App.css'
import AddContact from './components/AddContact';

function App() {
  const [data, getData] = useState([]);

  // get data
  const fetchData = async () => {
    try {
      const contactsRef = ref(db, 'contacts')
      const snapshot = await get(contactsRef)
      const response = snapshot.val()
      if (snapshot.exists()) {
        // transformed output data
        const outData = Object.entries(response).map(item => {
          return {
            id: item[0],
            ...item[1]
          }
        })
        getData(outData)
      } else {
        console.log("No data")
        getData([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <h1>Index page</h1>
      <AddContact fetchData={fetchData} data={data} />
      {!data.length 
        ? ''
        : <ul>
            {data.map((item) => <Item key={item.id} item={item} fetchData={fetchData}/>)}
          </ul>
      }
    </>
  )
}

export default App
