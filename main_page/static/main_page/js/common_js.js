document.getElementById('user-button').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display == 'none') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});
