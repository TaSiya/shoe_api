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
    return {
        getAll,
        dropDowns
    }
}