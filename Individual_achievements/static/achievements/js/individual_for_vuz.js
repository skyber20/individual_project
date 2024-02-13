const contentBds = $('.content_bds')
const arrs = $('.arrs')
const btnHide = $('#btn-hide')
let bd
let arr


// document.querySelectorAll('.searchInputContext').forEach(InputContext => {
//   InputContext.addEventListener('input', function() {
//     const InputContextValue = InputContext.value.toLowerCase()

//     document.querySelectorAll(`.part${InputContext.id.replace('searchInput', '')}`).forEach(part => {
//       const nameEvent = part.querySelector('h3 span').textContent.toLowerCase().slice(13)
//       if (nameEvent.includes(InputContextValue)) {
//         part.style.display = 'block'
//       } else {
//         part.style.display = 'none'
//       }
//     })
//   })
// })


function getNameEvent(searchInputId) {
  const InputContextValue = document.getElementById(`searchInput${searchInputId}`).value.toLowerCase()

  document.querySelectorAll(`.part${searchInputId}`).forEach(part => {
    const nameEvent = part.querySelector('h3 span').textContent.toLowerCase().slice(13)
    if (nameEvent.includes(InputContextValue)) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })
}


function getDetails(button) {
  const btnId = button.id
  const bdId = btnId.replace("article_btn", "content_bd")
  const arrId = btnId.replace("article_btn", "arr")
  
  bd = $('#' + bdId)
  arr = $('#' + arrId)
  
  bd.slideToggle(500)
  arr.toggleClass('end_position')
  btnHide.toggleClass('disp_none')
  
  for (let i = 0; i < contentBds.length; i++) {
    let content_bd = $(contentBds[i])
    if (content_bd.attr('id') != bdId && content_bd.is(':visible')) {
      arrIdNeeded = content_bd.attr('id').replace("content_bd", "arr")
      arrElem = $('#' + arrIdNeeded)
      content_bd.slideUp()
      arrElem.removeClass('end_position')
      break
    }
  }
  checkOpenContent()
}


window.checkOpenContent = function() {
  const arrs = $('.arrs')
  for (let i = 0; i < arrs.length; i++) {
    if ($(arrs[i]).hasClass('end_position')) {
      btnHide.removeClass('disp_none')
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


function closeDetails() {
  bd.slideToggle(500)
  arr.toggleClass('end_position')
  btnHide.toggleClass('disp_none')
}
