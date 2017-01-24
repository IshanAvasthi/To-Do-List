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
 $("body").on("click", "input.inputCheckBox", function (event) {
  changeValues(event);
 });
}

function insertFinishedValue(value, finished, idValue) {
 console.log(idValue)
 var parentDiv = $("<div>").attr({
  "class": "Unfinished col-md-12",
  id: idValue,
 });
 $("#displayItems").append(parentDiv);
 var checkBox = $("<input>").attr({
  type: "checkBox",
  class: "inputCheckBox"
 }).css({
  float: "left"
 });

 var div = $("<div>").attr({
  class: "value col-md-6"
 });
 if (finished === true) {
  $(checkBox).attr("checked", "checked");
$(div).css({
  "text-decoration": "line-through",
    "font-style": "oblique"
})
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
 if(!currentValue===true)
 {
$("#"+id+" div").css({
  "text-decoration": "line-through",
    "font-style": "oblique"
});
 }
 else {
   {
     $("#"+id+" div").css({
       "text-decoration": "none",
         "font-style": "inherit"
     })
   }
 }
}
