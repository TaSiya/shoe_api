module.exports = function(service) {
    async function getAll(req, res) {
        try{
            let data = await service.allJoined();
            res.json({
                status : 'success',
                result : data
            })
        } catch(err) {
            res.send(err);
        }
    } 
    async function dropDowns (req, res) {
        try{
            let brands = await service.allBrands();
            let colours = await service.allColours();
            res.json({
                status : 'success',
                brands,
                colours
            })
        } catch(err) {

        }
    }
    async function cartSection(req, res) {
        try{
            let cart = await service.allCart();
            let total = 0 ;
            for(let i = 0 ; i < cart.length ; i ++) {
                total = total + cart[i].price * cart[i].quantity;
            }

            res.json({
                status : 'success',
                total,
                cart
            })
        } catch(err) {
            res.json({
                status : 'not found',
                response : err.stack
            })
        }
    }
    async function addStock (req, res) {
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
            await service.insertStock(item);
            res.json({status: 'success'});
        } catch(err) {

        }
    }
    return {
        getAll,
        dropDowns,
        cartSection,
        addStock
    }
}