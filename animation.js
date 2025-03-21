document.addEventListener("DOMContentLoaded", function () {
    const animatedItems = document.querySelectorAll(".animation"); // Находим все элементы с анимацией

    function checkVisibility() {
        animatedItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top; // Верхняя граница элемента
            const screenHeight = window.innerHeight; // Высота экрана

            if (itemPosition < screenHeight * 0.8) { // Если элемент попал в зону видимости
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
