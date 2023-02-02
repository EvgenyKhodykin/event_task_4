function createNewTask(id,text) {
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

export default createNewTask