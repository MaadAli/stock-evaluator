import {
  getCurrentStock,
} from '../src/index';
import {
  getTransactionalStock,
} from '../src/transaction-service';
import {
  getProductStock,
} from '../src/stock-service';
describe('getCurrentStock', () => {
  it('returns the correct stock for a valid SKU', async () => {
    expect(await getCurrentStock('EDI062104/16/63')).toEqual({'sku': 'EDI062104/16/63', qty: 5879});
  });

  it('returns the correct transactions stock for a valid SKU', () => {
    expect(getTransactionalStock('EDI062104/16/63')).toEqual(-116);
  });

  it('returns the correct inventory stock for a valid SKU', () => {
    expect(getProductStock('EDI062104/16/63')).toEqual(5995);
  });

  it('throws an error for an empty or invalid SKU', async() => {
    expect.assertions(1);
    try {
      await getCurrentStock('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toBe('sku is either empty or invalid');
      } else {
        console.log('Unknown Error detected');
      }
    }
  });
  it('throws an error if no such sku exist in transactions', async() => {
    expect.assertions(1);
    try {
      await getCurrentStock(' ');
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toBe('sku is either empty or invalid');
      } else {
        console.log('Unknown Error detected');
      }
    }
  });

  it('throws an error if there is no transactional stock for the given SKU', async() => {
    expect.assertions(1);
    try {
      await getCurrentStock('abcd');
    } catch (err: unknown) {
      if (err instanceof Error) {
        expect(err.message).toBe('No such sku exists');
      } else {
        console.log('Unknown Error detected');
      }
    }
  });

  it('returns 0 if no such sku exist in stock', () => {
    expect(getProductStock('type')).toEqual(0);
  });
});
