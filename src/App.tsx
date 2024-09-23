import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto mt-8 p-4">
        <ItemListContainer greeting="¡Bienvenido a El Ropero!" />
      </main>
    </div>
  )
}