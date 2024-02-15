for (let i = 1; i <= 3; i++) {
    const passwordInput = document.getElementById(`password${i}`)
    const toggleButton = document.getElementById(`toggle-button-visible${i}`)
    
    if (toggleButton != null) {
        toggleButton.addEventListener('click', function(event) {
            event.preventDefault()
            passwordInput.type == 'password' ? passwordInput.type = 'text' : passwordInput.type = 'password'
        })
    }
}
