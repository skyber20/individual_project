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
        },
        error: function() {
            // alert(0) 
        }
    })
}