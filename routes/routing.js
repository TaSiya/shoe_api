module.exports = function (service) {
    async function client (req, res) {
        try{
            res.render('client');
        } catch(err) {
            res.send(err);
        }
    }

    return {
        client
    }
}