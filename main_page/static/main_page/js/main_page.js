const list_of_creative_sentences = [
  "Поступление в вуз - это не лотерея, а результат вашей работы.",
  "Ваше портфолио - ваш паспорт в мир успеха.",
  "Поступайте не наугад, а по заслугам.",
];
const textElement = document.getElementById("creative_span");
const cursorElement = document.getElementById("cursor");
const speed = 75;
let i = 0;
let j = 0;
let isDeleting = false;

function animateText() {
  const text = list_of_creative_sentences[i];
  const len = text.length;
  textElement.style.width = `${len}ch`;
  textElement.innerHTML = text.substring(0, j);
  cursorElement.style.animation = "flashing 0.75s step-end infinite";

  if (!isDeleting && j === len) {
    isDeleting = true;
    setTimeout(animateText, 3000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % list_of_creative_sentences.length;
    setTimeout(animateText, 3000);
  } else {
    j += isDeleting ? -1 : 1;
    setTimeout(animateText, speed);
  }
}

animateText();
