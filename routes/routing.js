module.exports = function (service) {
    async function client (req, res) {
        try{
            let cart = await service.allCart();
            let stock = await service.allJoined();
            let allBrands = await service.allBrands();
            let allColours = await service.allColours();
            res.render('client', {cart, stock, allBrands, allColours});
        } catch(err) {
            res.send(err);
        }
    }
    async function addStock(req, res) {
        try{
            let name = req.body.brandTag;
            
            let colourtag = req.body.colours;
            let size = parseInt(req.body.size);
            let stocks = parseInt(req.body.stock);
            let price = parseFloat(req.body.price);

            let brand = await service.selectBrand(name);
            let colour = await service.selectColour(colourtag);
            let item = {
                brand_id :  brand.length === undefined ? brand[0].id:2,
                colour_id :  colour.length=== undefined ? colour[0].id : 1,
                size : size === undefined  || 6,
                price : price === undefined ? price : 250.00,
                stock : stocks === undefined ? stocks : 1
            }
            
            let flag = await service.addingStock(item)

            let cart = await service.allCart();
            let stock = await service.allJoined();
            let allBrands = await service.allBrands();
            let allColours = await service.allColours();
            res.render('client', {cart, stock, allBrands, allColours});
        } catch(err) {
            res.send(err.stack);
        }
    }
    return {
        client,
        addStock
    }
}