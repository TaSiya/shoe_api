const displayStock = document.querySelector('.insertStock'); //Display the stock
const stockTemplate = document.querySelector('.stockTemplate').innerHTML; // Template for stock display

document.addEventListener("DOMContentLoaded", function () {
    const api = APIServices();
    let stockTemplateInstance = Handlebars.compile(stockTemplate);
    api.displayAll().then(function (result) {
        let response = result.data;
        let data = response.result;
        console.log(data);
        console.log('here');
        
        let productTableHTML = stockTemplateInstance({
            stock : data
        });
        displayStock.innerHTML = productTableHTML;
    })

});


function APIServices () {

    function displayAll(){
        return axios.get('/api/stock');
    }

    return {
        displayAll
    }
}