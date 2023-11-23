// this will tells us which type of data we expected
export type IPayment = {
    email: string
    trxid: string
    price: number
    quantity: number
    date: string
    cartItems: string[] // Assuming cartItems is an array of strings, update the type accordingly
    productNames: string[]
    status: string
  } 
  