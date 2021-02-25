const inputToDo = document.querySelector("#typeItem");
const addTodoButton = document.querySelector("#addItem");
const listItem = document.querySelector("#listItem");
const itemModel = document.querySelector(".model .toDoItem");
let allItems = "";
let activeItems = "";
let completedItems = "";

addTodoButton.addEventListener("click",addItem);

function addItem(){
    if(inputToDo.value != ""){
        toDoItem = itemModel.cloneNode(true);
        toDoItem.querySelector("p").innerHTML = inputToDo.value;
        toDoItem.querySelector("button").addEventListener("click", deleteItem);
        toDoItem.querySelector(".checkbox").addEventListener("click", checkItem);
        listItem.appendChild(toDoItem);
        inputToDo.value = null;

        allItems = listItem.innerHTML;
        activeItems += toDoItem.innerHTML;
    }
}

function deleteItem(){
    if(this.parentNode.querySelector(".checkbox").checked){
        completedItems = completedItems.replace(this.parentNode.innerHTML, "");
    }
    listItem.removeChild(this.parentNode);
}
function checkItem(event){
    if(event.target.checked){
        this.parentNode.querySelector("p").style.textDecoration = "line-through";
        this.parentNode.querySelector("p").style.color = "#989898";
        completedItems += this.closest(".toDoItem").innerHTML;
    }else{
        completedItems = completedItems.replace(this.closest(".toDoItem").innerHTML, "");
        this.parentNode.querySelector("p").style.textDecoration = "none";
        this.parentNode.querySelector("p").style.color = "#ffffff";
        
    }
    allItems = listItem.innerHTML;
}