const chooseVuzDiv = document.getElementById('choose-vuz')
const chooseAchievesDiv = document.getElementById('choose-achieves')

function backBtn() {
    chooseAchievesDiv.style.display = 'none'
    chooseVuzDiv.style.display = 'block'
}


function chooseVuz(vuzNameRus, vuzNameEng) {
    h3 = document.getElementById('vuz-name-h3')
    chooseVuzDiv.style.display = 'none'
    chooseAchievesDiv.style.display = 'block'
    h3.innerHTML = vuzNameRus
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
            document.getElementById('content_bds').innerHTML = response
        },
        error: function() {
            // alert(1)
        }
    })
}
