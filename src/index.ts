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

const main = async(): Promise<void> => {
    try {
        console.log(`here`);
        const stockInfo = await getCurrentStock('EDI062104/16/63');
        console.log(`Stock for given sku: ${stockInfo.sku} is ${stockInfo.qty}`);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(`Error message: ${err.message}`);
        } else {
          console.log('Unknown Error detected');
        }
      }
}

main()