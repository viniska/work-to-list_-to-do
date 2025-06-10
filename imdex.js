document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const todoList = document.getElementById('todo-list');

    // Initialize tasks from local storage or set as empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks in the UI
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <span>${task.name}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <input type="checkbox" class="complete-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
            `;
            todoList.appendChild(taskElement);
        });
    }

    // Initial render
    renderTasks();

    // Event listener for form submission
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    });

    // Event listener for deleting a task
    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });

    // Event listener for marking a task as completed
    todoList.addEventListener('change', function(event) {
        if (event.target.classList.contains('complete-checkbox')) {
            const index = event.target.dataset.index;
            tasks[index].completed = event.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });
});