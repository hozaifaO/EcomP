
import Router from "express";
import { listOrders, getOrderById, createOrder, deleteOrder } from "./ordersController";


const router = Router();



router.get('/', listOrders);
router.get('/:id', getOrderById);
router.post('/',  createOrder);
router.delete('/:id', deleteOrder);