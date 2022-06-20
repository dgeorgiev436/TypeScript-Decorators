// *********************************** CLASS DECORATOR ***********************************

// Decorator
function Logger(logString: string) {
	return function(constructor: Function){
		console.log(logString);
		console.log(constructor);	
	}
}

// Decorators are developed to be used by other developers to provide extra utilities
function WithTemplate(template: string, hookId: string){
	return function(constructor: any){
		const hookElement = document.getElementById(hookId);
		const p = new constructor()
		if(hookElement){
			hookElement.innerHTML = template;
			hookElement.querySelector("h1")!.textContent = p.name;
			
		}
	}
}

// Applying Decorator with @ to class
// Decorator gets executed when class is defined
// @Logger("Logging - Person")
@WithTemplate("<h1>My Person Object </h1>", "app")
class Person {
	name = "Max";
	
	constructor(){
		console.log("Creating person object")
	}
}


const person1 = new Person();

console.log(person1);