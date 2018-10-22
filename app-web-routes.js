const ShoeApi = require('./api/shoe_api');
const ShoeServices = require('./services/shoeServices');

module.exports = function (app, pool) {
    const service = ShoeServices(pool);
    const api = ShoeApi(service);
    // API  
    app.get('/api/stock', api.getAll);
    app.get('/api/default', api.dropDowns);
    app.get('/api/cart', api.cartSection);
    app.post('/api/add', api.addStock);
    app.get('/api/stock/:id', api.addCart);
    app.get('/api/clearCart', api.deleteCart);
    app.get('/api/clearStock', api.deleteStock);
    app.get('/api/remove/:id', api.removeItemCart);
    app.get('/api/filter/brand/:brand', api.filterByBrand);
    app.get('/api/filter/colour/:colour', api.filterByColour);
    app.get('/api/filter/size/:size', api.filterBySize);
    app.get('/api/filter/stock/:stock', api.filterByStock);
    
    return app;
}