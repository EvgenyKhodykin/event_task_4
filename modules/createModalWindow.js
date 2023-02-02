function createModalWindow() {
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

export default createModalWindow