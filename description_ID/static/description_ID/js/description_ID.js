function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let csrftoken = getCookie('csrftoken');

function getContent(section) {
    $.ajax({
        type: 'POST',
        url: '/give_description/',
        data: {
            'section': section,
        },
        headers: {
            'X-CSRFToken': csrftoken
        },
        success: function(response) {
            $('#content').html(response.content);
            const containerDescription = document.getElementById('container-content')
            containerDescription.style.display = 'block'
        }
    });
}
