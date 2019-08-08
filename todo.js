const toDoForm = document.querySelector(".js-toDoFrom"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    //console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(toDos !== null) {
        const parseToDos = JSON.parse(loadToDos);

        parseToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}   

let toDos = [];

function saveToDos() {
    //console.log(toDos);
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    //console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;

    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerHTML = text;
    li.id = newId;

    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    }
    toDos.push(toDoObj);
    saveToDos();
 
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();