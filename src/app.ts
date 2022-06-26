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
	return function<T extends {new(..._: any[]): {name: string} }>(originalConstructor: T){
// 		Return constructor function based on the original
		return class extends originalConstructor {
			constructor(..._: any[]){
// 				Still execute old logic
				super();
// 				But also add aditional new logic
				console.log("Rendering Template")
				const hookElement = document.getElementById(hookId);
				if(hookElement){
					hookElement.innerHTML = template;
					hookElement.querySelector("h1")!.textContent = this.name;

				}
			}
		}
	}
}

// Applying Decorator with @ to class
// Decorator gets executed when class is defined
@Logger("Logging - Person")
@WithTemplate("<h1>My Person Object </h1>", "app")
class Person {
	name = "Max";
	
	constructor(){
		console.log("Creating person object")
	}
}


// const person1 = new Person();

// console.log(person1);

// *********************
// Property decorators that are run on properties of a class
function Log(target: any, propertyName: string | Symbol){
	console.log("Property decorator");
	console.log(target, propertyName);
	
}

// Accessor decorators on getters and setters of a class
function Log2(target: any, name: string, descriptor: PropertyDescriptor){
	console.log("Accessor Decorator");
	console.log(target, name, descriptor);
}

// Method decorators on a methods of a class
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
	console.log("Method Decorator");
	console.log(target, name, descriptor);
}

// Parameter decorators on a methods of a class
function Log4(target: any, name: string | Symbol, position: number){
	console.log("Parameter Decorator");
	console.log(target, name, position);
}

class Product {
	@Log
	title: string;
	private _price: number;
	
// 	Set some conditions in the setter
	@Log2
	set price(val: number){
		if(val > 0){
			this._price = val
		}else{
			throw new Error("Invalid price - should be positive number")
		}
	}
	
	
	constructor(t: string, p: number){
		this.title = t;	
		this._price = p;
	}
	
	@Log3
	getPriceWithTax(@Log4 tax: number){
		return this._price * (1 + tax)
	}
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor){
// 	Get access to the original method
	const originalMethod = descriptor.value
// 	Overrite the property descriptor with the adjusted property descriptor
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
// 		Add Extra logic when accessing the property
		get(){
			const boundFn = originalMethod.bind(this);
			return boundFn;
		}
	} 
	return adjDescriptor
}

class Printer {
	message = "This Works";
	
	@AutoBind
	showMessage(){
		console.log(this.message)
	}
}

const printer1 = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", printer1.showMessage);


class Course {
	title: string;
	price: number;
	
	constructor(t: string, p: number){
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
	event.preventDefault();
	const titleEl = document.getElementById("title") as HTMLInputElement;
	const priceEl = document.getElementById("price") as HTMLInputElement;
	
	const title = titleEl.value;
	const price = +priceEl.value;
	
	
	const createdCourse = new Course(title, price);
	console.log(createdCourse);
})