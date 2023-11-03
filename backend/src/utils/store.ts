import Product from '../models/product';
import { taxConfig } from '../config/tax';

export const disableProducts = (products: any[]) => {
  let bulkOptions = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { isActive: false }
      }
    };
  });

  Product.bulkWrite(bulkOptions);
};

// calculate order tax amount
export const caculateTaxAmount = (order: any) => {
  try {
    const taxRate = taxConfig.stateTaxRate;

    order.totalTax = 0;
    if (order.products && order.products.length > 0) {
      order.products.map((item: { purchasePrice: any; product: { price: any; taxable: any; }; quantity: any; totalPrice: number; status: string; priceWithTax: number; totalTax: number; }) => {
        const price = item.purchasePrice || (item?.product?.price ?? 0);
        const quantity = item.quantity;
        item.totalPrice = price * quantity;
        item.purchasePrice = price;

        if (item.status !== 'Cancelled') {
          if (item.product?.taxable && item.priceWithTax === 0) {
            const taxAmount = price * (taxRate / 100) * 100;
            item.totalTax = parseFloat((taxAmount * quantity).toFixed(2));

            order.totalTax += item.totalTax;
          } else {
            order.totalTax += item.totalTax;
          }
        }

        item.priceWithTax = parseFloat(
          (item.totalPrice + item.totalTax).toFixed(2)
        );
      });
    }

    const hasCancelledItems = order.products.filter(
      (item: { status: string; }) => item.status === 'Cancelled'
    );

    if (hasCancelledItems.length > 0) {
      order.total = caculateOrderTotal(order);
    }

    const currentTotal = caculateOrderTotal(order);

    if (currentTotal !== order.total) {
      order.total = caculateOrderTotal(order);
    }

    order.totalWithTax = order.total + order.totalTax;
    order.total = parseFloat(order.total.toFixed(2));
    order.totalTax = parseFloat(
      order.totalTax && order.totalTax.toFixed(2)
    );
    order.totalWithTax = parseFloat(order.totalWithTax.toFixed(2));
    return order;
  } catch (error) {
    return order;
  }
};

export const caculateOrderTotal = (order: { totalTax?: number; products: any; total?: number; totalWithTax?: number; }) => {
  const total = order.products
    .filter((item: { status: string; }) => item.status !== 'Cancelled')
    .reduce((sum: any, current: { totalPrice: any; }) => sum + current.totalPrice, 0);

  return total;
};

// calculate order tax amount
export const caculateItemsSalesTax = (items: any[]) => {
  const taxRate = taxConfig.stateTaxRate;
  console.log("items", items)

  const products = items.map(item => {
    item.priceWithTax = 0;
    item.totalPrice = 0;
    item.totalTax = 0;
    item.purchasePrice = item.price;
    console.log("item.price", item.price)
    // console.log("purchasePrice", item.purchasePrice)

    const price = item.purchasePrice;
    const quantity = item.quantity;
    item.totalPrice = parseFloat((price * quantity).toFixed(2));

    // if (item.taxable) {
    //   const taxAmount = price * (taxRate / 100) * 100;

    //   item.totalTax = parseFloat((taxAmount * quantity).toFixed(2));
    //   item.priceWithTax = parseFloat((item.totalPrice + item.totalTax).toFixed(2));
    // }

    return item;
  });
  // console.log("products", products)

  return products;
};

export const formatOrders = (orders: any[]) => {
  const newOrders = orders.map(order => {
    return {
      _id: order._id,
      total: parseFloat(order.total.toFixed(2)),
      created: order.created,
      products: order?.cart?.products
    };
  });

  return newOrders.map(order => {
    return order?.products ? caculateTaxAmount(order) : order;
  });
};
