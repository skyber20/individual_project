let selectedAchieves = {}

function getListAchieves(razdel) {
    $.ajax({
        url: '/get_achievements/',
        type: 'post',
        data: {
            'razdel': razdel
        },  
        success: function(achieveList) {
            const sendBtn = document.getElementById('calculate-btn')
            const achievements = document.getElementById('achievements')
            sendBtn.style.display = 'block'
            achievements.innerHTML = ''
            achievements.innerHTML = achieveList
            
            const counter = Number(document.getElementById('counter').textContent)
            for (let i = 1; i <= counter; i++) {
                let textAchieve = document.getElementById(`label-achieve-${razdel}${i}`).textContent
                if (textAchieve in selectedAchieves) {
                    let checkbox = document.getElementById(`input-achieve-${razdel}${i}`)
                    let status = document.getElementById(`select-achieve-${razdel}${i}`)
                    checkbox.checked = true
                    status.style.display = 'inline-block'
                    status.value = selectedAchieves[textAchieve]
                }
            }
        },
        error: function() {
            // alert(0) 
        }
    })
}


function selectAchieve(achieveId) {
    const inputAchieve = document.getElementById('input-achieve-' + achieveId)
    const inputActivated = inputAchieve.checked
    const selectPanel = document.getElementById('select-achieve-' + achieveId)

    inputAchieve.checked = !inputActivated
    selectPanel.style.display = inputActivated ? 'none' : 'block'
    actionSelectedAchieve(achieveId, !inputActivated)
}


function actionSelectedAchieve(achieveId, isChecked) {
    const achieveName = document.getElementById('label-achieve-' + achieveId).textContent

    if (isChecked) {
        selectedAchieves[achieveName] = 'adding_points_uchastnik'
    } else {
        delete selectedAchieves[achieveName]
    }
}


function changeStatus(achieveId, achieve) {
    const achieveName = document.getElementById('label-achieve-' + achieveId).textContent
    selectedAchieves[achieveName] = achieve.value
}


function sendAchieves() {
    console.log(selectedAchieves)
    $.ajax({
        url: '/send_achieves/',
        type: 'post',
        data: {
            'selected_achieves': JSON.stringify(selectedAchieves)
        },
        success: function(status) {
            // alert(status)
        },
        error: function(status) {
            // alert(status)
        }
    })
}
