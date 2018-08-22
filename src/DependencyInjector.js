
const ParamDetector = require('./ParamDetector')

function DependencyInjector () {
  this._refs = []
}

DependencyInjector.prototype.add = function add (name, ConstructorFn) {
  this._refs[name] = { name: name, fn: ConstructorFn }
}

DependencyInjector.prototype.resolves = function resolves (serviceNames) {
  return serviceNames.map(name => this.resolve(name))
}

DependencyInjector.prototype.resolve = function resolve (name) {
  return this._refs[name].fn || null
}

DependencyInjector.prototype.inject = function inject () {
  let serviceNames = null
  let fn = null

  // No injection required
  if (arguments.length === 0) {
    return
  } else if (Array.isArray(arguments[0])) {
    serviceNames = arguments[0]
    fn = arguments[1]

  // Function with names as dependencies
  } else if (typeof arguments[0] === 'function') {
    fn = arguments[0]
    serviceNames = ParamDetector.extract(fn)
  }

  return () => {
    return fn.apply(null, this.resolves(serviceNames))
  }
}

module.exports = DependencyInjector
