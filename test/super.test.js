const request = require('supertest');
const assert = require("assert");
const appWebRoutes = require('../app-web-routes');
const express = require('express');
const db = require('../db-config');

let app = null;
let pool = null;

describe('GET /api/stock', function() {
    before(function() {
        app = express();
        pool = db();
        appWebRoutes(app, pool);

    });

    after(function(){
        // ??? app.stop();
        pool.close()
    })

    it('Count the number of shoes', function(done) {
      request(app)
        .get('/api/stock')
        .set('Accept', 'application/json')
        .expect(200)
        .then((response, err) => {
            let data = response.body.result;
            assert.strictEqual(data.length, 5);
            done(err)
        })
        .catch(err => {
            done(err)
        })
    })

    it('calculate number of colours in database', function (done) {
        request(app)
            .get('/api/default')
            .set('Accept', 'application/json')
            .expect(200)
            .then(
                (response, err) =>
                    {
                        let data = response.body;
                        let colourData = data.colours;
                        assert.strictEqual(colourData.length, 7);
                        done(err)
                    }
            )
            .catch(err =>{
                done(err)
            })
    })

    it('calculate number of brands in database', function (done) {
        request(app)
            .get('/api/default')
            .set('Accept', 'application/json')
            .expect(200)
            .then(
                (response, err) =>
                    {
                        let data = response.body;
                        let brandData = data.brands;
                        assert.strictEqual(brandData.length, 6);
                        done(err)
                    }
            )
            .catch(err =>{
                done(err)
            })
    })

    it('Get current sizes in database', function (done) {
        request(app)
            .get('/api/default')
            .set('Accept', 'application/json')
            .expect(200)
            .then(
                (response, err) =>
                    {
                        let data = response.body;
                        let sizeData = data.size;
                        assert.strictEqual(sizeData.length, 4);
                        done(err)
                    }
            )
            .catch(err =>{
                done(err)
            })
    })

    it('Get current stock in database', function (done) {
        request(app)
            .get('/api/default')
            .set('Accept', 'application/json')
            .expect(200)
            .then(
                (response, err) =>
                    {
                        let data = response.body;
                        let stockData = data.stock;
                        assert.strictEqual(stockData.length, 5);
                        done(err)
                    }
            )
            .catch(err =>{
                done(err)
            })
    })
    after(function(){
        app.stop();
      });
    
  });

describe('Testing the cart', function () {
    it('number items in the cart', done => {
        request(app)
            .get('/api/cart')
            .set('Accept', 'application/json')
            .expect(200)
            .then(
                (response, err) => {
                    let data = response.body;
                    let cartData = data.cart;
                    assert.strictEqual(cartData.length, 1)
                    done(err)
                }
            )
            .catch(err =>{
                done(err)
            })
    })
})