// Tipos de Producto
export interface Product {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    comparePrice: number | null
    stock: number
    images: string[]
    isActive: boolean
    isFeatured: boolean
    createdAt: Date
    updatedAt: Date
    categoryId: string
    category: Category
  }
  
  // Tipos de Categoría
  export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
  }
  
  // Tipos de Usuario
  export interface User {
    id: string
    email: string
    name: string | null
    phone: string | null
    image: string | null
  }
  
  // Tipos de Carrito
  export interface CartItem {
    id: string
    productId: string
    product: Product
    quantity: number
    userId: string
  }
  
  // Tipos de Orden
  export interface Order {
    id: string
    orderNumber: string
    status: OrderStatus
    subtotal: number
    tax: number
    shippingCost: number
    total: number
    userId: string
    createdAt: Date
  }
  
  export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
  }