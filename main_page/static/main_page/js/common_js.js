const icon = document.getElementById('theme-icon')
let currentTheme = localStorage.getItem('theme') || 'light'
setTheme(currentTheme)

icon.addEventListener('click', function() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(currentTheme)
})


function setTheme(theme) {
    const bodyClassList = document.body.classList
    bodyClassList.remove('light-theme', 'dark-theme')
    bodyClassList.add(theme + '-theme')
    
    icon.className = theme == 'light' ? 'fas fa-moon theme-icon' : 'fas fa-sun theme-icon'
    localStorage.setItem('theme', theme)
}


function openFavorites() {
    const favoritesSite = document.getElementById('favorites-site')
    const zatemnitel = document.getElementById('zatemnitel')
    
    favoritesSite.style.display = 'block'
    zatemnitel.style.display = 'block'
}


function closeWindow(windowToClose) {
    const windowToCloseElem = document.getElementById(windowToClose)
    const zatemnitel = document.getElementById('zatemnitel')
    
    windowToCloseElem.style.display = 'none'
    zatemnitel.style.display = 'none'
}


function addingFav(heartId) {
    const heartImg = document.getElementById(heartId)
    const achievementId = heartId.replace('heart', '')
    const achievementNumber = document.getElementById('number' + achievementId).innerText
    const achievementName = document.getElementById('name' + achievementId).innerText
    const achievementCategory = document.getElementById('category' + achievementId).innerText

    heartImg.classList.toggle('black')
    heartImg.classList.toggle('red')

    const url = heartImg.classList.contains('red') ? '/add_to_favorites/' : '/remove_from_favorites/';

    $.ajax({
        url: url,
        type: 'post',
        data: {
            'achievement_id': achievementId,
            'achievement_number': achievementNumber,
            'achievement_name': achievementName,
            'achievement_category': achievementCategory
        },
        success: function(data) {
            const action = heartImg.classList.contains('red') ? 'Добавлено в избранное!' : 'Удалено из избранного!';
            alert(action);
        },
        error: function(xhr, status, error) {
            alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    });
}


function showFavorites(section) {
    $.ajax({
        url: '/show_favorites/',
        type: 'post',
        data: {'section': section},
        success: function(data) {
            alert('получилось')
        },
        error: function(xhr, status, error) {
            alert('ошибка')
        }
    })
}
