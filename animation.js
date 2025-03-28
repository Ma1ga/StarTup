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
