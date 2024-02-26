import './components/todo.js';
import './components/header.js';

export const delay = async (MS) => {
    return await new Promise((resolve) => setTimeout(resolve, MS));
};
