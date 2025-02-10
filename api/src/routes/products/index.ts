import { Router } from "express";
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./productsConstroller";
import { validateData } from "../../middlewares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "../../db/productsSchema";
import { verifyToken, verifySeller } from "../../middlewares/authMiddleware";

const router = Router();


router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, verifySeller, validateData(createProductSchema), createProduct);
router.put('/:id', verifyToken, verifySeller, validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);


export default router;