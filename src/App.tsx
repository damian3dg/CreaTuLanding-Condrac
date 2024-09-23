import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className=" mx-auto mt-2 p-2">
        <ItemListContainer greeting="¡Bienvenido a el Ropero!" />
      </main>
    </div>
  )
}