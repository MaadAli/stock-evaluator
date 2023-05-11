import { getTransactionSkus, getTransactionalStock } from './transaction-service';
import { getInventoryStock, getStockSkus } from './stock-service';

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

