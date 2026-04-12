import { Response } from "express"
import { db } from "../db"
import { orders, orderItems } from "../db/schema"
import { eq } from "drizzle-orm"
import { AuthRequest } from "../middlewares/auth.middleware"

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, totalAmount, shippingAddressLine1, shippingCity, shippingState, shippingCountry, shippingZip } = req.body

    const newOrder = await db.insert(orders).values({
      userId: req.user!.id,
      totalAmount,
      shippingAddressLine1,
      shippingCity,
      shippingState,
      shippingCountry,
      shippingZip
    }).returning()

    const orderId = newOrder[0].id

    const itemData = items.map((item: any) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase
    }))

    const savedItems = await db.insert(orderItems).values(itemData).returning()

    res.status(201).json({ order: newOrder[0], items: savedItems })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const result = await db.select().from(orders).where(eq(orders.userId, req.user!.id))
    res.status(200).json({ orders: result })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const order = await db.select().from(orders).where(eq(orders.id, id))
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, id))
    res.status(200).json({ order: order[0], items })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const { status } = req.body
    const updated = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning()
    res.status(200).json({ order: updated[0] })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error })
  }
}