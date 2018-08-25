
const ParamDetector = require('./ParamDetector')
const ServiceLocator = require('./ServiceLocator')
const { FactoryResolver, ServiceResolver } = require('./Resolver')

function DependencyInjector () {
  this._serviceLocator = new ServiceLocator()
  this._resolvers = [
    new FactoryResolver(),
    new ServiceResolver()
  ]
}

/*
 *
 * Service Declaration.
 *
 *    injector.register('ServiceA', function ServiceA(){
 *       // CODE
 *    })
 *
 */

/*
 *
 * Factory Declaration.
 *
 *    injector.register('ServiceA', {
 *      build: function(){
 *        return new ServiceA()
 *      }
 *    })
 *
 */
DependencyInjector.prototype.register = function register (name, service) {
  const resolverFound = this._resolvers.find(resolver => {
    return resolver.is(service)
  })

  if (!resolverFound) {
    throw Error('#register function - Unexpected entity was received in the #register function.')
  }

  const executor = resolverFound.createExecutor(service)

  this._serviceLocator.register(name, executor)
}

DependencyInjector.prototype.inject = function inject () {
  let serviceNames = []
  let fn = null

  // No injection required
  if (arguments.length === 0) {
    return

  /*
   *
   * Array declaration:
   *
   *  injector.inject(['ServiceA', 'ServiceB', function(A, B){
   *      // CODE GOES HERE
   *  }])
   *
   */
  } else if (Array.isArray(arguments[0])) {
    serviceNames = arguments[0]
    fn = arguments[1]

  /*
   *
   *  Function declaration specify as parameters
   *
   *  injector.inject(function(ServiceA, ServiceB){
   *      // CODE GOES HERE
   *  })
   *
   */
  } else if (typeof arguments[0] === 'function') {
    fn = arguments[0]
    serviceNames = ParamDetector.extract(fn)
  }

  return () => {
    return fn.apply(null, this._serviceLocator.resolves(serviceNames))
  }
}

module.exports = DependencyInjector
