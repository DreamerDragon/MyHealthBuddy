let showMenu = false;

const menuBtn = document.querySelector(".menu-btn");
const menuBtnBurger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");


const toggleMenu = () => {
    if (!showMenu) {
        menuBtnBurger.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItems.forEach(item => {
            item.classList.add('open');
        })
    } else {
        menuBtnBurger.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItems.forEach(item => {
            item.classList.remove('open');
        })
    }
    showMenu = !showMenu
}

menuBtn.addEventListener('click', toggleMenu)