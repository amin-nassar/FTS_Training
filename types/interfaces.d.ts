interface Category { id:number, name:string }

interface Product {
  id: number
  name: string
  rawPrice: number 
  price: number
  code: string
  color?: string
  categoryId: number
  description?: string
  stockCount?: number
  expirationDate?: Date
}

interface CheckoutProduct {
  productId: number
  unitPrice: number
  Quantity: number
  subtotal: number
}

interface Checkout {
  id: number
  date: Date
  products: CheckoutProduct[],
  total: number 
  discount: number
  paymentAmount: number
  paymentMethod: string
}