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
    const sometimes = document.getElementById('sometimes' + id)
    const warningId = document.getElementById('warning' + id)
    Func(id)

    // if (yes.checked || no.checked || sometimes.checked) {
    //     warningId.classList.remove('opacity_anim')
    //     Func(id)
    // } else {
    //     warningId.classList.add('opacity_anim')
    // }
}


function backQuestion(id) {
    const current = document.getElementById('question' + id)
    const previous = document.getElementById('question' + String(Number(id) - 1))
    const previousBtn = document.getElementById('next_question' + String(Number(id) - 1))
    current.style.display = 'none'
    previous.style.display = 'block'
    previousBtn.style.display = 'block'
}


function nextQuestion(id) {
    const current = document.getElementById('question' + id)
    const next = document.getElementById('question' + String(Number(id) + 1))
    const btn = document.getElementById('next_question' + id)
    next.style.display = 'block'
    current.style.display = 'none'
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
            const resultBlock = document.getElementById('resultBlock')
            const resultP = document.getElementById('resultP')
            const detailRes = document.getElementById('detail-res')
            const sumOfPoints = document.getElementById('sum-of-points')
            const test = document.getElementById('test')
            
            showResults()
            test.style.display = 'none'
            btn.style.display = 'none'
            resultBlock.style.display = 'block'
            resultP.innerHTML += '<strong>' + response.fast_res + '</strong>'
            detailRes.innerHTML = response.detail_res
            sumOfPoints.innerHTML = `Ваше кол-во баллов: <strong>${response.sum_of_points} из 32</strong>`
        },
        error: function(xhr){
            alert("Произошла ошибка при обработке ваших ответов.")
        }
    });  
}


function showResults() {
    const resultBlock = document.getElementById('resultBlock')

    resultBlock.style.display = 'block'

    setTimeout(function() {
        resultBlock.classList.add('show')
    }, 100);
}


function moreDetails() {
    const detailRes = document.getElementById('detail-res')
    const sumOfPoints = document.getElementById('sum-of-points')
    const textResBtn = document.getElementById('text-res-btn')

    if (detailRes.style.display == 'none') {
        detailRes.style.display = 'block'
        sumOfPoints.style.display = 'block'
        textResBtn.innerText = 'Свернуть'
    } else {
        detailRes.style.display = 'none'
        sumOfPoints.style.display = 'none'
        textResBtn.innerText = 'Узнать подробнее'
    }
}
