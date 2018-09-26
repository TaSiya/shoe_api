const assert =require('assert') ;
const pg =require('pg') ;
const Services = require('../services/shoeServices'); 

const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/shoe_api_db';

const pool = new Pool({
    connectionString,
    ssl : useSSL
});

describe('Shoe Catalogue API tests', function () {
    describe('counting default tables', function () {
        it('rows in table for brands', async function () {
            let brands = Services(pool);
            let result = await brands.allBrands();
            assert.strictEqual(result.length, 6);
        });
        it('rows in table for colours', async function () {
            let colours = Services(pool);
            let result = await colours.allBrands();
            assert.strictEqual(result.length, 6);
        });
    });
    describe('putting in the stock', function () {
        beforeEach(async function () {
            await pool.query('delete from items');
        });
        it('inserting 2 shoes in the stock', async function () {
            let item = Services(pool);
            let item1 = {price: 30, size: 1, stock: 10, brand_id: 1, colour_id: 5  }
            await item.addingStock(item1);
            let item2 = {price: 99.99, size: 5, stock: 20, brand_id: 2, colour_id: 7  }
            await item.addingStock(item2);
            let result = await item.allStock();
            assert.strictEqual(result.length, 2);
        })
        it('adding four (4) shoes in the stock', async function () {
            let item = Services(pool);
            let item1 = {price: 333.49, size: 4, stock: 12, brand_id: 4, colour_id: 8  }
            let item2 = {price: 99.99, size: 3, stock: 32, brand_id: 3, colour_id: 2  }
            let item3 = {price: 399.99, size: 6, stock: 15, brand_id: 6, colour_id: 1  }
            let item4 = {price: 199.99, size: 5, stock: 20, brand_id: 1, colour_id: 5  }
            await item.addingStock(item1);
            await item.addingStock(item2);
            await item.addingStock(item3);
            await item.addingStock(item4);
            let result = await item.allStock();
            assert.strictEqual(result.length, 4);
        });
        
    });
    describe('Incrementing the stock and the new price', function () {
        beforeEach(async function () {
            await pool.query('delete from items');
        });
        it('updating the stock of single shoe', async function () {
            let item = Services(pool);
            let item1 = {price: 333.49, size: 4, stock: 12, brand_id: 4, colour_id: 8  }
            let item2 = {price: 99.99, size: 3, stock: 32, brand_id: 3, colour_id: 2  }
            let item3 = {price: 399.99, size: 6, stock: 15, brand_id: 6, colour_id: 1  }
            let item4 = {price: 199.99, size: 5, stock: 20, brand_id: 1, colour_id: 5  }
            let item5 = {price: 200.00, size: 5, stock: 20, brand_id: 1, colour_id: 5  }
            let item6 = {price: 5000.00, size: 5, stock: 1, brand_id: 1, colour_id: 5  }
            await item.addingStock(item1);
            await item.addingStock(item2);
            await item.addingStock(item3);
            await item.addingStock(item4);
            await item.addingStock(item5);
            await item.addingStock(item6);
            let result = await item.allStock();
            assert.strictEqual(result[3].stock, 41);
        });
    });
    after( function () {
        pool.end();
    })
});