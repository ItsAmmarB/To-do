import { delay } from '../index.js';
import { refreshTasksCounter } from './header.js';

export let todos = [];

const getTodos = async () => {
    try {
        todos = await fetch('https://jsonplaceholder.typicode.com/todos/');
        if (!todos.ok) {
            throw 'An error occured';
        }
        todos = await todos.json();
        todos = todos.sort((a, b) => a.id + b.id).map((todo) => ({ id: todo.id, description: todo.title, completed: todo.completed }));
        renderTodoItems(todos);
    } catch (err) {
        console.error(err);
    }
};

const todoContainer = document.getElementById('todo__container');
export const renderTodoItems = async (todoItems) => {
    todoContainer.innerHTML = '';

    todoItems.forEach((item) => {
        todoContainer.appendChild(createTodoItem(item));
    });

    refreshTasksCounter();
};

const createTodoItem = ({ id, description, completed }) => {
    const item = document.createElement('section');
    item.innerHTML = `
        <section class="todo__item ${completed ? 'completed' : ''}" itemid="${id}">
            <h2>To-Do #${id}</h2>
            <p tabindex="${id}">${description}</p>
            <form>
                <label for="item__checkbox-${id}">Completed:</label>
                <input class="item__checkbox" type="checkbox" name="item__checkbox" id="item__checkbox-${id}" ${completed ? 'checked' : ''}/>
                <button class='item__btn edit-btn'>EDIT</button>
                <button class='item__btn delete-btn'>DELETE</button>
            </form>
         
        </section>
            `;

    return item;
};

getTodos();

document.addEventListener('change', (event) => {
    if (event.target.type !== 'checkbox') return;
    const checkbox = document.getElementById(event.target.id);
    todos.find((todo) => todo.id === Number(checkbox.closest('.todo__item').attributes.itemid.value)).completed = checkbox.checked;
    if (checkbox.checked) {
        checkbox.closest('.todo__item').className = `${checkbox.closest('.todo__item').className} completed`;
    } else {
        checkbox.closest('.todo__item').className = checkbox.closest('.todo__item').className.split('completed')[0];
    }
    refreshTasksCounter();
});

document.addEventListener('click', (event) => {
    if (event.target.className.includes('delete')) {
        todos = todos.filter((item) => item.id !== Number(event.target.closest('.todo__item').attributes.itemid.value));
        renderTodoItems(todos);
    } else if (event.target.className.includes('edit')) {
        const itemDescription = event.target.closest('.todo__item').children[1];
        if (itemDescription.contentEditable === 'true') {
            itemDescription.style.textAlign = 'left';
            itemDescription.style.backgroundColor = 'unset';
            itemDescription.style.border = 'unset';
            itemDescription.contentEditable = 'false';

            event.target.innerHTML = 'EDIT';

            todos.find((todo) => todo.id === Number(itemDescription.parentElement.attributes.itemid.value)).description = itemDescription.innerText;
            event.preventDefault();
        } else {
            itemDescription.style.textAlign = 'center';
            itemDescription.style.backgroundColor = ' #f5e8dd';
            itemDescription.style.border = '2px solid #000';
            itemDescription.contentEditable = 'true';

            event.target.innerHTML = 'SAVE';
            event.preventDefault();
        }
    }
});
