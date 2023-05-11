import transactions from './transactions.json';
import constants from './constants';
import { transaction } from './types';



//get the qty of a given sku present in transactions and calculates the quantity depending upon if transaction is an order or a refund
export const getTransactionalStock = (sku: string): number => {
  const skuTransactions = getTransactionSkus(sku);

  return skuTransactions.reduce((result: number, transaction: transaction) => {
    return transaction.type === constants.ORDER
      ? (result += result -= transaction.qty)
      : (result += transaction.qty);
  }, 0);
};




//filters out the skus in the transaction data
export const getTransactionSkus = (sku: string): transaction[] => {
  return transactions.filter(
    (t: transaction) => t.sku === sku
  );
}


