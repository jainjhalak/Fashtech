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
createdBy: uuid("created_by").references(() => users.id).notNull(), isFeatured: boolean("is_featured").default(false),
visibility: text("visibility").default("public"),
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
//Overall canva outfit *doubt
export const canvasOutfits = pgTable("canvas_outfits", {
id: uuid("id").defaultRandom().primaryKey(),
userId: uuid("user_id").references(() => users.id).notNull(),
name: text("name").notNull(),
previewImage: text("preview_image"),
createdAt: timestamp("created_at").defaultNow()
})
//Store each individual pieces on canva *doubt
export const canvasLayers = pgTable("canvas_layers", {
id: uuid("id").defaultRandom().primaryKey(),
canvasOutfitId: uuid("canvas_outfit_id").references(() => canvasOutfits.id).notNull(),
productId: uuid("product_id").references(() => products.id).notNull(),
positionX: numeric("position_x").notNull(),
positionY: numeric("position_y").notNull(),
zIndex: integer("z_index").notNull(),
scale: numeric("scale").default("1")
})
//Boards
export const boards = pgTable("boards", {
id: uuid("id").defaultRandom().primaryKey(),
userId: uuid("user_id").references(() => users.id).notNull(),
name: text("name").notNull(),
description: text("description"),
coverImage: text("cover_image"),
createdAt: timestamp("created_at").defaultNow()
})
//BoardsOutfit
export const boardOutfits = pgTable("board_outfits", {
id: uuid("id").defaultRandom().primaryKey(),
boardId: uuid("board_id").references(() => boards.id).notNull(),
canvasOutfitId: uuid("canvas_outfit_id").references(() => canvasOutfits.id).notNull(),
addedAt: timestamp("added_at").defaultNow()
})
//Orders
export const orders = pgTable("orders", {
id: uuid("id").defaultRandom().primaryKey(),
userId: uuid("user_id").references(() => users.id).notNull(),
totalAmount: numeric("total_amount").notNull(),
status: orderStatusEnum("status").default("pending").notNull(),
shippingAddressLine1: text("shipping_address_line1").notNull(),
shippingCity: text("shipping_city").notNull(),
shippingState: text("shipping_state").notNull(),
shippingCountry: text("shipping_country").notNull(),
shippingZip: text("shipping_zip").notNull(),
createdAt: timestamp("created_at").defaultNow()
})
//OrderItems
export const orderItems = pgTable("order_items", {
id: uuid("id").defaultRandom().primaryKey(),
orderId: uuid("order_id").references(() => orders.id).notNull(),
productId: uuid("product_id").references(() => products.id).notNull(),
quantity: integer("quantity").notNull(),
priceAtPurchase: numeric("price_at_purchase").notNull()
})
//InspirePosts
export const posts = pgTable("posts", {
id: uuid("id").defaultRandom().primaryKey(),
userId: uuid("user_id").references(() => users.id).notNull(),
canvasOutfitId: uuid("canvas_outfit_id").references(() => canvasOutfits.id).notNull(),
boardId: uuid("board_id").references(() => boards.id).notNull(),
caption: text("caption"),
createdAt: timestamp("created_at").defaultNow()
})
//InspireLikes
export const likes = pgTable("likes", {
id: uuid("id").defaultRandom().primaryKey(),
postId: uuid("post_id").references(() => posts.id).notNull(),
userId: uuid("user_id").references(() => users.id).notNull(),
})
//InspireComments
export const comments = pgTable("comments", {
id: uuid("id").defaultRandom().primaryKey(),
postId: uuid("post_id").references(() => posts.id).notNull(),
userId: uuid("user_id").references(() => users.id).notNull(),
text: text("text").notNull(),
createdAt: timestamp("created_at").defaultNow()
})
