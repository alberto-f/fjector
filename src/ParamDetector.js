/* global TypeError, ReferenceError */

const REGEX = /(.+)\((.*)\)/

function ParamDetector () {

}

ParamDetector.getRegex = function () {
  return REGEX
}

ParamDetector.cleanString = function (string) {
  return string.trim()
}

ParamDetector.findConstructor = function (fn) {
  return fn.prototype.constructor.toString()
}

ParamDetector.extract = function extract (fn) {
  if (typeof fn !== 'function') {
    throw TypeError('ParamDetector.extract: Expect function but got ' + (typeof fn))
  }

  const constructorAsString = ParamDetector.findConstructor(fn)

  const [full, functionName, functionParams] = ParamDetector.getRegex().exec(constructorAsString) // eslint-disable-line no-unused-vars

  let paramsAsArray = []

  if (typeof functionParams === 'string') {
    paramsAsArray = functionParams.split(',').map(ParamDetector.cleanString)
  } else {
    throw ReferenceError('Unexpected parameter')
  }

  return paramsAsArray.filter(param => param !== '')
}

module.exports = ParamDetector
