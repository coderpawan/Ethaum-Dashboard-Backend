import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addOrUpdateProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  updateApprovalDetails,
} from "../controllers/productController.js";
import {
  authenticate,
  authorizeAdmin,
  authorizeSeller,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeSeller, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router
  .route("/:id/reviews")
  .post(authenticate, checkId, addOrUpdateProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.route("/approval/:id").put(authenticate,authorizeAdmin,formidable(),updateApprovalDetails);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeSeller, formidable(), updateProductDetails)
  .delete(authenticate, authorizeSeller, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
