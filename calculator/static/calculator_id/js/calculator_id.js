function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


let selectedAchievements = {}


$.get('/get_achievements/', function(data) {
    const divCategories = document.getElementById("categories");
    for (let category in data) {
        const divNavItem = document.createElement("div");
        divNavItem.textContent = category;
        divNavItem.onclick = function() {
            populateAchievements(category, data[category]);
        };
        divNavItem.className = 'nav-item'
        divCategories.appendChild(divNavItem);
    }
});


function populateAchievements(category, achievements) {
    const divAchievements = document.getElementById('achievements')
    divAchievements.innerHTML = ''

    for (let achievement of achievements) {
        achievement = achievement[0].toUpperCase() + achievement.slice(1)
        const divPotomok = document.createElement('div')
        const label = document.createElement('label')
        label.className = 'label-achieve'

        const input = document.createElement('input')
        input.className = 'input-achieve'
        input.type = 'checkbox'
        input.name = 'achievement'
        input.value = achievement
        if (selectedAchievements[achievement]) {
            input.checked = true
        }
        input.onchange = function() {
            const statusSelect = this.nextElementSibling
            if (this.checked) {
                statusSelect.style.display = 'inline-block'
                selectedAchievements[achievement] = statusSelect.value
            } else {
                statusSelect.style.display = 'none'
                delete selectedAchievements[achievement]
            }
        }

        const select = document.createElement('select')
        select.className = 'select-achieve'
        select.style.display = 'none'
        select.options.add(new Option("Участник", "participant"))
        select.options.add(new Option("Призер", "prizeWinner"))
        select.options.add(new Option("Победитель", "winner"))
        select.options.add(new Option("Лауреат", "laureate"))
        select.onchange = function() {
            selectedAchievements[achievement] = this.value
        }

        if (selectedAchievements[achievement]) {
            select.style.display = 'inline-block'
            select.value = selectedAchievements[achievement]
            input.checked = true
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(' ' + achievement));
        label.appendChild(select);
        divPotomok.appendChild(label)
        divAchievements.appendChild(divPotomok)
    }
}


document.getElementById('calculate-btn').addEventListener('click', function() {
    $.ajax({
        url: '/send_achieves/',
        type: 'POST',
        data: JSON.stringify(selectedAchievements),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        },
        success: function(response) {
            console.log(response);
        }
    });
});

