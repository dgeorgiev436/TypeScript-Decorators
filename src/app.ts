// *********************************** CLASS DECORATOR ***********************************

// Decorator
function Logger(logString: string) {
	return function(constructor: Function){
		console.log("This is " + this.logString);
		console.log(constructor);	
	}
}

// Applying Decorator with @ to class
// Decorator gets executed when class is defined
@Logger("Logging - Person")
class Person {
	name = "Max";
	
	constructor(){
		console.log("Creating person object")
	}
}


const person1 = new Person();

console.log(person1);