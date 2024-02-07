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


function addingFav(heartId, section) {
    const heartImg = document.getElementById(heartId)
    const favObjectId = heartId.replace('heart', '')
    const numberFavObject = document.getElementById('number' + favObjectId).textContent
    const nameFavObject = document.getElementById('name' + favObjectId).textContent
    
    const url = heartImg.classList.contains('red') ? '/remove_from_favorites/' : '/add_to_favorites/'
    
    $.ajax({
        url: url,
        type: 'post',
        data: {
            'fav_object_id': favObjectId,
            'number_fav_object': numberFavObject,
            'name_fav_object': nameFavObject,
            'section': section
        },
        success: function(data) {
            heartImg.classList.toggle('black')
            heartImg.classList.toggle('red')
        },
        error: function(xhr, status, error) {
            const smthWrong = document.getElementById('smth-wrong')
            smthWrong.style.display = 'block'
        }
    })
}


function showFavorites(razdel) {
    $.ajax({
        url: '/show_favorites/',
        type: 'post',
        data: {'section': razdel},
        success: function(data) {
            const sectionContent = document.getElementById('section-content')
            sectionContent.innerHTML = ''
            data.favorites.forEach(function(favorite) {
                const favP = document.createElement('p')
                favP.className = 'fav-p'
                favP.textContent = favorite.fav_id + ' ' + favorite.fav_name
                sectionContent.appendChild(favP)
            })
        },
        error: function(xhr, status, error) {
            alert('ошибка')
        }
    })
}
