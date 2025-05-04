// Seleciona o botão e a lista de tarefas
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.querySelector('.tarefas');

// Função para criar botões com ou sem texto
function createButton(iconClass, classes, onClick, text) {
  const button = document.createElement('button');
  button.classList.add(...classes);
  button.addEventListener('click', onClick);

  // Criando o ícone, se houver
  if (iconClass) {
    const icon = document.createElement('i');
    icon.classList.add('fa', iconClass); // Classe do ícone
    button.appendChild(icon); // Adicionando o ícone ao botão
  }

  // Adicionando texto, se houver
  if (text) {
    const buttonText = document.createElement('span');
    buttonText.textContent = text;
    button.appendChild(buttonText);
  }

  return button;
}

// Adiciona um evento de clique ao botão
addTaskButton.addEventListener('click', () => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

  const taskInput = document.createElement('input');
  taskInput.type = 'text';
  taskInput.placeholder = 'Digite a tarefa';
  taskInput.classList.add('form-control', 'me-2');
  listItem.appendChild(taskInput);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('d-flex', 'gap-2');

  const saveButton = createButton('fa-save', ['btn', 'btn-success', 'btn-sm'], () => {
    if (taskInput.value.trim() !== '') {
      const taskText = document.createElement('span');
      taskText.textContent = taskInput.value;
      taskText.classList.add('me-2');
      listItem.insertBefore(taskText, taskInput);
      taskInput.remove();
      saveButton.remove();

      const editButton = createButton('fa-edit', ['btn', 'btn-warning', 'btn-sm'], () => {
        const newTaskInput = document.createElement('input');
        newTaskInput.type = 'text';
        newTaskInput.value = taskText.textContent;
        newTaskInput.classList.add('form-control', 'me-2');
        listItem.insertBefore(newTaskInput, taskText);
        taskText.remove();
        editButton.remove();

        const newSaveButton = createButton('fa-save', ['btn', 'btn-success', 'btn-sm'], () => {
          if (newTaskInput.value.trim() !== '') {
            taskText.textContent = newTaskInput.value;
            listItem.insertBefore(taskText, newTaskInput);
            newTaskInput.remove();
            newSaveButton.remove();
            buttonContainer.insertBefore(editButton, deleteButton);
          } else {
            alert('A tarefa não pode estar vazia!');
          }
        });

        buttonContainer.insertBefore(newSaveButton, deleteButton);
      });

      buttonContainer.insertBefore(editButton, deleteButton);
    } else {
      alert('A tarefa não pode estar vazia!');
    }
  });

  const deleteButton = createButton('fa-trash', ['btn', 'btn-danger', 'btn-sm'], () => {
    taskList.removeChild(listItem);
  });

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(deleteButton);
  listItem.appendChild(buttonContainer);
  taskList.appendChild(listItem);
});

document.addEventListener('DOMContentLoaded', () => {
  const userPhoto = document.getElementById('userMenu');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  userPhoto.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show'); // Alterna a visibilidade do menu
  });

  document.addEventListener('click', (event) => {
    if (!userPhoto.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('show'); // Fecha o menu se clicar fora
    }
  });
});