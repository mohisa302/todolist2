const display = (todoListss) => {
  const list = document.querySelector('.list-container');
  list.innerHTML = '';
  if (todoListss.length > 0) {
    todoListss.forEach((task) => {
      const { description, index } = task;
      list.innerHTML += `
    <li class="task-container">
    <div class="task">
    <div class="task-text">
    <input type="checkbox" id="${index}" class="check-box" name="task"/><del class="input-text" contenteditable="false">${description}</del>
    </div>
    <div class="edit-icon "></div>
    <i class="trash trash-btn fa fa-trash" aria-hidden="true"></i>
    </div>
    <hr class="list-line" />
    </li>
    `;
      const tasks = document.querySelectorAll('.task-container');
      const inputTexts = document.querySelectorAll('.input-text');
      const editBtns = document.querySelectorAll('.edit-icon');
      let trashBtns = document.querySelectorAll('.trash-btn');
      const checkBoxes = document.querySelectorAll('input[type=checkbox]');

      editBtns.forEach((editBtn, index) => {
        editBtn.addEventListener('click', () => {
          editBtn.classList.add('hide');
          tasks[index].classList.add('edit-mode');
          trashBtns[index].classList.remove('trash');
          inputTexts[index].contentEditable = 'true';
          inputTexts[index].setAttribute('contenteditable', 'true');
          localStorage.setItem('tasks', JSON.stringify(todoListss));
        });
      });

      inputTexts.forEach((inputText, index) => {
        inputText.addEventListener(
          'input',
          () => {
            todoListss[index].description = inputText.textContent;
            localStorage.setItem('tasks', JSON.stringify(todoListss));
          },
          false
        );
      });

      checkBoxes.forEach((checkBox, index) => {
        if (todoListss[index].completed === true) {
          checkBox.checked = true;
          inputTexts[index].previousElementSibling.disabled = true;
        }

        checkBox.addEventListener('change', () => {
          todoListss[index].completed = true;
          inputTexts[index].disabled = true;
          inputTexts[index].previousElementSibling.disabled = true;
          localStorage.setItem('tasks', JSON.stringify(todoListss));
        });
      });

      trashBtns.forEach((trashBtn, index) => {
        trashBtn.addEventListener('click', () => {
          const indexRem = todoListss.findIndex(
            (task) => task.description === inputTexts[index].textContent
          );
          todoListss.splice(indexRem, 1);
          todoListss.forEach((taskDay, indexDay) => {
            taskDay.index = indexDay + 1;
          });
          localStorage.setItem('tasks', JSON.stringify(todoListss));
          trashBtn.parentNode.parentNode.remove();
        });
        trashBtns = document.querySelectorAll('.trash-btn');
      });
    });
  }
};
export default display;
