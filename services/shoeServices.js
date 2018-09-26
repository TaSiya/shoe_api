module.exports = function (pool) {

    //*********************************************************************************************
    // select everything from the tables
    async function allBrands() {
        let result = await pool.query('select * from brands');
        return result.rows;
    }
    async function allColours() {
        let result = await pool.query('select * from colours');
        return result.rows;
    }
    async function allCart () {
        let result = await pool.query('select * from cart');
        return result.rows;
    }
    async function allStock () {
        let result = await pool.query('select * from items');
        return result.rows; 
    }
    async function allJoined () {
        let result = pool.query('select name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id');
        return result.rows;
    }
    //********************************************************************************************* 
    //Inserting into the tables
    async function insertBrand (brand) {
        await pool.query('insert into brands (name) values ($1)', [brand]);
    }
    async function insertColour (colour) {
        await pool.query('insert into colours (colourTag) values ($1)', [colour])
    }
    async function insertCart (shoe) {
        await pool.query('insert into cart (shoe,shoeColour,price,size,quantity,item_id) values ($1,$2,$3,$4,$5,$6)',[shoe.name, shoe.colourtag, shoe.price, shoe.size, shoe.stock,shoe.id]);
    }
    async function insertStock (price, size, stock, brand_id, colour_id) {
        await pool.query('insert into items (price, size, stock, brand_id, colour_id) values ($1,$2,$3,$4,$5)',[price, size, stock, brand_id, colour_id]);
    }

    //*********************************************************************************************
    // Selecting specific data
    async function selectBrand (brand) {
        let result = await pool.query('select * from brands where name = $1',[brand]);
        return result.rows;
    }
    async function selectColour (colour) {
        let result = await pool.query('select * from colours where colourTag = $1',[colour]);
        return result.rows;
    }
    //filtering the stock
    async function filterPrice (price) {
        let result = await pool.query('select items.id, name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id where price=$1',[price]);
        return result.rows;
    }
    async function filterStock (stock) {
        let result = await pool.query('select items.id, name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id where stock=$1',[stock]);
        return result.rows;
    }
    async function filterSize (size) {
        let result = await pool.query('select items.id, name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id where size=$1',[size]);
        return result.rows;
    }
    async function filterName (name) {
        let result = await pool.query('select items.id, name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id where name=$1',[name]);
        return result.rows;
    }
    async function filterColour (colourtag) {
        let result = await pool.query('select items.id, name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id where colourtag=$1',[colourtag]);
        return result.rows;
    }

    return {
        allBrands,
        allColours,
        allCart,
        allStock,
        allJoined,
        insertBrand,
        insertColour,
        insertCart,
        insertStock,
        selectBrand,
        selectColour,
        filterPrice,
        filterStock,
        filterSize,
        filterName,
        filterColour

    }
}