class Task {
    constructor(array) {
        this.array = array
    }

    #createNewTask(id,text) {
        const divTaskItem = document.createElement('div')
        divTaskItem.className = 'task-item'
        divTaskItem.dataset.taskId = id
        const divMainContainer = document.createElement('div')
        divMainContainer.classList = 'task-item__main-container'
        const divMainContent = document.createElement('div')
        divMainContent.className = 'task-item__main-content'
        const form = document.createElement('form')
        form.className = 'checkbox-form'
        const input = document.createElement('input')
        input.className = 'checkbox-form__checkbox'
        input.type = 'checkbox'
        input.id = id  
        const label = document.createElement('label')
        label.htmlFor = id 
        const span = document.createElement('span')
        span.className = 'task-item__text'
        span.innerText = text  
        const buttonTaskItem = document.createElement('button')
        buttonTaskItem.className = 'task-item__delete-button default-button delete-button'
        buttonTaskItem.dataset.deleteTaskId = '5'
        buttonTaskItem.innerText = 'Удалить'
            
        divTaskItem.append(divMainContainer)
        divMainContainer.append(divMainContent,buttonTaskItem)
        divMainContent.append(form,span)
        form.append(input,label)

        return divTaskItem
    }

    #createModalWindow() {
        const modalOverlay = document.createElement('div')
        modalOverlay.className = 'modal-overlay modal-overlay_hidden'
        const deleteModal = document.createElement('div')
        deleteModal.className = 'delete-modal'
        const h3 = document.createElement('h3')
        h3.className = 'delete-modal__question'
        h3.innerText = 'Вы действительно хотите удалить эту задачу?'
        const deleteModalButtons = document.createElement('div')
        deleteModalButtons.className = 'delete-modal__buttons'
        const cancelButton = document.createElement('button')
        cancelButton.className = 'delete-modal__button delete-modal__cancel-button'
        cancelButton.innerText = 'Отмена'
        const confirmButton = document.createElement('button')
        confirmButton.className = 'delete-modal__button delete-modal__confirm-button'
        confirmButton.innerText = 'Удалить'
        
        modalOverlay.append(deleteModal)
        deleteModal.append(h3,deleteModalButtons)
        deleteModalButtons.append(cancelButton,confirmButton)

        return modalOverlay
    }

    


    render() {
        const body = document.body
        const newTaskBlock = document.querySelector('.create-task-block')
        const tasksList = document.querySelector('.tasks-list')
        const spanNode = document.createElement('span')
        spanNode.className = 'error-message-block'
        let taskIdToRemove = null
        let currentTheme = 'light'
        body.append(this.#createModalWindow())
        
        const renderTasks = () => {
            tasksList.innerHTML = ''
            this.array.forEach(task => tasksList.append(this.#createNewTask(task.id,task.text)))
        }
            
        renderTasks()

        
        const addNewTask = (event) => {
            event.preventDefault()
            const {target} = event
            const newTaskInput = target.taskName
            
            if (!newTaskInput.value) {
                newTaskBlock.append(spanNode)
                spanNode.innerText = 'Название задачи не должно быть пустым!'
            } else if (this.array.some(task => task.text.toLowerCase().includes(newTaskInput.value.toLowerCase().trim()))) {
                newTaskBlock.append(spanNode)
                spanNode.innerText = 'Задача с таким названием уже существует!'
            } else { 
                const newTask = {
                    id: Date.now().toString(),
                    completed: false,
                    text: newTaskInput.value.trim()
                }

                this.array.push(newTask)
                renderTasks()
                newTaskInput.value = ''
                spanNode.remove()
        }}

        newTaskBlock.addEventListener('submit', addNewTask)

        const deleteTask = (event) => {
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
                    const removeIndex = this.array.findIndex(task => task.id === taskIdToRemove)
                    if (removeIndex >= 0) {
                        this.array.splice(removeIndex,1)
                        const taskNodeToRemove = document.querySelector(`[data-task-id='${taskIdToRemove}']`)
                        taskNodeToRemove.remove()
                        modalOverlay.classList.add('modal-overlay_hidden')
                    }
                })
            }
        }

        tasksList.addEventListener('click', deleteTask)

        const switchTheme = (event) => {
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

        const setNewCSSValues = (bodyValue, tasksValue, buttonsValue) => {
            const allButtons = document.querySelectorAll('button')
            const allTasks = document.querySelectorAll('.task-item')
            body.style.background = bodyValue
            allTasks.forEach(task => task.style.color = tasksValue)
            allButtons.forEach(button => button.style.border = buttonsValue)
        }

        document.addEventListener('keydown',switchTheme)
    }
}

export default Task