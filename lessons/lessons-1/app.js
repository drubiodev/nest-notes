// Variables
var myVar = "This is a variable";
let myLet = "This is a let variable";
const myConst = "This is a constant";

// Document selectors
var myElementById = document.getElementById("fname");
var myElementsByClassName = document.getElementsByClassName("myClass");
var myQuerySelector = document.querySelector("#fname");
var myQuerySelectorAll = document.querySelectorAll(".myClass");

// Event listeners
myElementById.addEventListener("click", function () {
  console.log("Element clicked!");
});

// Functions
function myFunction() {
  console.log("This is a function");
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Conditionals
if (myVar === "This is a variable") {
  console.log("Condition met");
}

// Objects
var myObject = {
  name: "John",
  age: 30,
};

// Arrays
var myArray = [1, 2, 3, 4, 5];

// Classes
class MyClass {
  constructor(name) {
    this.name = name;
  }
}

// DOM manipulation
myElementById.innerHTML = "New content";
