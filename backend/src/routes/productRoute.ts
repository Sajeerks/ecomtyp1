import express from "express";
import {
  createNewProduct,
  creteProductReview,
  deleteProduct,
  deleteProductReview,
  gerProductReviews,
  getAllproducts,
  getSingleProduct,
  updateProduct,
  getAllProductsAdmin,
} from "../controllers/productController";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth";

export const productRouter = express.Router();

productRouter
  .route("/admin/AllproductsList").get(isAuthenticatedUser,authorizedRoles("admin"),   getAllProductsAdmin,
    )

productRouter.route("/allproducts").get( getAllproducts);
productRouter
  .route("/createproduct")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createNewProduct);



productRouter
  .route("/createReview")
  .put( isAuthenticatedUser,creteProductReview);

  productRouter
  .route("/getproductReviews").get(isAuthenticatedUser,gerProductReviews)
  .delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProductReview)
  productRouter
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .get(getSingleProduct);
