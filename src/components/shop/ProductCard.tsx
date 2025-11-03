'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.comparePrice && product.comparePrice > product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  return (
    <Link href={`/producto/${product.slug}`}>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
        {/* Badge de descuento */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            -{discountPercentage}%
          </div>
        )}

        {/* Badge de destacado */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            ⭐ Destacado
          </div>
        )}

        {/* Imagen del producto */}
        <div className="relative h-72 bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Información del producto */}
        <div className="p-6">
          {/* Categoría */}
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            {product.category.name}
          </p>

          {/* Nombre */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>

          {/* Descripción */}
          {product.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Precios */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ${product.comparePrice?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${
              product.stock > 10 
                ? 'text-green-600' 
                : product.stock > 0 
                  ? 'text-orange-600' 
                  : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </span>

            {/* Botón de agregar al carrito */}
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={product.stock === 0}
              onClick={(e) => {
                e.preventDefault()
                // TODO: Agregar al carrito
                console.log('Agregar al carrito:', product.id)
              }}
            >
              {product.stock > 0 ? 'Agregar' : 'Agotado'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}