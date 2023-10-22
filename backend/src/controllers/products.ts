import { RequestHandler } from "express";
import Product from "../models/product";
import keys from "../config/keys";
import randomBytes from 'randombytes';

import Brand from '../models/brand';
// import Category from '../../models/category';

const { secret, tokenLife } = keys.jwt;

interface ProductBody {
     sku :string;
     name :string;
     description :string;
     quantity :string;
     price :string;
     taxable :string;
     isActive :string;
     brand :string;
     imageUrl :string;
}

export const getProducts : RequestHandler<unknown, unknown, ProductBody, unknown> =async (req, res) => {
  try {
    let products = [];

    // if (req.user.merchant) {
    //   const brands = await Brand.find({
    //     merchant: req.user.merchant
    //   }).populate('merchant', '_id');

    //   const brandId = brands[0]?.['_id'];

      products = await Product.find({})
        .populate({
          path: 'brand',
          populate: {
            path: 'merchant',
            model: 'Merchant'
          }
        })
    //     .where('brand', brandId);
    // } else {
    //   products = await Product.find({}).populate({
    //     path: 'brand',
    //     populate: {
    //       path: 'merchant',
    //       model: 'Merchant'
    //     }
    //   });
    // }
    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
}
export const getProduct: RequestHandler<unknown, unknown, ProductBody, unknown> = async (req, res, next) => {
    try {
        const productId = (req.params as any).id;

        let productDoc = null;
        productDoc = await Product.findOne({ _id: productId })
        // if (req.user.merchant) {
        //     const brands = await Brand.find({
        //     merchant: req.user.merchant
        //     }).populate('merchant', '_id');

        //     const brandId = brands[0]['_id'];

        //     productDoc = await Product.findOne({ _id: productId })
        //     .populate({
        //         path: 'brand',
        //         select: 'name'
        //     })
        //     .where('brand', brandId);
        // } else {
        //     productDoc = await Product.findOne({ _id: productId }).populate({
        //     path: 'brand',
        //     select: 'name'
        //     });
        // }

        // if (!productDoc) {
        //     return res.status(404).json({
        //     message: 'No product found.'
        //     });
        // }

        res.status(200).json({
            product: productDoc
        });
        } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
};

export const addProduct: RequestHandler<unknown, unknown, ProductBody, unknown> =async (req, res) => {
    try {
      
      // const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
        const taxable = req.body.taxable;
        const isActive = req.body.isActive;
        const brand = req.body.brand;
        // const imageUrl = req.body.imageUrl;
        const imageUrl = req.file ? req.file.filename : null;
      // console.log("image", imageUrl)
        // if (!sku) {
        //   return res.status(400).json({ error: 'You must enter sku.' });
        // }
  
        if (!description || !name) {
          return res
            .status(400)
            .json({ error: 'You must enter description & name.' });
        }
  
        if (!quantity) {
          return res.status(400).json({ error: 'You must enter a quantity.' });
        }
  
        if (!price) {
          return res.status(400).json({ error: 'You must enter a price.' });
        }
  
        // const foundProduct = await Product.findOne({ sku });
  
        // if (foundProduct) {
        //   return res.status(400).json({ error: 'This sku is already in use.' });
        // }
  
        // const { imageUrl, imageKey } = await s3Upload(image);
        // const imageUrl = image ? image.filename : null;
  
        const product = new Product({
          // sku,
          name,
          description,
          quantity,
          price,
          // taxable,
          // isActive,
          brand,
          imageUrl,
          // imageKey
        });

        const savedProduct = await product.save();
  
        res.status(200).json({
          success: true,
          message: `Product has been added successfully!`,
          product: savedProduct
        });
    } catch (error) {
      console.log(error)
        return res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
      });
    }
}
export const updateProduct:RequestHandler = async (req, res)=>{
    try {
        const productId = req.params.id;
        const update = req.body;
        // console.log("product",req.body )
        const query = { _id: productId };
        const { sku, slug } = req.body;
    
        const foundProduct : any = await Product.findOne({
            $or: [{ slug }, { sku }]
        });
    
        if (foundProduct && foundProduct._id != productId) {
            return res
            .status(400)
            .json({ error: 'Sku or slug is already in use.' });
        }
    
        await Product.findOneAndUpdate(query, update, {
            new: true
        });
    
        res.status(200).json({
            success: true,
            message: 'Product has been updated successfully!'
        });
    } catch (error) {
      console.log(error)
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

export const deleteProduct: RequestHandler = async (req, res) =>{
    try {
        const product = await Product.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: `Product has been deleted successfully!`,
            product
        });
    } catch (error) {
        res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
        });
    }
}   
// fetch product api
  
  
//   router.put(
//     '/:id/active',
//     auth,
//     role.check(ROLES.Admin, ROLES.Merchant),
//     async (req, res) => {
//       try {
//         const productId = req.params.id;
//         const update = req.body.product;
//         const query = { _id: productId };
  
//         await Product.findOneAndUpdate(query, update, {
//           new: true
//         });
  
//         res.status(200).json({
//           success: true,
//           message: 'Product has been updated successfully!'
//         });
//       } catch (error) {
//         res.status(400).json({
//           error: 'Your request could not be processed. Please try again.'
//         });
//       }
//     }
//   );
