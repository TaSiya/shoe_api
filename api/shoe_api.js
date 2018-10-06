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
    async function loadAPI (req, res) {
        try{
            let cart = await service.allCart();
            let stock = await service.allJoined();
            let allBrands = await service.allBrands();
            let allColours = await service.allColours();
            res.json({status: 'success',cart, stock, allBrands, allColours});
        } catch(err) {

        }
    }
    return {
        getAll,
        dropDowns,
        cartSection,
        loadAPI
    }
}