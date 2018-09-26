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
            await item.insertStock(30,1,10,1,5);
            await item.insertStock(199.99, 5, 20, 1, 5);
            let result = await item.allStock();
            assert.strictEqual(result.length, 2);
        })
    });
    after( function () {
        pool.end();
    })
});