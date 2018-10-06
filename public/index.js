const displayStock = document.querySelector('.insertStock'); //Display the stock
const brandSection = document.querySelector('.brandSection');
const colourSection = document.querySelector('.colourSection');
const cartDisplay = document.querySelector('.cartDisplay');
const stockTemplate = document.querySelector('.stockTemplate').innerHTML; // Template for stock display
const dropdowsBrandsTemplate = document.querySelector('.dropdowsBrandsTemplate').innerHTML;
const dropdowsColoursTemplate = document.querySelector('.dropdowsColoursTemplate').innerHTML;
const cartTemplate = dpcument.querySelector('.cartTemplate').innerHTML;


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
        console.log(result);
        // let response = result.data
    });

    // api.allAPI().then( function (result) {
    //     let response = result.data;
    //     let brandData = response.allBrands;
    //     let colourData = response.allColours;
    //     let stock = response.stock;
    //     let cart = response.cart;
    //     let brandHTML = stockTemplateInstance({allBrands : brandData});
    //     let colourHTML = stockTemplateInstance({allColours : colourData});
    //     let cartHTML = stockTemplateInstance({cart : colourData});
    //     let stockHTML = stockTemplateInstance({stock : colourData});
    //     brandSection.innerHTML = brandHTML;
    //     colourSection.innerHTML = colourHTML;
    // });

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