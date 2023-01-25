import display from './ui.js';

export const todoListss = JSON.parse(localStorage.getItem('todos')) || [];
const refreshIcon = document.querySelector('.refresh');
const addBtn = document.querySelector('.add-btn');
const newTask = document.querySelector('.list-input');

const addTask = (task) => {
  if (!todoListss) {
    todoListss = [
      {
        description: task,
        completed: false,
        index: 1,
      },
    ];
  } else {
    todoListss.push({
      description: task,
      completed: false,
      index: todoListss.length + 1,
    });
  }
  localStorage.setItem('tasks', JSON.stringify(todoListss));
  display();
};

addBtn.addEventListener('click', () => {
  if (newTask.value) addTask(newTask.value);
  newTask.value = '';
  display(todoListss);
});

refreshIcon.addEventListener('click', () => {
  display(todoListss);
});

window.addEventListener('load', () => {
  if (localStorage.getItem('tasks')) {
    display();
  }
});
