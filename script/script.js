function initFunction() {
 if (store.getAll().todo === undefined) {
  store.set("todo", {
   length: 0
  });

 } else {
  console.log(store.getAll().todo);
 }
 $("#addTodoItem").on("click", function () {
  addTextToList();
  $("#todoItem").val("");
 });

 printValues();
}

function addTextToList() {
 console.log(store.getAll().todo)
 var value = $("#todoItem").val();
 if (value === "") {
  alert("Enter a text")
 } else {
  var obj = {
   name: value,
   finished: false
  }
  var length = store.getAll().todo.length + 1;
  store.transact("todo", function (values) {
   values["" + length] = obj;
  });
  store.transact("todo", function (values) {
   values.length = length;
  });
  insertFinishedValue(value, false, length);
 }
}

function printValues() {
 var values = (store.getAll().todo);
 var length = values.length;
 console.log(values)
 for (loop = 0; loop < length; loop++) {
  insertFinishedValue(values[loop + 1].name, values[loop + 1].finished, loop + 1);
 }
 $("body").on("click", "input.taskCheckBox", function (event) {
  changeValues(event);
 });
 $("body").on("keydown", "textarea.taskData", function (event) {
  checkForChangeInHeight(event);
 });
}

function insertFinishedValue(value, finished, idValue) {
 console.log(idValue)
 var parentDiv = $("<div>").attr({
  "class": "tasks col-md-12",
  id: idValue,
 });
 $("#displayItems").append(parentDiv);
 var checkBox = $("<input>").attr({
  type: "checkBox",
  class: "taskCheckBox"
 }).css({
  "margin-top": "17px",
  "margin-left": "-12px"
 });

 var div = $("<textarea>").attr({
  class: "taskData col-md-6 form-control",
  "contenteditable": true
 });
 if (finished === true) {
  $(checkBox).attr("checked", "checked");
  $(div).addClass("taskFinished");
 }
 $(div).text(value);
 $(parentDiv).append(checkBox);
 $(parentDiv).append(div);
}

function changeValues(event) {
 var id = ($(event)[0].target.offsetParent.id);
 var currentValue = store.getAll().todo[id].finished;
 console.log(currentValue)
 store.transact("todo", function (values) {
  values[id].finished = !currentValue;
 });
 if (!currentValue === true) {
  $("#" + id + " textarea").addClass("taskFinished").removeClass("taskunFinished");
 } else {
  {
   $("#" + id + " textarea").addClass("taskunFinished").removeClass("taskFinished");
  }
 }
}

function checkForChangeInHeight(event) {
 var parentId = ($(event)[0].target.offsetParent.id);
 var currentHeight=$("#" + parentId + " textarea").css("height");
 currentHeight=parseFloat(currentHeight);

 $("#" + parentId + " textarea").css("height", "10px")
 var height = (document.getElementById(parentId).lastChild.scrollHeight)
if(currentHeight<height){
 $("#" + parentId + " textarea").css({
  "height": height+4
})}
else {
$("#" + parentId + " textarea").css("height",currentHeight)

}


}
