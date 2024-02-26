import { todos, renderTodoItems } from './todo.js';

const timeElement = document.getElementById('time');
setInterval(() => {
    timeElement.innerText = new Date().toLocaleTimeString();
}, 500);

const searchElement = document.getElementById('seach-bar');
searchElement.addEventListener('input', (event) => {
    const filteredItems = todos.filter((todo) => todo.description.toLowerCase().includes(event.target.value.toLowerCase().trim()));
    renderTodoItems(filteredItems);
});

export const refreshTasksCounter = () => {
    document.getElementById('todos__count').innerHTML = `${todos.filter((todo) => todo.completed).length}/${todos.length} Tasks completed!`;
};

window.onscroll = function () {
    if (window.innerWidth < 1300) return;
    if (document.body.scrollTop > 0) {
        // Hide page title
        document.getElementById('name-logo__header').children[1].style.display = 'none';

        // Shrink Logo
        document.getElementById('name-logo__header').children[0].style.height = '2em';
        document.getElementById('name-logo__header').children[0].style.width = '2em';

        console.log(document.getElementsByTagName('header')[0]);
        document.getElementsByTagName('header')[0].style.padding = '0em 2em 0em 2em';
    } else {
        document.getElementById('name-logo__header').children[1].style.display = 'block';

        // Shrink Logo
        document.getElementById('name-logo__header').children[0].style.height = '3em';
        document.getElementById('name-logo__header').children[0].style.width = '3em';

        document.getElementsByTagName('header')[0].style.padding = '1em 2em 1em 2em';
    }
};
