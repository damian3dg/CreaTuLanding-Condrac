import React from "react"

interface ItemListProp {
  greeting: string
}

export default function ItemListContainer({ greeting }: ItemListProp) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{greeting}</h2>
      <p className="text-gray-600">
        Los productos se mostraran en este contenedor!
      </p>
    </div>
  )
}