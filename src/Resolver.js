const { ServiceExecutor, FactoryExecutor } = require('./Executor')

function BaseResolver () {

}

BaseResolver.prototype.is = function is (ctrFn) {
  return false
}

BaseResolver.prototype.createExecutor = function createExecutor () {
  throw Error('registrator instance missing #getResolver implementation')
}

// Extends BaseResolver
function ServiceResolver () {

}

ServiceResolver.prototype = new BaseResolver()
ServiceResolver.prototype.constructor = ServiceResolver
ServiceResolver.prototype.is = ServiceExecutor.is

ServiceResolver.prototype.createExecutor = function createExecutor (fn) {
  if (!this.is(fn)) {
    throw Error('Instance of ServiceResolver expect a function as parameter for #createExecutor method.')
  }

  return new ServiceExecutor(fn)
}

// Extends BaseResolver
function FactoryResolver () {

}

FactoryResolver.prototype = new BaseResolver()
FactoryResolver.prototype.constructor = FactoryResolver
FactoryResolver.prototype.is = FactoryExecutor.is

FactoryResolver.prototype.createExecutor = function createExecutor (factoryObj) {
  if (!this.is(factoryObj)) {
    throw Error('Instance of FactoryResolver expect a function as parameter for #createExecutor method.')
  }

  return new FactoryExecutor(factoryObj)
}

module.exports = {
  ServiceResolver,
  FactoryResolver
}
