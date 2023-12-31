function showTest() {
    const btnId = document.getElementById('start_test')
    const test = document.getElementById('test')
    const question1 = document.getElementById('question1')

    btnId.style.display = 'none'
    test.style.display = 'block'
    question1.style.display = 'block'
}


function commonFunc(id, Func) {
    const yes = document.getElementById('yes' + id)
    const no = document.getElementById('no' + id)
    const warningId = document.getElementById('warning' + id)

    if (yes.checked || no.checked) {
        warningId.classList.remove('opacity_anim')
        Func(id)
    } else {
        warningId.classList.add('opacity_anim')
    }
}


function nextQuestion(id) {
    const next = document.getElementById('question' + String(Number(id) + 1))
    const btn = document.getElementById('next_question' + id)
    next.style.display = 'block'
    btn.style.display = 'none'
}


function endTest(id) {
    const radios = document.querySelectorAll('input[type="radio"]')
    userAnswers = []
    
    radios.forEach(function(radio) {
        radio.disabled = true
        if (radio.checked) {
            userAnswers.push(radio.value)
        }
    })

    $.ajax({
        url: "/compare_answers/", 
        type: "post",
        data: {user_answers: userAnswers}, 
        success: function(response){
            const btn = document.getElementById('end_test')
            const btnRepeat = document.getElementById('repeat_test')
            const resultBlock = document.getElementById('resultBlock')
            const resultP = document.getElementById('resultP')

            btn.style.display = 'none'
            resultBlock.style.display = 'block'
            resultP.innerHTML = response.res
            btnRepeat.style.display = 'block'
        },
        error: function(xhr){
            alert("Произошла ошибка при обработке ваших ответов.")
        }
    });
}
