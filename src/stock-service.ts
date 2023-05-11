import stock from './stock.json';
import { inventory } from './types';


//get the qty of a given sku added in inventory
export const getInventoryStock = (sku: string): number => {
  return stock.reduce((result: number, stockPile: inventory) => {
    return stockPile.sku === sku ? (result += stockPile.stock) : result;
  }, 0);
};


//filters out the skus in the stock data
export const getStockSkus = (sku: string): inventory[] => {
  return stock.filter(
    (t: inventory) => t.sku === sku
  );
}