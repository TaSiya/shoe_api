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
            let brand = req.body.brands;
            let colour = req.body.colours;
            let size = req.body.size;
            let stock = req.bosy.stock;
            let price = req.body.price;
            
            res.redirect('/');
        } catch(err) {
            res.send(err);
        }
    }
    return {
        client,
        addStock
    }
}