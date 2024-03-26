const chooseVuzDiv = document.getElementById('choose-vuz')
const chooseAchievesDiv = document.getElementById('choose-achieves')
const caclulatedInfoDiv = document.getElementById('calculated-info')
let engNameVuz
let rusNameVuz
let allAchieves = {}


function backBtn() {
    const backBtnElem = document.getElementById('back-btn')
    const calculateBtn = document.getElementById('calculate-btn')

    backBtnElem.style.display = 'none'
    calculateBtn.style.display = 'none'
    chooseAchievesDiv.style.display = 'none'
    chooseVuzDiv.style.display = 'block'

    for (let achieve in allAchieves) {
        delete allAchieves[achieve]
    }
}


function chooseVuz(vuzNameRus, vuzNameEng) {
    const backBtnElem = document.getElementById('back-btn')
    const calculateBtn = document.getElementById('calculate-btn')
    const h3 = document.getElementById('vuz-name-h3')

    chooseVuzDiv.style.display = 'none'
    chooseAchievesDiv.style.display = 'block'
    h3.innerHTML = vuzNameRus
    engNameVuz = vuzNameEng
    rusNameVuz = vuzNameRus
    backBtnElem.style.display = 'block'
    calculateBtn.style.display = 'block'
    getAchievesFromVuz(vuzNameEng)
}


function getAchievesFromVuz(vuzNameEng) {
    $.ajax({
        url: '/get_achieves_from_vuz/',
        type: 'post',
        data: {
            'vuz_name': vuzNameEng
        },
        success: function(response) {
            contentBds = document.getElementById('content_bds')
            contentBds.innerHTML = ''
            contentBds.innerHTML = response
        },
        error: function() {
            // alert(0)
        }
    })
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


function command(eventId, nameCommand) {
    const addBtn = document.getElementById(`add${eventId}`)
    const addingPanel = document.getElementById(`choose-delete${eventId}`)
    const selectAchieve = document.getElementById(`select-achieve${eventId}`).value

    nameCommand == 'add' ? addCommand(eventId, addBtn, addingPanel, selectAchieve) : 
        removeCommand(eventId, addBtn, addingPanel, selectAchieve)
}


function addCommand(eventId, addBtn, addingPanel, selectAchieve) {
    addBtn.style.display = 'none'
    addingPanel.style.display = 'flex'
    allAchieves[eventId] = selectAchieve
}


function removeCommand(eventId, addBtn, addingPanel, selectAchieve) {
    addingPanel.style.display = 'none'
    addBtn.style.display = 'block'
    delete allAchieves[eventId]
}


function editStatus(eventId) {
    const selectAchieve = document.getElementById(`select-achieve${eventId}`).value
    allAchieves[eventId] = selectAchieve
}


function backToListFunc() {
    const backToList = document.getElementById('back-to-list')
    const backBtnElem = document.getElementById('back-btn')
    const calculateBtn = document.getElementById('calculate-btn')

    backToList.style.display = 'none'
    caclulatedInfoDiv.style.display = 'none'
    chooseAchievesDiv.style.display = 'block'
    backBtnElem.style.display = 'block'
    calculateBtn.style.display = 'block'
}


function calculate() {
    $.ajax({
        url: '/calculate/',
        type: 'post',
        data: {
            'eng_name_vuz': engNameVuz,
            'all_chosen_achieves': JSON.stringify(allAchieves)
        },
        success: function(response) {
            const contentBds = document.getElementById('content_bds_calculated')
            const backToList = document.getElementById('back-to-list')
            const backBtnElem = document.getElementById('back-btn')
            const calculateBtn = document.getElementById('calculate-btn')
            const h3 = document.getElementById('vuz-name-h3-calculated')

            backBtnElem.style.display = 'none'
            backToList.style.display = 'block'
            calculateBtn.style.display = 'none'
            h3.innerHTML = rusNameVuz
            contentBds.innerHTML = ''
            contentBds.innerHTML = response
            chooseAchievesDiv.style.display = 'none'
            caclulatedInfoDiv.style.display = 'block'
        },
        error: function() {
            // alert(0)
        }
    })
}
