import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function CartWidget() {
  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-800" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
        0
      </span>
    </div>
  )
}

