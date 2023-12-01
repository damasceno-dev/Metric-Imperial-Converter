const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
let testCases = ['4gal', '1/2km', '5.4/3lbs', '30kg']
suite('Unit Tests', function() {
  test('convertHandler should correctly read a whole number input.', () => {
    let testCases = ['4gal', '12km', '53lbs', '30kg']
    testCases.forEach(t => {
      let possibleNumber = convertHandler.getNum(t)
      assert.isNumber(possibleNumber);
      })
  })

  test('convertHandler should correctly read a decimal number input.', () => {
    assert.strictEqual(0.4, convertHandler.getNum('0.4gal'));
    assert.strictEqual(1.2, convertHandler.getNum('1.2km'));
    assert.strictEqual(53.4, convertHandler.getNum('53.4lbs'));
    assert.strictEqual(30.5, convertHandler.getNum('30.5kg'));
  })

  test('convertHandler should correctly read a fractional input.', () => {
    assert.strictEqual(1/4, convertHandler.getNum('1/4gal'));
    assert.strictEqual(1/2, convertHandler.getNum('1/2km'));
    assert.strictEqual(53/4, convertHandler.getNum('53/4lbs'));
    assert.strictEqual(30/5, convertHandler.getNum('30/5kg'));
  })

  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    assert.strictEqual(.1/.4, convertHandler.getNum('.1/.4gal'));
    assert.strictEqual(1/.2, convertHandler.getNum('1/.2km'));
    assert.strictEqual(53/.4, convertHandler.getNum('53/.4lbs'));
    assert.strictEqual(3.0/5, convertHandler.getNum('3.0/5kg'));
  })

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', ()=> {
    assert.throws(() => convertHandler.getNum('3/2/3gal'),Error, /invalid number/)
  })

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    assert.equal(1, convertHandler.getNum('gal'));
    assert.equal(1, convertHandler.getNum('km'));
    assert.equal(1, convertHandler.getNum('lbs'));
    assert.equal(1, convertHandler.getNum('kg'));
  })

  test('convertHandler should correctly read each valid input unit.', () => {
    assert.equal('gal', convertHandler.getUnit('Gal'));
    assert.equal('km', convertHandler.getUnit('Km'));
    assert.equal('lbs', convertHandler.getUnit('Lbs'));
    assert.equal('kg', convertHandler.getUnit('kG'));
    assert.equal('gal', convertHandler.getUnit('gaL'));
    assert.equal('km', convertHandler.getUnit('KM'));
    assert.equal('lbs', convertHandler.getUnit('LBS'));
    assert.equal('kg', convertHandler.getUnit('kg'));
  })

  test('convertHandler should correctly return an error for an invalid input unit.', () => {
    assert.throws(() => convertHandler.getUnit('gau'),Error, /invalid unit/);
    assert.throws(() => convertHandler.getUnit('kn'),Error, /invalid unit/);
    assert.throws(() => convertHandler.getUnit('ibs'),Error, /invalid unit/);
    assert.throws(() => convertHandler.getUnit('kj'),Error, /invalid unit/);
  })

  test('convertHandler should return the correct return unit for each valid input unit.', ()=> {
    assert.equal('gal', convertHandler.getReturnUnit('l'));
    assert.equal('km', convertHandler.getReturnUnit('Mi'));
    assert.equal('lbs', convertHandler.getReturnUnit('kG'));
    assert.equal('L', convertHandler.getReturnUnit('gaL'));
    assert.equal('mi', convertHandler.getReturnUnit('KM'));
    assert.equal('kg', convertHandler.getReturnUnit('LBS'));
  })

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
    assert.equal('pounds', convertHandler.spellOutUnit('Lbs'));
    assert.equal('kilograms', convertHandler.spellOutUnit('kG'));
    assert.equal('gallons', convertHandler.spellOutUnit('gaL'));
    assert.equal('kilometers', convertHandler.spellOutUnit('KM'));
    assert.equal('miles', convertHandler.spellOutUnit('Mi'));
    assert.equal('litters', convertHandler.spellOutUnit('l'));
  })

  test('convertHandler should correctly convert gal to L.', () => {
    assert.equal(15.14164, convertHandler.convert(4,'gal'))
  })
  test('convertHandler should correctly convert L to gal.', () => {
    assert.equal(4.22675, convertHandler.convert(16,'L'))
  })
  test('convertHandler should correctly convert mi to km.', () => {
    assert.equal(4.98895, convertHandler.convert(3.1,'mi'))
  })
  test('convertHandler should correctly convert km to mi.', () => {
    assert.equal(3.10686, convertHandler.convert(5,'km'))
  })
  test('convertHandler should correctly convert lbs to kg.', () => {
    assert.equal(0.81647, convertHandler.convert(5.4/3,'lbs'))
  })
  test('convertHandler should correctly convert kg to lbs.', () => {
    assert.equal(154.32371, convertHandler.convert(70,'kg'))
  })
});