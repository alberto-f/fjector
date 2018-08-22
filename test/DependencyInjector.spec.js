/* global describe, it */

const assert = require('assert')
const DependencyInjector = require('../src/')

const injector = new DependencyInjector()

function ServiceA () {

}

ServiceA.test = function () {
  return true
}

function Tester (ServiceA) {
  assert.equal(ServiceA.test(), true)
}

describe('DependencyInjector', function () {
  describe('#inject', function () {
    it('should inject dependencies to the named function based on the provided array', function () {
      injector.add('ServiceA', ServiceA)

      const TesterA = injector.inject(['ServiceA'], Tester)
      TesterA()
    })

    it('should inject dependencies into the function based on the provided array', function () {
      injector.add('ServiceA', ServiceA)

      const TestB = injector.inject(['ServiceA'], function (ServiceA) {
        assert.equal(ServiceA.test(), true)
      })
      TestB()
    })

    it('should inject dependencies based on the name of the function parameters', function () {
      injector.add('ServiceA', ServiceA)

      const TesterA = injector.inject(function (ServiceA) {
        assert.equal(ServiceA.test(), true)
      })
      TesterA()
    })
  })
})
