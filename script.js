const menuIcon = document.getElementById("menu-icon");
const sideBar = document.querySelector(".sidebar");
menuIcon.addEventListener('click', () => {
    sideBar.classList.toggle('show-sidebar');
});