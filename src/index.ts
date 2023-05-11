import stock from './stock.json';
import transactions from './transactions.json';
import constants from './constants';
import { transaction, inventory } from './types';

export const getCurrentStock = async(sku: string): Promise<{sku: string, qty: number}> => {
  if (!sku.trim().length) {
    throw new Error('sku is either empty or invalid');
  }
  const transactionalStock: number = getTransactionalStock(sku);
  const inventoryStock: number = getInventoryStock(sku);
  return {sku, qty: transactionalStock + inventoryStock};
};

export const getTransactionalStock = (sku: string): number => {
  const skuTransactions = transactions.filter(
    (t: transaction) => t.sku === sku
  );
  if (skuTransactions.length === 0)
    throw new Error('No such sku exist in transactions');

  return skuTransactions.reduce((result: number, transaction: transaction) => {
    return transaction.type === constants.ORDER
      ? (result += result -= transaction.qty)
      : (result += transaction.qty);
  }, 0);
};

export const getInventoryStock = (sku: string): number => {
  return stock.reduce((result: number, stockPile: inventory) => {
    return stockPile.sku === sku ? (result += stockPile.stock) : result;
  }, 0);
};