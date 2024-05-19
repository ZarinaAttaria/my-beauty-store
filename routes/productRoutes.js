import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  searchProductController,
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

  // filter product

router.post(
  "/product-filters",
 
  productFilterController
);

  //  product count

  router.get(
    "/product-count",
   
    productCountController
  );

   //  product per page

   router.get(
    "/product-list/:page",
   
    productListController
  );

  //search product
router.get("/search/:keyword", searchProductController);

export default router;
