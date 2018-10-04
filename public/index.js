const displayStock = document.querySelector('.insertStock'); //Display the stock
const brandSection = document.querySelector('.brandSection');
const colourSection = document.querySelector('.colourSection');
const stockTemplate = document.querySelector('.stockTemplate').innerHTML; // Template for stock display
const dropdowsBrandsTemplate = document.querySelector('.dropdowsBrandsTemplate').innerHTML;
const dropdowsColoursTemplate = document.querySelector('.dropdowsColoursTemplate').innerHTML;


document.addEventListener("DOMContentLoaded", function () {
    const api = APIServices();

    let stockTemplateInstance = Handlebars.compile(stockTemplate);
    api.displayAll().then(function (result) {
        let response = result.data;
        let data = response.result;
        let productTableHTML = stockTemplateInstance({
            stock : data
        });
        displayStock.innerHTML = productTableHTML;
    })

    let brandTemplateInstance = Handlebars.compile(dropdowsBrandsTemplate);
    let colourTemplateInstance = Handlebars.compile(dropdowsColoursTemplate);
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

});


function APIServices () {

    function displayAll(){
        return axios.get('/api/stock');
    }
    function dropdowns () {
        return axios.get('/api/default');
    } 
       
    return {
        displayAll,
        dropdowns
    }
}