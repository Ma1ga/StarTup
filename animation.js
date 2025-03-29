document.addEventListener("DOMContentLoaded", function () {
    const animatedItems = document.querySelectorAll(".animation");

    function checkVisibility() {
        animatedItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top; 
            const screenHeight = window.innerHeight; 

            if (itemPosition < screenHeight * 0.8) { 
                item.classList.remove("slide-left", "slide-right"); 
                item.style.transition = "transform 0.8s ease, opacity 0.8s ease"; 
                item.style.transform = "translateX(0) scale(1)"; 
                item.style.opacity = "1"; 
            }
        });
    }

    window.addEventListener("scroll", checkVisibility); 
    checkVisibility(); 
});
function toggleCart() {
    let cartPopup = document.getElementById("cart-popup");
    cartPopup.classList.toggle("open"); 
}


function toggleReadMore(link) {
    let extraContent = link.previousElementSibling; // Найти скрытый текст перед ссылкой
    
    if (extraContent.style.display === "none") {
        extraContent.style.display = "block";
        link.textContent = "Read less"; // Меняем текст ссылки
    } else {
        extraContent.style.display = "none";
        link.textContent = "Read more";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const mainParalax = document.querySelector(".main-paralax");
    const animations = document.querySelectorAll(".animation");

    function handleScroll() {
        let scrollY = window.scrollY;
        let offset = mainParalax.offsetTop;
        let height = mainParalax.offsetHeight;

        if (scrollY + window.innerHeight > offset) {
            let moveY = (scrollY - offset) * 0.001; 
            mainParalax.style.backgroundPositionY = `calc(50% + ${moveY}px)`;
        }

        animations.forEach((el) => {
            let rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.90) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 992) { 
                navbarToggler.classList.add("collapsed"); 
                navbarCollapse.classList.remove("show"); 
            }
        });
    });
});
