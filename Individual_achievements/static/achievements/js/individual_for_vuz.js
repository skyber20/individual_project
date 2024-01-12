function getDetails(button) {
  let btnId = button.id
  let bdId = btnId.replace("article_btn", "content_bd")
  let arrId = btnId.replace("article_btn", "arr")

  const bd = $('#' + bdId)
  const arr = $('#' + arrId)

  bd.slideToggle(500)
  arr.toggleClass('end_position')

  const content_bds = $('.content_bds')
  for (let i = 0; i < content_bds.length; i++) {
    let content_bd = $(content_bds[i])
    if (content_bd.attr('id') != bdId && content_bd.is(':visible')) {
      arrIdNeeded = content_bd.attr('id').replace("content_bd", "arr")
      arrElem = $('#' + arrIdNeeded)
      content_bd.slideUp()
      arrElem.removeClass('end_position')
      break
    }
  }
}


function searchButtons() {
  const userInput = document.getElementById('searchInput').value.toLowerCase()
  const buttons = document.querySelectorAll('.article_btns')
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i]
    const text_btn = btn.textContent.toLowerCase()
    const bd = document.getElementById(btn.id.replace("article_btn", "bd"))
    if (text_btn.indexOf(userInput) !== -1) {
        bd.style.display = 'block'
    } else {
        bd.style.display = 'none'
    }
  }
}


function addingFav(heart) {
  const heartImg = document.getElementById(heart)
  heartImg.classList.toggle('red')
  heartImg.classList.toggle('black')
}
