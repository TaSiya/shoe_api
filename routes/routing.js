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
                brand_id :  brand[0].id,
                colour_id :  colour[0].id ,
                size : size,
                price : price ,
                stock : stocks 
            }
            let flag = await service.addingStock(item)
            res.redirect('/');
        } catch(err) {
            res.send(err.stack);
        }
    }
    async function addCart (req, res) {
        try{
            let id = req.params.id;
            console.log(id);
            
            await service.addToCart(id);
            res.redirect('/');
        } catch(err) {
            res.send(err.stack);
        }
    }
    async function cancelItem (req, res) {
        try{
            let id = req.params.id;
            let idData = await service.selectInCart(id);
            console.log(idData[0]);
            
            await service.insertStock(idData[0]);
            res.redirect('/');
        } catch(err) {
            res.send(err.stack);
        }
    }
    async function filterByBrand (req, res) {
        try{
            let value = req.params.type;
            // let 
            res.redirect('/');
        } catch(err) {
            res.send(err.stack)
        }
    }
    async function filterByColour(req, res) {
        try{

        } catch(err) {
            res.send(err.stack);
        }
    }
    return {
        client,
        addStock,
        addCart,
        cancelItem,
        filterByBrand,
        filterByColour
    }
}