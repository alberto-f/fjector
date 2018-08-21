# Fjector (WIP)

Fjector allows you to inject services as parameters into your functions. The injector is a service locator responsible for dependencies look-up.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Usage (WIP)

Create an injector and register services on it. 

```
// main.js
function ServiceA(){

}

ServiceA.say = function(){
	console.log('Hello World')
}

const injector = DependencyInjector.getInstance()
injector.add('ServiceA', ServiceA )

```

In some other file:

```
// greeting.js
const injector = DependencyInjector.getInstance()

// Make use of the injector
const Greet = injector.inject(function(ServiceA){
	ServiceA.say()
})

// Exec Greet function
Greet() // console => Hello World


```

## Running the tests

`npm test`


## Authors

* **Alberto Fernandez Reyes** - *Initial work* - [alberto-f](https://github.com/alberto-f)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Inspiration gotten by Angular Injector

* [Angular Injector](https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L130)
