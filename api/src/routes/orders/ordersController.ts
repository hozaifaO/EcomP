
import { Request, Response } from 'express';



export async function listOrders(req: Request, res: Response) {res.status(200).send('List of Orders');}

export async function getOrderById(req: Request, res: Response) {res.status(200).send('Order by ID');}

export async function createOrder(req: Request, res: Response) {res.status(200).send('Order Created');}

export async function deleteOrder(req: Request, res: Response) {res.status(200).send('Order Deleted');}