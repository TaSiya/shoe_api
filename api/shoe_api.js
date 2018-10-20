module.exports = function (service) {
    async function getAll(req, res) {
        try {
            let data = await service.allJoined();
            res.json({
                status: 'success',
                result: data
            })
        } catch (err) {
            res.send(err);
        }
    }
    async function dropDowns(req, res) {
        try {
            let brands = await service.allBrands();
            let colours = await service.allColours();
            let size = await service.allStockSize();
            res.json({
                status: 'success',
                brands,
                colours,
                size
            })
        } catch (err) {

        }
    }
    async function cartSection(req, res) {
        try {
            let cart = await service.allCart();
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total = total + cart[i].price * cart[i].stock;
            }

            res.json({
                status: 'success',
                total,
                cart
            })
        } catch (err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function addStock(req, res) {
        try {
            let name = req.body.name;
            let colourtag = req.body.colourtag;
            let size = parseInt(req.body.size);
            let stocks = parseInt(req.body.stock);
            let price = parseFloat(req.body.price);
            let brand = await service.selectBrand(name);
            let colour = await service.selectColour(colourtag);
            let item = {
                brand_id: brand[0].id,
                colour_id: colour[0].id,
                size: size,
                price: price,
                stock: stocks
            }
            let data = await service.addingStock(item);
            res.json({
                status: 'success',
                data
            });
        } catch (err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function addCart(req, res) {
        try {

            let id = req.params.id;
            let idData = await service.selectItem(id);
            let isFound ;
            if(idData[0].stock == 1){
                isFound = await service.addToCart(id);
                await service.removeStock(id);
            }
            else{
                isFound = await service.addToCart(id);
            }
            res.json({
                status: 'success',
                isFound
            })
        } catch (err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function deleteCart(req, res) {
        try {
            await service.removeAllCart();
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function deleteStock(req, res) {
        try {
            await service.removeAllStock();
            res.json({
                status: 'success'
            });
        } catch (err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function removeItemCart(req, res) {
        try{
            let id = req.params.id;
            
        } catch(err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function filterByBrand( req, res) {
        try{
            let brand = req.params.brand;
            let filtered = await service.filterName(brand);
            res.json({
                status : 'success',
                filtered
            })
        } catch(err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function filterByColour(req, res) {
        try{
            let colour = req.params.colour;
            let filtered = await service.filterColour(colour);

            res.json({
                status : 'success',
                filtered
            })
        } catch(err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    async function filterBySize(req, res) {
        try{
            let size = parseInt(req.params.size);
            let filtered = await service.filterSize(size);
            console.log(filtered);
            
            res.json({
                status : 'success',
                filtered
            })
        } catch(err) {
            res.json({
                status: 'not found',
                response: err.stack
            })
        }
    }
    return {
        getAll,
        dropDowns,
        cartSection,
        addStock,
        addCart,
        deleteCart,
        deleteStock,
        removeItemCart,
        filterByBrand,
        filterByColour,
        filterBySize
    }
}