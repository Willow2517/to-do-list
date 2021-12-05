'use strict';


const addTaskBtn = document.getElementById('todo-input__button'),
    descTaskInput = document.getElementById('todo-input__text'),
    todosWrapper = document.querySelector('.todo-list'),
    todoClearButton = document.querySelector('.todo-buttons__clear');


let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];


function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-list-task ${task.completed ? 'checked' : ''}">
            <div class="todo-list-task__description">
                ${task.description}
                <input onclick="completeTask(${index})" class="todo-list-task-buttons__complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="todo-list-task-buttons__delete">x</button>
            </div>                
        </div>
    `
}

const fillHtmlList = () =>  {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        })
        todoItemElems = document.querySelectorAll('.todo-list-task');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descTaskInput.value));
    console.log(tasks );
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
    
})

function addTaskEnter() {
    if(event.key === 'Enter') {
        tasks.push(new Task(descTaskInput.value));
        updateLocal();
        fillHtmlList();
        descTaskInput.value = '';        
    }
}





const deleteTask = index => {
    todoItemElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}

function todoClear () {
    localStorage.clear();
    location.reload();
}





