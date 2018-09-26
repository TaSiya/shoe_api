module.exports = function(service) {
    async function getAll(req, res) {
        try{
            let data = await service.allShoes();
            res.json({
                status : 'success',
                result : data
            })
        } catch(err) {
            next(err);
        }
    }
    return {
        getAll
    }
}