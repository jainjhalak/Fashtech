import { pgTable, uuid, text, timestamp, numeric, integer, boolean, pgEnum } from "drizzle-orm/pg-core"

// Enums
export const roleEnum = pgEnum("role", ["user", "brand", "admin"])
export const orderStatusEnum = pgEnum("order_status", ["pending", "confirmed", "shipped", "delivered", "cancelled"])
export const queryStatusEnum = pgEnum("query_status", ["open", "in-progress", "resolved"])

// Users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow()
})

// Brands
export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  logo: text("logo"),
  images: text("images").array(),
  description: text("description"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow()
})

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price").notNull(),
  category: text("category").notNull(), // goth, punk etc.
  type: text("type").notNull(), // top, bottom etc.
  images: text("images").array(), // cloudinary URLs
  stock: integer("stock").default(0),
  brandId: uuid("brand_id").references(() => brands.id),
  uploadedBy: text("uploaded_by").notNull(), // "brand" | "admin"
  createdAt: timestamp("created_at").defaultNow()
})

// Outfits
export const outfits = pgTable("outfits", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  styleCategory: text("style_category").notNull(),
  coverImage: text("cover_image"),
  createdAt: timestamp("created_at").defaultNow()
})

//Outfit Pieces
export const outfitPieces = pgTable("outfit_pieces", {
  id: uuid("id").defaultRandom().primaryKey(),
  outfitId: uuid("outfit_id").references(() => outfits.id),
  productId: uuid("product_id").references(() => products.id),
  label: text("label") // "Top", "Boots" etc.
})

//Inventory
export const inventory = pgTable("inventory", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull(),
  addedAt: timestamp("added_at").defaultNow(),
  sourceOutfitId: uuid("source_outfit_id").references(() => outfits.id)
})