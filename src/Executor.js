function Executor () {

}

Executor.is = function is (executor) {
  return executor instanceof Executor
}

Executor.prototype.execute = function execute () {
  throw Error('Execute method not implemented')
}

/* Service Executor */
function ServiceExecutor (fn) {
  if (!ServiceExecutor.is(fn)) {
    throw Error('ServiceExecutor constructor received wrong input')
  }

  this.AbstractConstructor = fn
}

ServiceExecutor.prototype = new Executor()
ServiceExecutor.prototype.constructor = ServiceExecutor

ServiceExecutor.is = function is (fn) {
  return typeof fn === 'function'
}

ServiceExecutor.prototype.execute = function execute () {
  return this.AbstractConstructor
}

/* Factory Executor */
function FactoryExecutor (obj) {
  if (!FactoryExecutor.is(obj)) {
    throw Error('FactoryExecutor constructor received wrong input')
  }

  this.AbstractConstructor = obj['factory']
}

FactoryExecutor.prototype = new Executor()
FactoryExecutor.prototype.constructor = FactoryExecutor

FactoryExecutor.is = function is (factoryObj) {
  return typeof factoryObj === 'object' &&
          factoryObj instanceof Object &&
          factoryObj.hasOwnProperty('factory') &&
          typeof factoryObj['factory'] === 'function'
}

FactoryExecutor.prototype.execute = function execute () {
  return this.AbstractConstructor
}

/* Exports Executors */
module.exports = {
  Executor,
  ServiceExecutor,
  FactoryExecutor
}
