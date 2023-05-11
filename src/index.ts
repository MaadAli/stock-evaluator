import stock from './stock.json';
import transactions from './transactions.json';
import constants from './constants';
import { transaction, inventory } from './types';

// gets the current stock of a given sku validating it first if it exists both in transactions and stock data
export const getCurrentStock = async(sku: string): Promise<{sku: string, qty: number}> => {
  if (!sku.trim().length) {
    throw new Error('sku is either empty or invalid');
  }

  if(getTransactionSkus(sku).length === 0 && getStockSkus(sku).length === 0) {
    throw new Error('No such sku exists');
  }
  const transactionalStock: number = getTransactionalStock(sku);
  const inventoryStock: number = getInventoryStock(sku);
  return {sku, qty: transactionalStock + inventoryStock};
};

//get the qty of a given sku present in transactions and calculates the quantity depending upon if transaction is an order or a refund
export const getTransactionalStock = (sku: string): number => {
  const skuTransactions = getTransactionSkus(sku);

  return skuTransactions.reduce((result: number, transaction: transaction) => {
    return transaction.type === constants.ORDER
      ? (result += result -= transaction.qty)
      : (result += transaction.qty);
  }, 0);
};

//get the qty of a given sku added in inventory
export const getInventoryStock = (sku: string): number => {
  return stock.reduce((result: number, stockPile: inventory) => {
    return stockPile.sku === sku ? (result += stockPile.stock) : result;
  }, 0);
};


//filters out the skus in the transaction data
export const getTransactionSkus = (sku: string): transaction[] => {
  return transactions.filter(
    (t: transaction) => t.sku === sku
  );
}

//filters out the skus in the stock data
export const getStockSkus = (sku: string): inventory[] => {
  return stock.filter(
    (t: inventory) => t.sku === sku
  );
}
