import stock from './stock.json';
import { products } from './types';


//get the qty of a given sku added in inventory
export const getProductStock = (sku: string): number => {
  return stock.reduce((result: number, product: products) => {
    return product.sku === sku ? (result += product.stock) : result;
  }, 0);
};


//filters out the skus in the stock data
export const getProductSkus = (sku: string): products[] => {
  return stock.filter(
    (t: products) => t.sku === sku
  );
}