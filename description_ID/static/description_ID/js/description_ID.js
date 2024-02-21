function getContent(section) {
    $.ajax({
        type: 'POST',
        url: '/give_description/',
        data: {
            'section': section,
        },
        success: function(events) {
            const containerDescription = document.getElementById('container-content')
            const content = document.getElementById('content')
            content.innerHTML = ''
            containerDescription.style.display = 'block'
            if (section == 'Перечневые') {
                content.innerHTML = events
            } else {
                const emptyP = document.createElement('p')
                emptyP.textContent = 'Здесь пока пусто'
                emptyP.id = 'empty-p'
                content.appendChild(emptyP)
            }
        },
        error: function(error) {
            alert(error)
        }
    });
}
