const numStrSplitter = (input)=>{
   let number = input.match(/[.\d\/]+/g) || ["1"];
  let unit = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], unit]
}

const isValidDivision =(fraction)=>{
  let nums = fraction.split("/")

  if(nums.length > 2) {
    return false
  }
  return nums
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numStrSplitter(input)[0];
    let nums = isValidDivision(result);

    let num1 = nums[0],
      num2 = nums[1] || "1";

    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let unit = numStrSplitter(input)[1].toLowerCase();

    switch(unit) {
     case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch(unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      defualt:
        return undefined;
    }
  };

  this.spellOutUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch(unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      defualt:
        return undefined;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
