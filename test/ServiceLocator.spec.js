/* global describe, it, before, beforeEach */

const assert = require('assert')
const ServiceLocator = require('../src/ServiceLocator')
const { ServiceExecutor } = require('../src/Executor')

let locator = null

describe('ServiceLocator', function () {
  before(function () {
    locator = new ServiceLocator()
  })

  describe('#has', function () {
    beforeEach(function () {
      locator.clear()
    })

    it('should exist', function () {
      assert(locator.has, '#has method exist')
    })

    it('should return true when service is found', function () {
      const fn = function () { }
      const sExec = new ServiceExecutor(fn)
      locator.register('Service', sExec)
      assert(locator.has('Service'))
    })

    it('should return false when service is not found', function () {
      assert.equal(locator.has('Service'), false)
    })
  })

  describe('#clear', function () {
    it('should exist', function () {
      assert(locator.clear, '#clear method exist')
    })

    it('should clear the dependency list', function () {
      const fn = function () { }
      const sExec = new ServiceExecutor(fn)

      locator.register('Service', sExec)
      assert(locator.has('Service'))

      locator.clear()

      assert.equal(locator.has('Service'), false)
    })
  })

  describe('#resolves', function () {
    beforeEach(function () {
      locator.clear()
    })

    it('should exist', function () {
      assert(locator.resolves, '#resolve method does not exist')
    })

    it('should throw error when invoking with non-array', function () {
      try {
        locator.resolves('Service', function () {})
        assert.fail('Exception expected.')
      } catch (e) {
        assert(true, 'Exception thrown when resolves is invoked with non-array parameter')
      }
    })

    it('should find the list of dependencies', function () {
      const ServiceA = function () {}
      const ServiceB = function () {}

      const sExecA = new ServiceExecutor(ServiceA)
      const sExecB = new ServiceExecutor(ServiceB)

      locator.register('ServiceA', sExecA)
      locator.register('ServiceB', sExecB)

      const resolutionArray = locator.resolves(['ServiceB', 'ServiceA'])
      assert.deepStrictEqual(
        resolutionArray,
        [ServiceB, ServiceA],
        'Resolves array failed finding services'
      )
    })

    it('should fail when one of the dependencies does not exist', function () {
      const ServiceA = function () {}
      const sExecA = new ServiceExecutor(ServiceA)

      locator.register('ServiceA', sExecA)

      try {
        locator.resolves(['ServiceB', 'ServiceA'])
        assert.fail('It should have failed when resolving a non-register service.')
      } catch (e) {
        assert(true, 'Exception thrown when resolves is invoked but one service was not registered')
      }
    })
  })

  describe('#resolve', function () {
    beforeEach(function () {
      locator.clear()
    })

    it('should exist', function () {
      assert(locator.resolve, '#resolve method exist')
    })

    it('should find registered dependency', function () {
      const ServiceA = function () {}
      const sExecA = new ServiceExecutor(ServiceA)

      locator.register('ServiceA', sExecA)
      assert.equal(locator.resolve('ServiceA'), ServiceA, 'Service was found')
    })

    it('should throw error when looking for dependency that was not registered', function () {
      try {
        locator.resolve('Service')
        assert.fail('Exception expected.')
      } catch (e) {
        assert(true, 'Exception thrown when resolve does not find registered service')
      }
    })
  })

  describe('#register', function () {
    beforeEach(function () {
      locator.clear()
    })

    it('should exist', function () {
      assert(locator.register, '#register method exist')
    })

    it('should register service', function () {
      const ServiceA = function () {}
      const sExecA = new ServiceExecutor(ServiceA)

      locator.register('ServiceA', sExecA)
      assert(locator.has('ServiceA'))
    })

    it('should throw error when registering same service', function () {
      try {
        const ServiceA = function () {}
        const sExecA = new ServiceExecutor(ServiceA)

        locator.register('ServiceA', sExecA)
        assert.fail('Exception expected.')
      } catch (e) {
        assert(true, 'Exception thrown when service is already registered')
      }
    })
  })
})
