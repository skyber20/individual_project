const icon = document.getElementById('theme-icon')
let currentTheme = localStorage.getItem('theme') || 'light'
setTheme(currentTheme)

icon.addEventListener('click', function() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(currentTheme)
});

function setTheme(theme) {
    const bodyClassList = document.body.classList
    bodyClassList.remove('light-theme', 'dark-theme')
    bodyClassList.add(theme + '-theme')
    
    icon.className = theme === 'light' ? 'fas fa-moon theme-icon' : 'fas fa-sun theme-icon'
    localStorage.setItem('theme', theme)
}
