export const Todolist = function (parent) {
  this.value = "";
  this.tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  this.parent = parent;
  this.addItem = function (value) {
    let lastId = localStorage.getItem("lastId")
      ? localStorage.getItem("lastId")
      : 0;
    let item = { id: +lastId + 1, value: value, checked: false };
    this.tasks = [...this.tasks, item];
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("lastId", +lastId + 1);
    this.parent.innerHTML = "";
    this.render();
  }
};
// Todolist.prototype.addItem = function (value) {
//   let lastId = localStorage.getItem("lastId")
//     ? localStorage.getItem("lastId")
//     : 0;
//   let item = { id: +lastId + 1, value: value, checked: false };
//   this.tasks = [...this.tasks, item];
//   localStorage.setItem("tasks", JSON.stringify(this.tasks));
//   localStorage.setItem("lastId", +lastId + 1);
//   this.parent.innerHTML = "";
//   this.render();
// };
Todolist.prototype.removeOne = function (id) {
  this.tasks = this.tasks.filter((elem) => elem.id !== id);
  localStorage.setItem("tasks", JSON.stringify(this.tasks));
  this.parent.innerHTML = "";
  this.render();
};
Todolist.prototype.render = function () {
  var container = document.createElement("div");
  var textzone = document.createElement("div");
  var task = document.createElement("input");
  task.classList = "form-control";
  var buttonAdd = document.createElement("button");
  buttonAdd.classList = "btn btn-primary";
  buttonAdd.innerText = "Add task";
  buttonAdd.onclick = () => this.addItem(task.value);
  textzone.append(task, buttonAdd);
  container.append(textzone);
  this.tasks.forEach((elem, i) => {
    var newLi = document.createElement("div");
    newLi.classList = "d-flex justify-content-between";
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList = "btn btn-danger";
    deleteButton.onclick = () => this.removeOne(elem.id);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = elem.checked;
    checkbox.onchange = (e) => {
      this.tasks[i] = { ...this.tasks[i], checked: e.target.checked };
      console.log(e.target.checked);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.parent.innerHTML = "";
      this.render();
    };
    console.log("hello");
    var text = document.createElement("p");
    text.style.textDecoration = checkbox.checked ? "line-through" : "";
    text.innerText = elem.value;
    var left = document.createElement("div");
    left.append(checkbox, text);
    left.classList = "d-flex";
    newLi.append(left, deleteButton);
    container.append(newLi);
  });
  this.parent.append(container);
};
