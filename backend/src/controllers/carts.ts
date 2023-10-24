import { RequestHandler } from "express";
import Product from "../models/product";
import Cart from "../models/cart";
import keys from "../config/keys";
import * as store from '../utils/store';

// import Category from '../../models/category';

const { secret, tokenLife } = keys.jwt;

interface CartBody {
  sku: string;
  name: string;
  description: string;
  quantity: string;
  price: string;
  taxable: string;
  isActive: string;
  brand: string;
  imageUrl: string;
}
export const getCart: RequestHandler = async (req: any, res: any) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");

    res.status(200).json({
      success: true,
      cart: cart
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}

export const createCart: RequestHandler = async (req: any, res: any) => {
  try {
    const user = req.user._id;
    const items = req.body;

    const products = store.caculateItemsSalesTax([items]);


    const cart = new Cart({
      user,
      products
    });

    const cartDoc = await cart.save();

    // decreaseQuantity(products);

    res.status(200).json({
      success: true,
      cartId: cartDoc.id
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}

export const updateCart: RequestHandler = async (req, res) => {
  try {
    const product = req.body.product;
    const query = { _id: req.params.cartId };
    console.log("product", product)
    console.log("query", query)
    await Cart.updateOne(query, { $push: { products: product } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}

export const deleteCart: RequestHandler = async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.cartId });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}
export const deleteProductCart: RequestHandler = async (req, res) => {
  try {
    const product = { product: req.params.productId };
    const query = { _id: req.params.cartId };

    await Cart.updateOne(query, { $pull: { products: product } }).exec();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}
const decreaseQuantity = (products: any[]) => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};
