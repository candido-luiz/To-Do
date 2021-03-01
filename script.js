const inputToDo = document.querySelector("#typeItem");
const addTodoButton = document.querySelector("#addItem");
const listItem = document.querySelector("#listItem");
const itemModel = document.querySelector(".model .toDoItem");

let allItems = "";
let activeItems = "";
let completedItems = "";

addTodoButton.addEventListener("click",addItem);

function loadInfo(){
    if (localStorage.getItem("allItems") != null){
        allItems = localStorage.getItem("allItems");
        listItem.innerHTML = allItems;
    }
    if (localStorage.getItem("activeItems") != null){
        activeItems = localStorage.getItem("activeItems");
    }
    if (localStorage.getItem("completedItems") != null){
        completedItems = localStorage.getItem("completedItems");
    }
}

function addItem(){
    if(inputToDo.value != ""){
        toDoItem = itemModel.cloneNode(true);
        toDoItem.querySelector("p").innerHTML = inputToDo.value;
        listItem.appendChild(toDoItem);
        inputToDo.value = null;

        allItems = listItem.innerHTML;
        activeItems += toDoItem.outerHTML;

        localStorage.setItem("allItems", allItems);
        localStorage.setItem("activeItems", activeItems);
    }
}

function deleteItem(deleteButton){
    if(deleteButton.parentNode.querySelector(".checkbox").checked){
        completedItems = completedItems.replace(deleteButton.closest(".toDoItem").outerHTML, "");
        localStorage.setItem("completedItems", completedItems);
    }else{
        activeItems = activeItems.replace(deleteButton.closest(".toDoItem").outerHTML, "");
        localStorage.setItem("activeItems", activeItems);
    }
    allItems = allItems.replace(deleteButton.closest(".toDoItem").outerHTML, "");
    localStorage.setItem("allItems", allItems);

    listItem.removeChild(deleteButton.parentNode);
}

function checkItem(checkbox){
    let originalItem = checkbox.closest(".toDoItem").outerHTML;

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

    allItems = allItems.replace(originalItem, checkbox.closest(".toDoItem").outerHTML);
    removeFromList(checkbox);

    localStorage.setItem("allItems", allItems);
    localStorage.setItem("activeItems", activeItems);
    localStorage.setItem("completedItems", completedItems);
}

function showAllItems(){
    this.event.preventDefault();
    listItem.innerHTML = allItems;
    listItem.dataset.type = "all";
}
function showActive(){
    this.event.preventDefault();
    listItem.innerHTML = activeItems;
    listItem.dataset.type = "active";
}
function showCompleted(){
    this.event.preventDefault();
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
