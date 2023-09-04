const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function convertHandler.getNum(input)', ()=>{
    test('Whole number input', (done)=>{
        let input = '32L'
        assert.equal(convertHandler.getNum(input), 32);
        done();
      });
  
    test('Decimal number input', (done)=>{
        let input = '32.2L'
        assert.equal(convertHandler.getNum(input), 32.2);
        done();
      });
  
    test('Fractional number input', (done)=>{
        let input = '1/32L'
        assert.equal(convertHandler.getNum(input), 1/32);
        done();
      });
  
    test('Fractional and decimal numbers input', (done)=>{
        let input = '1.1/32L'
        assert.equal(convertHandler.getNum(input), 1.1/32);
        done();
      });
    
    test('Double-Fraction number input', (done)=>{
        let input = '1/1/32L'
        assert.equal(convertHandler.getNum(input), undefined);
        done();
      });
    
    test('No numerical input', (done)=>{
        let input = 'L'
        assert.equal(convertHandler.getNum(input), 1);
        done();
      });
    })

  suite('Function convertHandler.getUnit(input)', ()=>{
    test('For each valid unit inputs', (done)=>{
    let inputs = ["gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",];
      
      let expect = ["gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",]

      inputs.forEach((input, i)=>{
        assert.equal(convertHandler.getUnit(input), expect[i])
      });
      done();
    });

     test('Invalid unit input', (done)=>{
        assert.equal(convertHandler.getUnit('2kilograms'), undefined)
        done();
      })
  })

  suite('Function convertHandler.getReturnUnit(input)',()=>{
    test('Return unit for each valid input', (done)=>{
      let inputs = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];

      inputs.forEach((input, i)=>{
        assert.equal(convertHandler.getReturnUnit(input), expect[i])
      });
      done()
    });
    
/*     test('Undefined unit for invalid input', (done)=>{
        assert.equal(convertHandler.getReturnUnit('Galons'), undefined)
      done()
    }); */
  });

  suite('Function convertHandler.spellOutUnit(input)',()=>{
    test('Spellout unit for each valid input', (done)=>{
       let inputs = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];

      inputs.forEach((input, i)=>{
        assert.equal(convertHandler.spellOutUnit(input), expect[i])
      });
      done()
    });

/*     test('Undefined spellout unit for invalid input', (done)=>{
        assert.equal(convertHandler.spellOutUnit('Galons'), undefined)
      done()
    }); */
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function (done) {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function (done) {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});
