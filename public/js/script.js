let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar')

menu.onclick = () => {
    if (list.classList.contains('open')) {
        select.click(); 
    }
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

let select = document.querySelector(".select")
let list = document.querySelector(".list")

select.onclick = () => { 
    if (navbar.classList.contains('open')) { 
        menu.click(); 
    }
    list.classList.toggle('open');
}