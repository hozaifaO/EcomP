import e, { Request, Response } from 'express';
import {db} from '../../db/index';
import {productsTable} from '../../db/productsSchema';
import { eq } from 'drizzle-orm';


export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable).execute();
        res.json(products);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id,Number(id)))

        if (!product) {
            res.status(404).send('Product not found');
            return;
        }else {
            res.json(product);
        }
    } catch (error) {
        console.log(error); 
        res.status(500).send('Internal server error');
    }
}

export async function createProduct(req: Request, res: Response) {
    try{
        console.log(req.body);
        await db.insert(productsTable).values(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
    res.status(201).send('Product created');
}

export async function updateProduct(req: Request, res: Response) {
    try {

       const [product] = await db.update(productsTable).set(req.body).where(eq(productsTable.id, Number(req.params.id))).returning();
         if (!product) {
              res.status(404).send('Product not found');
              return;
        }else{
            res.json(product);
        }
    }catch (error) {
        res.status(500).send('Internal server error');
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try{
        const [deletedProduct] = await db.delete(productsTable).where(eq(productsTable.id, Number(req.params.id))).returning();
        if (!deletedProduct) {
            res.status(404).send('Product not found');
            return;
        }else{
            res.json(deletedProduct);
        }
    }catch (error) {
        res.status(500).send('Internal server error');
    }
}

