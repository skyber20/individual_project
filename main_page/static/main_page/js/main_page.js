const list_of_creative_sentences = [
  "Поступление в вуз - это не лотерея, а результат вашей работы.",
  "Ваше портфолио - ваш паспорт в мир успеха.",
  "Поступайте не наугад, а по заслугам.",
]
const textElement = document.getElementById("creative_span")
const cursorElement = document.getElementById("cursor")
const speed = 75
let i = 0
let j = 0
let isDeleting = false


function animateText() {
  const text = list_of_creative_sentences[i]
  const len = text.length
  textElement.style.width = `${len}ch`
  textElement.innerHTML = text.substring(0, j)
  cursorElement.style.animation = "flashing 0.75s step-end infinite"

  if (!isDeleting && j === len) {
    isDeleting = true
    setTimeout(animateText, 3000)
  } else if (isDeleting && j === 0) {
    isDeleting = false
    i = (i + 1) % list_of_creative_sentences.length;
    setTimeout(animateText, 3000)
  } else {
    j += isDeleting ? -1 : 1;
    setTimeout(animateText, speed)
  }
}


animateText()


document.getElementById('rate-link').addEventListener('click', function(e) {
  e.preventDefault()
  const ratingSite = document.getElementById('rating-site')
  const zatemnitel = document.getElementById('zatemnitel')
  const bool = ratingSite.style.display === 'none'

  ratingSite.style.display = bool ? 'block' : 'none'
  zatemnitel.style.display = bool ? 'block': 'none'
})


function closeWindow(window, bool=False) {
  const window = document.getElementById(window)

  if (bool) {
    const zatemnitel = document.getElementById('zatemnitel')
    zatemnitel.style.display = 'none'
  }

  window.style.display = 'none'
}


function getRate(mark) {
  $.ajax({
    url: '/rate/',
    type: 'post',
    data: {'mark': mark},
    success: function(data) {
      const ratingSite = document.getElementById('rating-site')
      const zatemnitel = document.getElementById('zatemnitel')

      ratingSite.style.display = 'none'
      zatemnitel.style.display = 'none'

      alert('Спасибо за вашу оценку!')
    },
    error: function(xhr, status, error) {
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
    }
  })
}
