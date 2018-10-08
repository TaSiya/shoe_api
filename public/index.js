const displayStock = document.querySelector('.insertStock'); //Display the stock
const brandSection = document.querySelector('.brandSection');
const colourSection = document.querySelector('.colourSection');
const cartDisplay = document.querySelector('.cartDisplay');
const totalDisplay = document.querySelector('.totalDisplay');
const stockTemplate = document.querySelector('.stockTemplate').innerHTML; // Template for stock display
const dropdowsBrandsTemplate = document.querySelector('.dropdowsBrandsTemplate').innerHTML;
const dropdowsColoursTemplate = document.querySelector('.dropdowsColoursTemplate').innerHTML;
const cartTemplate = document.querySelector('.cartTemplate').innerHTML;


document.addEventListener("DOMContentLoaded", function () {
    const api = APIServices();

    let stockTemplateInstance = Handlebars.compile(stockTemplate);

    
    let brandTemplateInstance = Handlebars.compile(dropdowsBrandsTemplate);
    let colourTemplateInstance = Handlebars.compile(dropdowsColoursTemplate);

    api.displayAll().then(function (result) {
        let response = result.data;
        let data = response.result;
        let productTableHTML = stockTemplateInstance({
            stock : data
        });
        displayStock.innerHTML = productTableHTML;
    })

    
    api.dropdowns().then(function (result) {
        let response = result.data;
        let brandData = response.brands;
        let colourData = response.colours;
        let brandHTML = brandTemplateInstance({
            allBrands : brandData
        });
        let colourHTML = colourTemplateInstance({
            allColours : colourData
        });
        brandSection.innerHTML = brandHTML;
        colourSection.innerHTML = colourHTML;
    });

    let cartCompiler = Handlebars.compile(cartTemplate);

    api.cartData().then(function (result) {
        let response = result.data;
        let cartItems = response.cart;
        let total = response.total;
        let totalCompiled = cartCompiler({
            cart : cartItems
        })
        cartDisplay.innerHTML = totalCompiled;
        totalDisplay.innerHTML = total;
    });

});


function APIServices () {

    function displayAll(){
        return axios.get('/api/stock');
    }
    function dropdowns () {
        return axios.get('/api/default');
    } 
    function cartData(){
        return axios.get('/api/cart');
    }
    function allAPI() {
        return axios.get('/api/shoes');
    }
    
    return {
        displayAll,
        dropdowns,
        cartData,
        allAPI
    }
}