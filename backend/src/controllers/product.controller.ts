import { Response } from "express"
import { db } from "../db"
import { products } from "../db/schema"
import { eq } from "drizzle-orm"
import { AuthRequest } from "../middlewares/auth.middleware"

/* ------------------------- CREATE PRODUCT ------------------------- */
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // 🔐 Allow only admin & brand
    if (req.user.role !== "admin" && req.user.role !== "brand") {
      return res.status(403).json({ message: "Not allowed to create product" })
    }

    const {
      name,
      description,
      price,
      category,
      type,
      images,
      stock,
      brandId, // 👈 important for admin usage
    } = req.body

    const result = await db.insert(products).values({
      name,
      description,
      price,
      category,
      type,
      images,
      stock,

      uploadedBy: req.user.role,

      // admin selects brand, brand uses their own
      brandId: req.user.role === "admin" ? brandId : brandId,
    }).returning()

    return res.status(201).json(result[0])
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error creating product" })
  }
}

/* ------------------------- GET ALL PRODUCTS ------------------------- */
export const getProducts = async (_req: AuthRequest, res: Response) => {
  try {
    const result = await db.select().from(products)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" })
  }
}

/* ------------------------- GET PRODUCT BY ID ------------------------- */
export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params as { id: string }

    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product" })
  }
}

/* ------------------------- UPDATE PRODUCT ------------------------- */
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { id } = req.params as { id: string }
    const { name, price, description } = req.body

    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    if (!existing) {
      return res.status(404).json({ message: "Product not found" })
    }

    // 🔐 ADMIN can update anything
    if (req.user.role === "admin") {
      await db
        .update(products)
        .set({ name, price, description })
        .where(eq(products.id, id))

      return res.status(200).json({ message: "Product updated" })
    }

    // 🔐 BRAND can update only their products
    if (req.user.role === "brand") {
      if (existing.brandId !== req.body.brandId) {
        return res.status(403).json({ message: "Not your product" })
      }

      await db
        .update(products)
        .set({ name, price, description })
        .where(eq(products.id, id))

      return res.status(200).json({ message: "Product updated" })
    }

    return res.status(403).json({ message: "Not allowed" })
  } catch (error) {
    return res.status(500).json({ message: "Error updating product" })
  }
}

/* ------------------------- DELETE PRODUCT ------------------------- */
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const { id } = req.params as { id: string }

    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    if (!existing) {
      return res.status(404).json({ message: "Product not found" })
    }

    // 🔐 ADMIN can delete anything
    if (req.user.role === "admin") {
      await db.delete(products).where(eq(products.id, id))
      return res.status(200).json({ message: "Product deleted" })
    }

    // 🔐 BRAND can delete only their own products
    if (req.user.role === "brand") {
      if (existing.brandId !== req.body.brandId) {
        return res.status(403).json({ message: "Not your product" })
      }

      await db.delete(products).where(eq(products.id, id))
      return res.status(200).json({ message: "Product deleted" })
    }

    return res.status(403).json({ message: "Not allowed" })
  } catch (error) {
    return res.status(500).json({ message: "Error deleting product" })
  }
}
// import { Response } from "express";
// import { db } from "../db";
// import { products } from "../db/schema";
// import { eq } from "drizzle-orm";
// import { AuthRequest } from "../middlewares/auth.middleware";

// // CREATE PRODUCT
// export const createProduct = async (req: AuthRequest, res: Response) => {
//   try {

//     // 🔐 Allow only admin & brand
//     if (req.user!.role !== "admin" && req.user!.role !== "brand") {
//       return res.status(403).json({ message: "Not allowed to create product" });
//     }

//     const {
//       name,
//       description,
//       price,
//       category,
//       type,
//       images,
//       stock
//     } = req.body;

//     const result = await db.insert(products).values({
//       name,
//       description,
//       price,
//       category,
//       type,
//       images,
//       stock,

//       // 🔥 Auto set from token
//       uploadedBy: req.user!.role,

//       // 🔥 Only brands get brandId
//       brandId: req.user!.role === "brand" ? req.user!.id : null

//     }).returning();

//     res.status(201).json(result);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error creating product", error });
//   }
// };

// // GET ALL PRODUCTS
// export const getProducts = async (req: AuthRequest, res: Response) => {
//   try {
//     const result = await db.select().from(products);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// };

// // GET PRODUCT BY ID
// export const getProductById = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params as { id: string };

//     const result = await db
//       .select()
//       .from(products)
//       .where(eq(products.id, id));

//     res.status(200).json(result[0]);

//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };

// // UPDATE PRODUCT
// export const updateProduct = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params as { id: string };
//     const { name, price, description } = req.body;

//     // 🔐 Optional: restrict update also
//     if (req.user!.role !== "admin" && req.user!.role !== "brand") {
//       return res.status(403).json({ message: "Not allowed to update product" });
//     }

//     await db
//       .update(products)
//       .set({ name, price, description })
//       .where(eq(products.id, id));

//     res.status(200).json({ message: "Product updated" });

//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// };

// // DELETE PRODUCT
// export const deleteProduct = async (req: AuthRequest, res: Response) => {
//   try {
//     const { id } = req.params as { id: string };

//     // 🔐 Optional: restrict delete also
//     if (req.user!.role !== "admin" && req.user!.role !== "brand") {
//       return res.status(403).json({ message: "Not allowed to delete product" });
//     }

//     await db.delete(products).where(eq(products.id, id));

//     res.status(200).json({ message: "Product deleted" });

//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// };