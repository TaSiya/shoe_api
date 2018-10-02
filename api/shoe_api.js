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

    return {
        getAll
    }
}