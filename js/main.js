//DATE
const title = document.querySelector('.date');
const moment = new Date();

function addZero (num) {
  return num >= 10 ? num : `0${num}`;
}

function formattDate (date) {
  const weekDay = setDayWeek(date.getDay() + 1);
  const day = addZero(date.getDate());
  const month = setMonth(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${weekDay}, ${day} de ${month} de ${year}`;
}

function setDateAtTitle () {
  title.innerHTML = formattDate(moment);
}
setDateAtTitle();

function setDayWeek (num) {
  switch (num) {
    case 1: return 'domingo';
    case 2: return 'segunda';
    case 3: return 'terça';
    case 4: return 'quarta';
    case 5: return 'quinta';
    case 6: return 'sexta';
    case 7: return 'sábado';
  }
}
function setMonth (num) {
  switch (num) {
    case 1: return 'Janeiro';
    case 2: return 'Fevereiro';
    case 3: return 'Março';
    case 4: return 'Abril';
    case 5: return 'Maio';
    case 6: return 'Junho';
    case 7: return 'Julho';
    case 8: return 'Agosto';
    case 9: return 'Setembro';
    case 10: return 'Outubro';
    case 11: return 'Novembro';
    case 12: return 'Dezembro';
  }
}

//TASKS
const taskInput = document.querySelector("#task-input");

function createArticle () {
  return document.createElement('article');
}

function createDiv () {
  return document.createElement('div');
}

function createP () {
  return document.createElement('p');
}

function createImg () {
  return document.createElement('img');
}

function createInput () {
  return document.createElement('input');
}

function createH4 () {
  return document.createElement('h4');
}

function clearInput () {
  taskInput.value = '';
  taskInput.focus();
}

function createPriorityContainer (isUrgent, isImportant) {
  const priorityContainer = createDiv();
  priorityContainer.className = 'flex-container';
  priorityContainer.classList.add('justify-end');
  const important = createP();
  const urgent = createP();
  urgent.classList.add('task-priority');
  urgent.id = ('urgent');
  urgent.innerText = 'Urgente';
  if (isUrgent) urgent.classList.add('urgent');
  important.classList.add('task-priority');
  important.id = ('important');
  important.innerText = 'Importante';
  if (isImportant) important.classList.add('important');
  priorityContainer.appendChild(urgent);
  priorityContainer.appendChild(important);
  return priorityContainer;
}

function createCheckbox (isDone) {
  const check = createDiv();
  check.className = 'check';
  const checkbox = createInput();
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = 'done';
  if (isDone) {
    checkbox.checked = true;
  }
  check.appendChild(checkbox);
  return check;
}

function createTaskContent (input) {
  const content = createDiv();
  content.className = 'task-content';
  const taskTitle = createH4();
  taskTitle.className = 'task-title';
  taskTitle.innerHTML = input;
  content.appendChild(taskTitle);
  return content;
}

function createDeleteButton () {
  const deleteContainer = createDiv();
  deleteContainer.className = 'delete-task';
  const deleteBt = createImg();
  deleteBt.setAttribute('src', './img/delete.svg');
  deleteBt.setAttribute('alt', 'Deletar tarefa');
  deleteBt.setAttribute('height', '30px');
  deleteBt.className = 'delete-bt';
  deleteContainer.appendChild(deleteBt);
  return deleteContainer;
}

function createTaskContainer (input, isDone) {
  const taskContainer = createDiv();
  taskContainer.className = 'task';
  taskContainer.classList.add('flex-container');
  taskContainer.appendChild(createCheckbox(isDone));
  taskContainer.appendChild(createTaskContent(input));
  taskContainer.appendChild(createDeleteButton());
  if (isDone) taskContainer.classList.add('done');
  return taskContainer;
}

function createTaskTemplate (input, isDone, isUrgent, isImportant) {
  const newItem = createArticle();
  newItem.className = 'task-item';
  newItem.setAttribute('draggable', true);
  newItem.appendChild(createPriorityContainer(isUrgent, isImportant));
  newItem.appendChild(createTaskContainer(input, isDone));
  return newItem;
}

function disappearPomodoro() {
  const pomodoro = document.querySelector('.pomodoro');
  const tasks = document.querySelectorAll('.task-item');
  if(tasks.length > 0) {
    pomodoro.style.display = 'none';
  }
}

function addTask () {
  const btAddTask = document.querySelector('.bt-add-task');
  
  btAddTask.addEventListener('click', () => {
    if (!taskInput.value) return;
    const tasks = document.querySelector('.tasks');
    tasks.appendChild(createTaskTemplate(taskInput.value, false, false, false));
    clearInput();
    saveTasks();
    disappearPomodoro();
  });
}
addTask();

function addTaskByKeyBoard () {
  taskInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      if (!taskInput.value) return;
      const tasks = document.querySelector('.tasks');
      tasks.appendChild(createTaskTemplate(taskInput.value, false, false, false));
      clearInput();
      saveTasks();
      disappearPomodoro();
    }
  });
}
addTaskByKeyBoard();

function changeImportantBg () {
  document.addEventListener('click', (e) => {
    const item = e.target;
    if (item.id === 'important') {
      item.classList.contains('important')
        ? item.classList.remove('important')
        : item.classList.add('important');
    }
    saveTasks();
  });
}
changeImportantBg();

function changeUrgentBg () {
  document.addEventListener('click', (e) => {
    const item = e.target;
    if (item.id === 'urgent') {
      item.classList.contains('urgent')
        ? item.classList.remove('urgent')
        : item.classList.add('urgent');
    }
    saveTasks();
  });
}
changeUrgentBg();

function taskDone () {
  document.addEventListener('click', (e) => {
    const item = e.target;
    const taskContainer = item.parentElement.parentElement;
    if (item.id === 'done') {
      item.checked
      ? taskContainer.classList.add('done')
      : taskContainer.classList.remove('done');
    }
    saveTasks();
  });
}
taskDone();

function deleteTask () {
  document.addEventListener('click', (e) => {
    const item = e.target;
    if (item.classList.contains('delete-task')) {
      item.parentElement.parentElement.remove();
    }
    if (item.classList.contains('delete-bt')) {
      item.parentElement.parentElement.parentElement.remove();
    }
    saveTasks();
  });
}
deleteTask();


function saveTasks () {
  const taskItems = document.querySelectorAll('.task-item');
  let objects = [];

  taskItems.forEach((item) => {
    const priority = item.children[0];
    const urgentTask = priority.children[0];
    const importantTask = priority.children[1];
    const content = item.children[1];
    const taskTitle = item.querySelector('.task-title').innerText;
    let task = {
      title: '',
      isDone: false,
      isUrgent: false,
      isImportant: false
    }
    task.title = taskTitle;
    task.isDone = content.classList.contains('done');
    task.isUrgent = urgentTask.classList.contains('urgent');
    task.isImportant = importantTask.classList.contains('important');
    objects.push(task);
  });
  localStorage.remove('tasks');
  const tasksJSON = JSON.stringify(objects);
  localStorage.setItem('tasks', tasksJSON);
}

function getTasks () {
  const localTasks = localStorage.getItem('tasks');
  if (localTasks) {
    const taskList = JSON.parse(localTasks);
    taskList.forEach((item) => {
      const tasks = document.querySelector('.tasks');
      tasks.appendChild(createTaskTemplate(item.title, item.isDone, item.isUrgent, item.isImportant));
    });
    disappearPomodoro();
  }
}
getTasks();

//DRAG AND DROP
function dragAndDropTask() {
  const container = document.querySelector('.tasks');
    container.addEventListener('dragend', (evt) => {
      container.insertBefore(evt.target, evt.target.previousElementSibling);
      saveTasks();
    });
}
dragAndDropTask();

//POMODORO TIMER
function getDateInSeconds (value) {
  const data = new Date(value * 1000);
  return data.toLocaleTimeString('pt-BR', {
    hour12: false,
    timeZone: 'UTC'
  });
}

const timer = document.querySelector('.timer');
const play = document.querySelector('.play');
let seconds = 25 * 60;
let time;
let counter = 0;

function startClock() {
  time = setInterval(() => {
    seconds--;
    timer.innerHTML = getDateInSeconds(seconds);
    stopTimer(seconds);
  }, 1000);
}

function countCicles (value) {
  const cicle = document.querySelector('.cicle');
  const minutes = document.querySelector('.pause-minutes');
  const alert = document.querySelector('.alert-container');
  if(value < 4) {
    cicle.innerHTML = value > 1 ? `${value} ciclos de foco` : `${value} ciclo de foco`;
    minutes.innerHTML = 'por 5';
    alert.style.display = 'block';
  }
  if (value === 4) {
    cicle.innerHTML = `${value} ciclos de foco`;
    minutes.innerHTML = 'de 15 a 30';
    alert.style.display = 'block';
    
  }
  function disappearAlert () {
    alert.style.display = 'none';
  }
  window.setTimeout(disappearAlert, 7000)
}

function playBip() {
  const bip = document.querySelector('.bip');
  return bip.play();
}

function stopTimer (value) {
  if (value === 0) {
    counter++;
    clearInterval(time);
    playBip();
    timer.innerHTML = '00:25:00';
    seconds = 25 * 60;
    timer.classList.add('stoped');
    play.setAttribute('src', './img/play.svg');
    countCicles(counter);
    if (counter === 4) counter = 0;
  }
}

play.addEventListener('click', () => {
    if(timer.classList.contains('stoped')) {
      clearInterval(time);
      startClock();
      play.setAttribute('src', './img/pause.svg');
      timer.classList.remove('stoped');
    } else {
      clearInterval(time);
      timer.classList.add('stoped');
      play.setAttribute('src', './img/play.svg');
    }
  });
