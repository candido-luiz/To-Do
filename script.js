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
        listItem.appendChild(toDoItem);
        inputToDo.value = null;

        allItems = listItem.innerHTML;
        activeItems += toDoItem.outerHTML;
    }
}

function deleteItem(deleteButton){
    if(deleteButton.parentNode.querySelector(".checkbox").checked){
        completedItems = completedItems.replace(deleteButton.closest(".toDoItem").outerHTML, "");
    }else{
        activeItems = activeItems.replace(deleteButton.closest(".toDoItem").outerHTML, "");
    }
    allItems = allItems.replace(deleteButton.closest(".toDoItem").outerHTML, "");
    listItem.removeChild(deleteButton.parentNode);
}

function checkItem(checkbox){
    
    if(checkbox.checked){
        activeItems = activeItems.replace(checkbox.closest(".toDoItem").outerHTML, "");
        

        checkbox.parentNode.querySelector("p").style.textDecoration = "line-through";
        checkbox.parentNode.querySelector("p").style.color = "#989898";
        checkbox.setAttribute("checked", "true");
        completedItems += checkbox.closest(".toDoItem").outerHTML;
    }
    else{
        completedItems = completedItems.replace(checkbox.closest(".toDoItem").outerHTML, "");
        checkbox.parentNode.querySelector("p").style.textDecoration = "none";
        checkbox.parentNode.querySelector("p").style.color = "#ffffff";
        checkbox.removeAttribute("checked");
        activeItems += checkbox.closest(".toDoItem").outerHTML;
    }

    allItems = listItem.innerHTML;
    // removeFromList(checkbox);
}

function showAllItems(){
    listItem.innerHTML = allItems;
    listItem.dataset.type = "all";
}
function showActive(){
    listItem.innerHTML = activeItems;
    listItem.dataset.type = "active";
}
function showCompleted(){
    listItem.innerHTML = completedItems;
    listItem.dataset.type = "completed";
}

function removeFromList(item){
    if(listItem.dataset.type == "active"){
        listItem.removeChild(item.closest(".toDoItem"));
    }else if(listItem.dataset.type == "completed"){
        listItem.removeChild(item.closest(".toDoItem"));
    }
}
