import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

// routes
// create product route

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);
// get products route

router.get(
  "/get-product",

  getProductController
);

// get single product route

router.get(
  "/get-product/:slug",

  getSingleProductController
);

// get photo route

router.get("/product-photo/:id", productPhotoController);

// delete product route

router.delete(
  "/delete-product/:pid",

  deleteProductController
);

// update product route

router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    ExpressFormidable(),
    updateProductController
  );
export default router;
