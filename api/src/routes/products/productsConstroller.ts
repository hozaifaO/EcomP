import { Request, Response } from 'express';

export function listProducts(req: Request, res: Response) {
  res.send('Boilerplate for listProducts');
}

export function getProductById(req: Request, res: Response) {
    res.send('Boilerplate for getProductById');
}

export function createProduct(req: Request, res: Response) {
    res.send('Boilerplate for createProduct');
}

export function updateProduct(req: Request, res: Response) {
    res.send('Boilerplate for updateProduct');
}

export function deleteProduct(req: Request, res: Response) {
    res.send('Boilerplate for deleteProduct');
}

