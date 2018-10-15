const api = APIServices();
const dom = DomFactory();

/* **********************************************************************************************************************
# Referencing the dom elements
*/

const displayStock = document.querySelector('.insertStock'); //Display the stock
const brandSection = document.querySelector('.brandSection');
const colourSection = document.querySelector('.colourSection');
const cartDisplay = document.querySelector('.cartDisplay');
const totalDisplay = document.querySelector('.totalDisplay');
const filterBrandSection = document.querySelector('.filterBrandSection');
const filterColourSection = document.querySelector('.filterColourSection');

const stockTemplate = document.querySelector('.stockTemplate').innerHTML; // Template for stock display
const dropdowsBrandsTemplate = document.querySelector('.dropdowsBrandsTemplate').innerHTML;
const dropdowsColoursTemplate = document.querySelector('.dropdowsColoursTemplate').innerHTML;
const cartTemplate = document.querySelector('.cartTemplate').innerHTML;
const filterBrandTemplate = document.querySelector('.filterBrandTemplate').innerHTML;
const filterColourTemplate = document.querySelector('.filterColourTemplate').innerHTML;

let stockTemplateInstance = Handlebars.compile(stockTemplate);
let brandTemplateInstance = Handlebars.compile(dropdowsBrandsTemplate);
let colourTemplateInstance = Handlebars.compile(dropdowsColoursTemplate);
let filterBrandCompiler = Handlebars.compile(filterBrandTemplate);
let filterColourCompiler = Handlebars.compile(filterColourTemplate);
let cartCompiler = Handlebars.compile(cartTemplate);

document.addEventListener("DOMContentLoaded", function () {
    dom.reOrder();

});

function adding(id, stock) {
    api.addingCart(id).then(function (result) {
        let response = result.data;
        if(stock == 1) {
            let itemSection = document.querySelector('.'+id).remove();
        } else {

        }
        dom.reOrder();
    });
}

function DomFactory() {
    function reOrder() {
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
            brandSection.innerHTML = brandHTML;
            colourSection.innerHTML = colourHTML;
            filterBrandSection.innerHTML = filterBrand;
            filterColourSection.innerHTML = filterColour;
        });
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

    return {
        displayAll,
        dropdowns,
        cartData,
        addingCart
    }
}