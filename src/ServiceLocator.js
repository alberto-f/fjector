const { Executor } = require('./Executor')

function ServiceLocator () {
  this._refs = {}
}

ServiceLocator.prototype.register = function (name, executor) {
  if (this.has(name)) {
    throw Error(`${name} was already registered.`)
  }

  this.setExecutor(name, executor)
}

ServiceLocator.prototype.resolves = function resolves (serviceNames) {
  if (!Array.isArray(serviceNames)) {
    throw Error('Invoking #resolves method expects an Array')
  }

  return serviceNames.map(name => this.resolve(name))
}

ServiceLocator.prototype.clear = function clear (name) {
  Object.keys(this._refs).forEach(refKey => delete this._refs[refKey])
}

/*
 * Private
 */
ServiceLocator.prototype.has = function has (name) {
  return this._refs.hasOwnProperty(name)
}

// Getter executor
ServiceLocator.prototype.getExecutor = function getExecutor (name) {
  return this._refs[name]
}

// Setter executor
ServiceLocator.prototype.setExecutor = function setExecutor (name, executor) {
  if (typeof name !== 'string') {
    throw Error('Unexpected type for executor name.')
  }

  if (!Executor.is(executor)) {
    throw Error(`${executor} does not comply to the Executor interface.`)
  }

  this._refs[name] = executor
}

ServiceLocator.prototype.resolve = function resolve (serviceName) {
  if (!this.has(serviceName)) {
    const err = new ReferenceError(`Service: ${serviceName} not found. Are you sure it is known by the dependencyInjector?`)
    throw err
  }

  let executor = this.getExecutor(serviceName)

  return executor.execute()
}

module.exports = ServiceLocator
