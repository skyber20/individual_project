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


function addingFav(heartId, razdel, vuz='none') {
    const heartImg = document.getElementById(heartId)
    const numberFavObject = heartId.replace('heart', '')
    const nameFavObject = document.getElementById('name' + numberFavObject).textContent
    const url = heartImg.classList.contains('red') ? '/remove_from_favorites/' : '/add_to_favorites/'
    
    $.ajax({
        url: url,
        type: 'post',
        data: {
            'number_fav_object': parseInt(numberFavObject),
            'name_fav_object': nameFavObject,
            'section': razdel,
            'vuz': vuz
        },
        success: function(data) {
            heartImg.classList.toggle('black')
            heartImg.classList.toggle('red')
            showFavorites(razdel)
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
        data: {
            'section': razdel
        },
        success: function(data) {
            const sectionContent = document.getElementById('section-content')
            sectionContent.innerHTML = ''
            if (data.favorites.length) {
                data.favorites.forEach(function(favorite) {
                    const newDiv = document.createElement('div');
                    newDiv.className = 'favorite-object-block';
                
                    const favP1 = document.createElement('p');
                    const favP2 = document.createElement('p');
                    favP1.textContent = 'Вуз: ' + favorite.fav_vuz;
                    favP2.textContent = favorite.fav_name;
                
                    newDiv.appendChild(favP1);
                    newDiv.appendChild(favP2);
                
                    const url = document.getElementById('achievement-url').dataset.url;
                
                    newDiv.addEventListener('click', function(event) {
                        event.preventDefault();
                        const contentBds = document.getElementsByClassName('content_bds')
                        
                        for (let i = 0; i < contentBds.length; i++) {
                            const contentBd = contentBds[i]
                            const arr = document.getElementById(contentBd.id.replace('content_bd', 'arr'))
                            const numberFavObject = document.getElementById(favorite.number_fav_object);
                    
                            if (numberFavObject && contentBd.contains(numberFavObject)) {
                                contentBd.style.display = 'block'
                                arr.classList.add('end_position')
                            } else {
                                contentBd.style.display = 'none'
                                arr.classList.remove('end_position')
                            }
                        }
                    
                        window.location.href = url + '#' + favorite.number_fav_object;
                        closeWindow('favorites-site')
                    });
                
                    sectionContent.appendChild(newDiv);
                });
            } else {
                const p = document.createElement('p')
                p.className = 'empty-data'
                p.textContent = 'Здесь пока пусто'
                sectionContent.appendChild(p)
            }
        },
        error: function(xhr, status, error) {
            const smthWrong = document.getElementById('smth-wrong')
            smthWrong.style.display = 'block'
        }
    })
}
