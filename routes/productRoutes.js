import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getFeaturedProductsController,
  getProductController,
getSingleProductController,
  getTrendingProductsController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
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

//get photo
router.get("/product-photo/:pid", productPhotoController);

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

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get('/braintree/token',braintreeTokenController )

router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

// Route for fetching featured products
router.get("/featured-products", getFeaturedProductsController)

router.get("/trending-products", getTrendingProductsController);

export default router;
