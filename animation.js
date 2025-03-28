document.addEventListener("DOMContentLoaded", function () {
    const animatedItems = document.querySelectorAll(".animation");

    function checkVisibility() {
        animatedItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top; 
            const screenHeight = window.innerHeight; 

            if (itemPosition < screenHeight * 0.8) { 
                item.classList.remove("slide-left", "slide-right"); // Убираем классы анимации
                item.style.transition = "transform 0.8s ease, opacity 0.8s ease"; // Добавляем плавный эффект
                item.style.transform = "translateX(0) scale(1)"; // Возвращаем в исходное положение
                item.style.opacity = "1"; // Делаем видимыми
            }
        });
    }

    window.addEventListener("scroll", checkVisibility); // Запускаем при скролле
    checkVisibility(); // Проверяем сразу, если блок уже виден
});




document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 992) { // Закрывать только на мобильных экранах
                navbarToggler.classList.add("collapsed"); // Визуально свернуть кнопку
                navbarCollapse.classList.remove("show"); // Закрыть меню
            }
        });
    });
});
