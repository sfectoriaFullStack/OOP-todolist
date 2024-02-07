import { Todolist } from "./todolist/index.js";

// import { Todolist } from "./todolist/pseudoclassical.js";


var myTodoList = new Todolist(document.getElementById("app"));
console.log(myTodoList);
myTodoList.render();

