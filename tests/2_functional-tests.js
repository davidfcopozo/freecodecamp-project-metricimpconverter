const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert 10 liters (valid input)', (done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input: '30gal'})
    .end((err, res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.body.initNum, 30);
      assert.equal(res.body.initUnit, 'gal');
      assert.approximately(res.body.returnNum, 113.5623, 0.1);
      assert.equal(res.body.returnUnit, 'L');
      done();
    })
  })

  test('Convert 10m (invalid input)', (done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input: '30m'})
    .end((err, res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.body.initUnit, undefined);
      done();
    })
  });


  test('Convert 30/40/5mi (invalid number)', (done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input: '30/40.1/5mi'})
    .end((err, res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.body.initNum, undefined);
      done();
    })
  });

  test('Convert 30/40/5milliseconds (invalid number and unit)', (done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input: '30/40.1/5milliseconds'})
    .end((err, res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.body.initNum, undefined);
      assert.equal(res.body.initUnit, undefined);
      done();
    })
  });

  test('Convert mi (No number)', (done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input: 'mi'})
    .end((err, res)=>{
      assert.equal(res.status, 200);
      assert.equal(res.body.initNum, 1);
      assert.equal(res.body.initUnit, 'mi');
      assert.approximately(res.body.returnNum, 1.60934, 0.1);
      assert.equal(res.body.returnUnit, 'km');
      done();
    })
  })

});
