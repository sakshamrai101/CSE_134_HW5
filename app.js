const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');

function addTask(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    todoList.appendChild(li);

    const tasks = getStoredTasks();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function editTask(editButton) {
    const li = editButton.parentElement;
    const taskTextElement = li.querySelector('span');
    const currentTaskText = taskTextElement.textContent;
    const updatedTaskText = prompt('Edit task:', currentTaskText);

    if (updatedTaskText && updatedTaskText.trim() !== '') {
        taskTextElement.textContent = updatedTaskText.trim();

        const tasks = getStoredTasks();
        const updatedTasks = tasks.map(task => (task === currentTaskText ? updatedTaskText.trim() : task));
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
}

function deleteTask(deleteButton) {
    const li = deleteButton.parentElement;
    const taskText = li.querySelector('span').textContent;

    todoList.removeChild(li);

    const tasks = getStoredTasks();
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function getStoredTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function displayStoredTasks() {
    const tasks = getStoredTasks();
    tasks.forEach(task => addTask(task));
}

displayStoredTasks();
