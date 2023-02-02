import createNewTask from "./modules/createNewTask.js"
import createModalWindow from "./modules/createModalWindow.js"

const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
]

const body = document.body
const newTaskBlock = document.querySelector('.create-task-block')
const tasksList = document.querySelector('.tasks-list')


renderTasks()
function renderTasks() {
    tasksList.innerHTML = ''
    tasks.forEach(task => {
        tasksList.append(createNewTask(task.id,task.text))
    })
}

const spanNode = document.createElement('span')
spanNode.className = 'error-message-block'
newTaskBlock.addEventListener('submit', addNewTask)

function addNewTask(event) {
    event.preventDefault()
    const {target} = event
    const newTaskInput = target.taskName
    
    if (!newTaskInput.value) {
        newTaskBlock.append(spanNode)
        spanNode.innerText = 'Название задачи не должно быть пустым!'
    } else if (tasks.some(task => task.text.toLowerCase().includes(newTaskInput.value.toLowerCase().trim()))) {
        newTaskBlock.append(spanNode)
        spanNode.innerText = 'Задача с таким названием уже существует!'
    } else { 
        const newTask = {
            id: Date.now().toString(),
            completed: false,
            text: newTaskInput.value.trim()
        }

        tasks.push(newTask)
        renderTasks()
        newTaskInput.value = ''
        spanNode.remove()
}}


body.append(createModalWindow())

tasksList.addEventListener('click', deleteTask)

let taskIdToRemove = null

function deleteTask(event) {
    const modalOverlay = document.querySelector('.modal-overlay')
    const cancelButton = document.querySelector('.delete-modal__cancel-button')
    const confirmButton = document.querySelector('.delete-modal__confirm-button')
    const isDeleteButton = event.target.closest('.task-item__delete-button')
    
    if (isDeleteButton) {
        modalOverlay.classList.remove('modal-overlay_hidden')
        cancelButton.addEventListener('click', () => {
        modalOverlay.classList.add('modal-overlay_hidden')
        })
        confirmButton.addEventListener('click', () => {
            const removeTask = isDeleteButton.closest('.task-item')
            taskIdToRemove = removeTask.dataset.taskId
            const removeIndex = tasks.findIndex(task => task.id === taskIdToRemove)
            if (removeIndex >= 0) {
                tasks.splice(removeIndex,1)
                const taskNodeToRemove = document.querySelector(`[data-task-id='${taskIdToRemove}']`)
                taskNodeToRemove.remove()
                modalOverlay.classList.add('modal-overlay_hidden')
            }
        })
    }
}


let currentTheme = 'light'

document.addEventListener('keydown', switchTheme)

function switchTheme(event) {
    const {key} = event
    if (key === 'Tab') {
        event.preventDefault()
        if (currentTheme === 'light') {
            setNewCSSValues('#24292E','#ffffff','1px solid #ffffff') 
            currentTheme = 'dark'
        } else {
            setNewCSSValues('initial','initial','none')
            currentTheme = 'light'
        }
    } 
}

function setNewCSSValues(bodyValue, tasksValue, buttonsValue) {
    const allButtons = document.querySelectorAll('button')
    const allTasks = document.querySelectorAll('.task-item')
    
    body.style.background = bodyValue
    allTasks.forEach(task => task.style.color = tasksValue)
    allButtons.forEach(button => button.style.border = buttonsValue)
}