const assert = require('assert');
const ParamDetector = require('../src/ParamDetector')

describe('ParamDetector', function() {

  describe('#getRegex', function() {
    it('should return object instance of RegExp ', function() {
      assert.deepEqual(typeof ParamDetector.getRegex(), 'object')
      assert.deepEqual(ParamDetector.getRegex() instanceof RegExp, true)
    });
  })

  describe('#cleanString', function() {
    it('should trim string ', function() {
      const string = "    Service "
      assert.deepEqual(ParamDetector.cleanString(string), 'Service')
    });
  })

  describe('#extract', function() {

    it('should work', function() {
      assert.equal(true, true)
    });

    it('should return [] when no function has no params', function() {
      const anonimousFn = function(){}
      const fnParams = ParamDetector.extract(anonimousFn)
      
      assert.deepEqual(fnParams, [])
    });

    it('should extract an array with param names from anonimous function', function() {
      const anonimousFn = function(ServiceA, Service_B, _ServiceC, $service_D){}
      const fnParams = ParamDetector.extract(anonimousFn)
      
      assert.deepEqual(fnParams, ['ServiceA', 'Service_B', '_ServiceC', '$service_D'])
    });

    it('should extract an array with param names from named function', function() {
      const paramedFn = function NamedFunction(ServiceA, Service_B, _ServiceC, $service_D){}
      const fnParams = ParamDetector.extract(paramedFn)
      
      assert.deepEqual(fnParams, ['ServiceA', 'Service_B', '_ServiceC', '$service_D'])
    });

    it('should extract an array with param names from instance methods', function() {
      const obj = {
        hello: function(ServiceA, Service_B, _ServiceC, $service_D){} 
      }
      const fnParams = ParamDetector.extract(obj.hello)
      
      assert.deepEqual(fnParams, ['ServiceA', 'Service_B', '_ServiceC', '$service_D'])
    });
  });
});