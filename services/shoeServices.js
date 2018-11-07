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
        let result = await pool.query('select * from cart order by price');
        return result.rows;
    }
    async function allStock () {
        let result = await pool.query('select * from items');
        return result.rows; 
    }
    async function allStockSize () {
        let result = await pool.query('select Distinct(size) from items');
        return result.rows; 
    }
    async function allStockStock () {
        let result = await pool.query('select Distinct(stock) from items');
        return result.rows; 
    }
    async function allJoined () {
        let result = await pool.query('select items.id, name, colourtag,old_price, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id order by items.id');
        return result.rows;
    }
    //********************************************************************************************************************************************** 
    //Inserting into the tables
    async function insertBrand (brand) {
        await pool.query('insert into brands (name) values ($1)', [brand]);
    }
    async function insertColour (colour) {
        await pool.query('insert into colours (colourTag) values ($1)', [colour])
    }
    async function insertCart (shoe,newStock) {
        await pool.query('insert into cart (shoe,shoeColour,price,size,stock,item_id) values ($1,$2,$3,$4,$5,$6)',[shoe.name, shoe.colourtag, shoe.price, shoe.size, newStock,shoe.id]);
    }
    async function insertStock (shoe) {
        await pool.query('insert into items (price, size, stock, brand_id, colour_id, old_price) values ($1,$2,$3,$4,$5,$6)',[shoe.price, shoe.size, shoe.stock, shoe.brand_id, shoe.colour_id,0]);
    }

    //********************************************************************************************************************************************** 
    // Selecting specific data
    async function selectBrand (brand) {
        let result = await pool.query('select * from brands where name = $1',[brand]);
        return result.rows;
    }
    async function selectColour (colour) {
        let result = await pool.query('select * from colours where colourTag = $1',[colour]);
        return result.rows;
    }
    async function selectStock(item) {
        let result = await pool.query('select * from items where size =$1 and brand_id = $2 and colour_id =$3',[item.size,item.brand_id,item.colour_id]);
        return result.rows;
    }
    async function selectItemJoined (id) {
        let result = await pool.query('select items.id, name, colourtag, price, size, stock from brands join items on brands.id = items.brand_id join colours on items.colour_id = colours.id where items.id =$1', [id]);
        return result.rows;
    }
    async function selectInCart(id) {
        let result = await pool.query('select * from cart where item_id =$1', [id]);
        return result.rows;
    }
    async function selectItem(id){
        let result = await pool.query('select * from items where id=$1', [id]);
        return result.rows;
       }

    //********************************************************************************************************************************************** 
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

    //********************************************************************************************************************************************** 
    //Updating the tables
    async function updateStock (oldStock, oldPrice, item) {
        await pool.query('update items set stock = $1, price = $2, old_price = $3 where size =$4 and brand_id = $5 and colour_id =$6',[oldStock,item.price,oldPrice,item.size,item.brand_id,item.colour_id]);
    }
    async function updateStockOnly (stock, id) {
        await pool.query('update items set stock = $1 where id = $2', [stock, id]);
    }
    async function updateCart (id, newStock) {
        await pool.query('update cart set stock = $1 where item_id = $2', [newStock, id]);
    }

    //********************************************************************************************************************************************** 
    //removing the tables
    async function removeStock(id) {
        await pool.query('delete from items where id = $1', [id]);
    }
    async function deleteinCart(id) {
        await pool.query('delete from cart where item_id = $1', [id]);
    }

    //********************************************************************************************************************************************** 
    //Logic
    async function addingStock(item) {
        let shoe = await selectStock(item);
        if(shoe.length == 0){
            await insertStock(item)
            return true;
        }
        else{
            let newStock = shoe[0].stock + item.stock;
            
            let oldPrice = shoe[0].price;
            await updateStock(newStock,oldPrice, item)
            return false;
        }
    }
    async function minusStock(item) {
        let newStock = item.stock - 1 ;
        console.log(newStock + " new stock");
        
        if(newStock == 0) {
            console.log('here to remove: '+item.id);
            
            await removeStock(item.id);
        }
        else{
            await updateStockOnly(newStock, item.id);
        }
    }
    async function addToCart(id) {
        let itemData = await selectItemJoined(id);
        let data = itemData[0];
        console.log("data after adding: "+ data.stock);
        let cartData = await selectInCart(id);
        let newStock = 1 ;
        if(cartData.length == 0) {
            await insertCart(data, newStock);
        }
        else{
            newStock = cartData[0].stock + 1;
            await updateCart(id, newStock);
        }
        
        
        await minusStock(data);
        
    }
    async function removeAllCart(){
        await pool.query('delete from cart');
    }
    async function removeAllStock() {
        await pool.query('delete from items')
    }
    return {
        allBrands,
        allColours,
        allCart,
        allStock,
        allStockSize,
        allStockStock,
        allJoined,
        insertBrand,
        insertColour,
        insertCart,
        insertStock,
        selectBrand,
        selectColour,
        selectInCart,
        filterPrice,
        filterStock,
        filterSize,
        filterName,
        filterColour,
        updateStock,
        selectStock,
        selectItemJoined,
        addingStock,
        addToCart,
        removeAllCart,
        removeAllStock,
        removeStock,
        selectItem,
        deleteinCart

    }
}