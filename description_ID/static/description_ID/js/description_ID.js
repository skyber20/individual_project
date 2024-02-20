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
            content.innerHTML = events
            containerDescription.style.display = 'block'
        },
        error: function(error) {
            alert(error)
        }
    });
}
