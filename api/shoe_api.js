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
        loadAPI
    }
}