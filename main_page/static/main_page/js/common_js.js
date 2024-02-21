const icon = document.getElementById("theme-icon")
let currentTheme = localStorage.getItem("theme") || "light"
setTheme(currentTheme)

icon.addEventListener("click", function () {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(currentTheme)
});


function setTheme(theme) {
  const bodyClassList = document.body.classList
  bodyClassList.remove("light-theme", "dark-theme")
  bodyClassList.add(theme + "-theme")

  icon.className =
    theme == "light" ? "fas fa-sun theme-icon" : "fas fa-moon theme-icon";+
  localStorage.setItem("theme", theme)
}


function openFavorites() {
  const favoritesSite = document.getElementById("favorites-site")
  const zatemnitel = document.getElementById("zatemnitel")

  favoritesSite.style.display = "block"
  zatemnitel.style.display = "block"
}


function closeWindow(windowToClose) {
  const windowToCloseElem = document.getElementById(windowToClose)
  const zatemnitel = document.getElementById("zatemnitel")

  windowToCloseElem.style.display = "none"
  zatemnitel.style.display = "none"
}


function actionWithFavorite(Id, section, vuz_or_razdel) {
  const mainId = Id.id
  const heart = document.getElementById('heart' + mainId)
  const name = document.getElementById('name' + mainId).textContent
  const url = heart.classList.contains('black') ? '/add_to_favorites/' : '/remove_from_favorites/'

  $.ajax({
    url: url,
    type: 'post',
    data: {
      number_fav_object: parseInt(mainId),
      name_fav_object: name,
      section: section,
      vuz_or_razdel: vuz_or_razdel,
    },
    success: function(data) {
      heart.classList.toggle('black')
      heart.classList.toggle('red')
    },
    error: function(xhr, status, error) {
      const smthWrong = document.getElementById("smth-wrong")
      smthWrong.style.display = "block"
    }
  })
}


function showFavorites(section) {
  $.ajax({
    url: '/show_favorites/',
    type: 'post',
    data: {
      'section': section
    },
    success: function(data) {
      const sectionContent = document.getElementById("section-content")
      sectionContent.innerHTML = ""
      
      if (data.favorites.length) {
        data.favorites.forEach(function (favorite) {
          let url
          const newDiv = document.createElement("div")
          newDiv.className = "favorite-object-block"

          const favP1 = document.createElement("p")
          const favP2 = document.createElement("p")
          if (favorite.fav_vuz) {
            favP1.textContent = "Вуз: " + favorite.fav_vuz
            url = document.getElementById("achievement-url").dataset.url
          } else {
            favP1.textContent = "Раздел: " + favorite.fav_razdel
            url = document.getElementById("description-url").dataset.url
          }
          favP2.textContent = favorite.fav_name

          newDiv.appendChild(favP1)
          newDiv.appendChild(favP2)

          if (favorite.fav_vuz) {
            newDiv.addEventListener("click", function (event) {
              event.preventDefault()
              const contentBds = document.getElementsByClassName("content_bds")
  
              for (let i = 0; i < contentBds.length; i++) {
                const contentBd = contentBds[i]
                const arrElem = document.getElementById(
                  contentBd.id.replace("content_bd", "arr")
                );
                const numberFavObject = document.getElementById(
                  favorite.number_fav_object
                );
  
                if (numberFavObject && contentBd.contains(numberFavObject)) {
                  contentBd.style.display = "block"
                  arrElem.classList.add("end_position")
                  bd = $(`#${contentBd.id}`)
                  arr = $(`#${arrElem.id}`)
                } else {
                  contentBd.style.display = "none"
                  arrElem.classList.remove("end_position")
                }
              }
              
              window.location.href = url + "#" + 'part' + favorite.number_fav_object
              closeWindow("favorites-site")
              window.checkOpenContent()
            })
          } else {
            newDiv.addEventListener("click", function (event) {
              event.preventDefault()
              window.location.href = url + "#" + 'card' + favorite.number_fav_object
              closeWindow("favorites-site")
              window.checkOpenContent()
            })
          }

          sectionContent.appendChild(newDiv)
        })
      } else {
        const p = document.createElement("p")
        p.className = "empty-data"
        p.textContent = "Здесь пока пусто"
        sectionContent.appendChild(p)
      }
    },
    error: function() {
      //
    }
  })
}


function editUserData(editFieldId) {
  const editField = document.getElementById(editFieldId)
  editField.style.display = 'block'

  if (editFieldId.includes('first')) {
    const nameText = document.getElementById('first-name-text')
    const editBtn = document.getElementById('edit-button-first')
    nameText.style.display = 'none'
    editBtn.style.display = 'none'
  } else {
    const nameText = document.getElementById('last-name-text')
    const editBtn = document.getElementById('edit-button-last')
    nameText.style.display = 'none'
    editBtn.style.display = 'none'
  }
}


function saveUserData(newName, previousName) {
  const whichName = newName.split('-')[0]
  $.ajax({
    url: '/save_user_data/',
    type: 'post',
    data: {
      'new_name': document.getElementById(newName).value,
      'which_name': whichName,
      'previous_name': document.getElementById(previousName).textContent
    },
    success: function(data) {
      let editFieldClose, nameTextOpen, editBtnOpen
      
      if (whichName == 'first') {
        const nameHere = document.getElementById('name-here')
        editFieldClose = document.getElementById('edit-field-first')
        nameTextOpen = document.getElementById('first-name-text')
        editBtnOpen = document.getElementById('edit-button-first')

        nameHere.textContent = data['new_name']
      } else {
        editFieldClose = document.getElementById('edit-field-last')
        nameTextOpen = document.getElementById('last-name-text')
        editBtnOpen = document.getElementById('edit-button-last')
      }
      
      document.getElementById(previousName).textContent = data['new_name']
      editFieldClose.style.display = 'none'
      nameTextOpen.style.display = 'inline-block'
      editBtnOpen.style.display = 'inline-block'
    },
    error: function(xhr, status, error) {
      console.log(status)
    }
  })
}
