const hamburger = document.querySelector('.menu')
const navLinks = document.querySelector('.nav-links')
const navLink = document.querySelectorAll('.nav-links a')
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle('nav-active')
    setTimeout(() => {
        navLink.forEach((el) => {
            el.classList.toggle('show')
        })
    }, 300);
})

if (Cookies.get('response')) {
    let navEl = document.querySelector('#nav-self-evaluation')
    navEl.textContent = "Evaluation Results"
    navEl.href = "results.html"
    let footerEl = document.querySelector('#footer-self-evaluation')
    footerEl.textContent = "Evaluation Results"
    footerEl.href = "results.html"
}