function ConvertHandler() {

  this.validUnits = ['gal', 'l', 'km', 'mi', 'lbs', 'kg']
  this.getNum = function(input) {
    if (/\//g.test(input)) {
      let arrayForwardSlash = input.match(/\//g);
      if (arrayForwardSlash.length > 1) {
        throw new Error('invalid number')
      }
    }

    let result = input.match(/([^a-zA-Z]*)([a-zA-Z]+)/);
    if (eval(result[1]) === undefined) {
      result[1] = 1;
    }
    return eval(result[1]);
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/g);
    if (!this.validUnits.includes(result[0].toLowerCase())) {
      throw new Error('invalid unit')
    }
    if (result[0].toLowerCase() === 'l') {
      return result[0].toUpperCase();
    }
    return result[0].toLowerCase();
  };

  this.getReturnUnit = function(initUnit) {
    const getReturnUnitObject = {
      gal: 'L',
      l: 'gal',
      km: 'mi',
      mi: 'km',
      lbs: 'kg',
      kg: 'lbs'
    }

    return getReturnUnitObject[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const spellOutObject = {
      gal: 'gallons',
      l: 'litters',
      km: 'kilometers',
      mi: 'miles',
      lbs: 'pounds',
      kg: 'kilograms'
    }
    return spellOutObject[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;

      default:
        throw new Error('unexpected conversion');
    }

    return result.toFixed(5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    let result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);

    return result;
  };

}

module.exports = ConvertHandler;
