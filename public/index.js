const api = APIServices();
const dom = DomFactory();

/* **********************************************************************************************************************
# Referencing the dom elements
*/

const displayStock = document.querySelector('.insertStock'); //Display the stock
/* **********************************************************************************************************************
# Adding section values
*/
const brandSection = document.querySelector('.brandSection');
const colourSection = document.querySelector('.colourSection');
const sizeSection = document.querySelector('.sizeSection');
const stockSection = document.querySelector('.stockSection');
const priceSection = document.querySelector('.priceSection');

const cartDisplay = document.querySelector('.cartDisplay');
const totalDisplay = document.querySelector('.totalDisplay');
const filterBrandSection = document.querySelector('.filterBrandSection');
const filterColourSection = document.querySelector('.filterColourSection');
const filterSizeSection = document.querySelector('.filterSizeSection');
const filterStockSection = document.querySelector('.filterStockSection');


const displayMessage = document.querySelector('.displayMessage');

const stockTemplate = document.querySelector('.stockTemplate').innerHTML; // Template for stock display
const dropdowsBrandsTemplate = document.querySelector('.dropdowsBrandsTemplate').innerHTML;
const dropdowsColoursTemplate = document.querySelector('.dropdowsColoursTemplate').innerHTML;
const cartTemplate = document.querySelector('.cartTemplate').innerHTML;
const filterBrandTemplate = document.querySelector('.filterBrandTemplate').innerHTML;
const filterColourTemplate = document.querySelector('.filterColourTemplate').innerHTML;
const filterSizeTemplate = document.querySelector('.filterSizeTemplate').innerHTML;
const filterStockTemplate = document.querySelector('.filterStockTemplate').innerHTML;

let stockTemplateInstance = Handlebars.compile(stockTemplate);
let brandTemplateInstance = Handlebars.compile(dropdowsBrandsTemplate);
let colourTemplateInstance = Handlebars.compile(dropdowsColoursTemplate);
let filterBrandCompiler = Handlebars.compile(filterBrandTemplate);
let filterColourCompiler = Handlebars.compile(filterColourTemplate);
let filterSizeCompiler = Handlebars.compile(filterSizeTemplate);
let filterStockCompiler = Handlebars.compile(filterStockTemplate);
let cartCompiler = Handlebars.compile(cartTemplate);

document.addEventListener("DOMContentLoaded", function () {
    dom.reOrder();

});

function adding(id, stock) {
    api.addingCart(id).then(function (result) {
        let response = result.data;
        if (stock == 1) {
            document.querySelector('.id' + id).classList.add('hidden');
        } else {
            document.querySelector('.id' + id).classList.remove('hidden');
        }

        dom.reOrder();
    });
}

function addNewStock() {
    name = brandSection.value,
        colourtag = colourSection.value,
        size = sizeSection.value,
        stock = stockSection.value,
        price = priceSection.value
    api.addNewStock(name, colourtag, size, stock, price).then(function (result) {
        let response = result.data;
        let found = response.data;
        dom.reOrder();
    });
}

function deleteCart() {
    api.removeCart().then(function (result) {
        let response = result.data;
        let status = response.status;
        if (status === 'success') {
            dom.reOrder();
        }

    })
}

function deleteStock() {
    deleteCart();
    api.removeStock().then(function (result) {
        let response = result.data;
        let status = response.status;
        if (status === 'success') {
            dom.reOrder();
        }

    })
}

function filteringBrand(brand) {
    api.filterBrand(brand).then(function (result) {
        
        displayMessage.innerHTML = 'Filtering using brand name: '+brand;
        let response = result.data;
        let data = response.filtered;
        
        let productTableHTML = stockTemplateInstance({
            stock: data
        });
        displayStock.innerHTML = productTableHTML;
    })
}

function filteringColour(colour) {
    api.filterColour(colour).then(function (result) {
        
        displayMessage.innerHTML = 'Filtering using colour: '+colour;
        let response = result.data;
        let data = response.filtered;
        
        let productTableHTML = stockTemplateInstance({
            stock: data
        });
        displayStock.innerHTML = productTableHTML;
    })
}

function filteringSize(size) {
    api.filterSize(size).then(result => {
        displayMessage.innerHTML = 'Filtering using size: '+size;
        let response = result.data;
        let data = response.filtered;
        let productTableHTML = stockTemplateInstance({
            stock: data
        });
        displayStock.innerHTML = productTableHTML;
            }
        );
}

function filteringStock(stock) {
    api.filterStock(stock).then(result => {
        displayMessage.innerHTML = 'Filtering using stock: '+stock;
        let response = result.data;
        let data = response.filtered;
        let productTableHTML = stockTemplateInstance({
            stock: data
        });
        displayStock.innerHTML = productTableHTML;
            }
        );
}

function clearFilter() {
    dom.reOrder();
    displayMessage.innerHTML = '';
}

function DomFactory() {
    function reOrder() {
        clearFields();
        reOrderStock();
        reOrderCart();
        reOrderDropDowns();

    }

    function reOrderStock() {
        api.displayAll().then(function (result) {
            let response = result.data;
            let data = response.result;


            let productTableHTML = stockTemplateInstance({
                stock: data
            });
            displayStock.innerHTML = productTableHTML;
        })
    }

    function reOrderCart() {
        api.cartData().then(function (result) {
            let response = result.data;
            let cartItems = response.cart;
            let total = response.total;
            let totalCompiled = cartCompiler({
                cart: cartItems
            })
            cartDisplay.innerHTML = totalCompiled;
            totalDisplay.innerHTML = total;
        });
    }

    function reOrderDropDowns() {
        api.dropdowns().then(function (result) {
            let response = result.data;
            
            
            let brandData = response.brands;
            let colourData = response.colours;
            let sizeData = response.size;
            let stockData = response.stock;
            let brandHTML = brandTemplateInstance({
                allBrands: brandData
            });
            let colourHTML = colourTemplateInstance({
                allColours: colourData
            });
            let filterBrand = filterBrandCompiler({
                allBrands: brandData
            })
            let filterColour = filterColourCompiler({
                allColours: colourData
            })
            let filterSize = filterSizeCompiler({
                allSize : sizeData
            })
            let filterStock = filterStockCompiler({
                allStock : stockData
            })
            brandSection.innerHTML = brandHTML;
            colourSection.innerHTML = colourHTML;
            filterBrandSection.innerHTML = filterBrand;
            filterColourSection.innerHTML = filterColour;
            filterSizeSection.innerHTML = filterSize;
            filterStockSection.innerHTML = filterStock;
            
        });
    }

    function clearFields() {
        sizeSection.value = '';
        stockSection.value = '';
        priceSection.value = '';

    }


    return {
        reOrder
    }
}



/* **********************************************************************************************************************
# Creating the function in the factory function 
*/
function APIServices() {

    function displayAll() {
        return axios.get('./api/stock');
    }

    function dropdowns() {
        return axios.get('./api/default');
    }

    function cartData() {
        return axios.get('./api/cart');
    }


    function addingCart(id) {
        return axios.get('./api/stock/' + id)
    }

    function addNewStock(name, colourtag, size, stock, price) {
        return axios.post('./api/add', {
            name,
            colourtag,
            size,
            stock,
            price
        })
    }

    function removeCart() {
        return axios.get('./api/clearCart');
    }

    function removeStock() {
        return axios.get('./api/clearStock');
    }

    function filterBrand(brand) {
        return axios.get('./api/filter/brand/' + brand);
    }
    function filterColour(colour) {
        return axios.get('./api/filter/colour/' + colour);
    }
    function filterSize(size){
        return axios.get('./api/filter/size/'+size);
    }
    function filterStock(stock){
        return axios.get('./api/filter/stock/'+stock);
    }
    return {
        displayAll,
        dropdowns,
        cartData,
        addingCart,
        addNewStock,
        removeCart,
        removeStock,
        filterBrand,
        filterColour,
        filterSize,
        filterStock
    }
}