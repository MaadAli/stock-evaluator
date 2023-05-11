import {getCurrentStock, getInventoryStock, getTransactionalStock} from '../src/index'
describe('getCurrentStock', () => {  
    it('returns the correct stock for a valid SKU', () => {
      expect(getCurrentStock('EDI062104/16/63')).toEqual(5879);
    });

    it('returns the correct transactions stock for a valid SKU', () => {
        expect(getTransactionalStock('EDI062104/16/63')).toEqual(-116);
    });

    it('returns the correct inventory stock for a valid SKU', () => {
        expect(getInventoryStock('EDI062104/16/63')).toEqual(5995);
    });
  
    it('throws an error for an empty or invalid SKU', () => {
      expect(() => getCurrentStock('')).toThrow('sku is either empty or invalid');
      expect(() => getCurrentStock(' ')).toThrow('sku is either empty or invalid');
    });
    it('throws an error if no such sku exist in transactions', () => {
        expect(() => getCurrentStock('type')).toThrow('No such sku exist in transactions');
    });
  
    it('throws an error if there is no transactional stock for the given SKU', () => {
      expect(() => getCurrentStock('type')).toThrow('No such sku exist in transactions');
    });

    it('returns 0 if no such sku exist in stock', () => {
        expect(getInventoryStock('type')).toEqual(0);
    });
  });