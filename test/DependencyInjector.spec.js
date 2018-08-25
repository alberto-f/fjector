/* global describe, before, it */

const assert = require('assert')
const DependencyInjector = require('../src/')

const injector = new DependencyInjector()

function Factory (name) {
  this.name = name
}

function ServiceA () {

}

ServiceA.test = function () {
  return true
}

function ServiceB () {

}

ServiceB.test = function () {
  return true
}

describe('DependencyInjector', function () {
  describe('#register service', function () {
    it('should exist #register method', function () {
      assert.ok(injector.register, 'Missing #register method')
    })
  })

  describe('#inject service', function () {
    before(function () {
      injector.register('ServiceA', ServiceA)
      injector.register('ServiceB', ServiceB)
    })

    it('should exist #inject method', function () {
      assert.ok(injector.inject, 'Missing #inject method')
    })

    it('should inject service with same reference', function () {
      const TesterA = injector.inject(['ServiceA', 'ServiceA'], function (ServiceA, refServiceA) {
        assert.equal(ServiceA, refServiceA)
      })
      TesterA()
    })

    it('should inject dependencies to the named function based on the provided array', function () {
      const TesterA = injector.inject(['ServiceA'], function (ServiceA) {
        assert.equal(ServiceA.test(), true)
      })
      TesterA()
    })

    it('should inject multiple dependencies to the named function based on the provided array', function () {
      const TesterA = injector.inject(['ServiceA', 'ServiceB'], function (ServiceA, ServiceB) {
        assert.equal(ServiceA.test(), true)
        assert.equal(ServiceB.test(), true)
      })
      TesterA()
    })

    it('should inform about missing dependencies', function () {
      const expectedError = { name: 'ReferenceError', message: 'Service: ServiceC not found. Are you sure it is known by the dependencyInjector?' }
      const TesterA = injector.inject(['ServiceA', 'ServiceC'], function (ServiceA, ServiceC) {})

      try {
        TesterA()
      } catch (e) {
        assert.equal(e.name, expectedError.name)
        assert.equal(e.message, expectedError.message)
      }
    })

    it('should inject dependencies into the function based on the provided array', function () {
      const TestB = injector.inject(['ServiceA'], function (ServiceA) {
        assert.equal(ServiceA.test(), true)
      })
      TestB()
    })

    it('should inject dependencies based on the name of the function parameters', function () {
      const TesterA = injector.inject(function (ServiceA) {
        assert.equal(ServiceA.test(), true)
      })
      TesterA()
    })
  })

  describe('#inject factory', function () {
    before(function () {
      injector.register('Factory', {
        factory: function (name) {
          return new Factory(name)
        }
      })
    })

    it('should inject same Factories', function () {
      const TesterFactory = injector.inject(['Factory', 'Factory'], function (Factory, refFactory) {
        assert.equal(Factory, refFactory)
        assert.equal(Factory('hello').name, 'hello')
      })
      TesterFactory()
    })
  })
})
