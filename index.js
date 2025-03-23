const image = document.getElementById("three-click");
const orderCallButton = document.getElementById("order-call");
const callPopup = document.querySelector(".call-popup");
const closePopupButton = document.querySelector(".close-popup");
const captchaActive = document.getElementById("captcha-active");
const captcha = document.querySelector(".captcha");
let activeCircle = null;
let offsetX, offsetY;
let dropZone = document.getElementById("dropZone");
let submitBtn = document.getElementById("submitBtn");
let popupName = document.getElementById("name-popup");
let callForm = document.getElementById("callForm");
let homeArrow = document.getElementById("home-arrow");
let index = 0;
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const dots = document.querySelectorAll(".dot");
let interval;

const quotes = [
    { text: "Having placeat facere possimus, omnis voluptas assumenda est, omnis dolor.", author: "John Doe, Google Inc." },
    { text: "Another great quote about teamwork and success.", author: "Jane Smith, Facebook" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs, Apple" }
];
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const items = Array.from(carousel.children);
    let visibleCount = getVisibleCount();

    document.getElementById('next').addEventListener('click', function () {
        const firstItem = items.shift(); // Убираем первый элемент
        items.push(firstItem); // Добавляем его в конец
        updateCarousel();
    });

    document.getElementById('prev').addEventListener('click', function () {
        const lastItem = items.pop(); // Убираем последний элемент
        items.unshift(lastItem); // Добавляем его в начало
        updateCarousel();
    });

    function updateCarousel() {
        carousel.innerHTML = ''; // Очищаем карусель
        items.forEach(item => carousel.appendChild(item)); // Перерисовываем элементы
    }

    function getVisibleCount() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 992) return 3;
        return 4;
    }

    window.addEventListener('resize', function () {
        visibleCount = getVisibleCount();
        updateCarousel();
    });
});


function setQuote(i) {
    index = i;
    quoteText.textContent = quotes[i].text;
    quoteAuthor.textContent = quotes[i].author;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
}

function nextQuote() {
    index = (index + 1) % quotes.length;
    setQuote(index);
}

function startSlider() {
    interval = setInterval(nextQuote, 3000);
}

window.addEventListener('scroll', function () {
    let parallax = document.querySelector('.main-paralax');
    let scrollPosition = window.scrollY;
    
    parallax.style.backgroundPositionY = -(scrollPosition * 0.1) + 'px';
});


document.querySelector(".slider-footer").addEventListener("mouseenter", () => clearInterval(interval));
document.querySelector(".slider-footer").addEventListener("mouseleave", startSlider);

startSlider();


document.getElementById("circle").onmousedown = function (e) {
    activeCircle = e.target;
    offsetX = e.clientX - activeCircle.offsetLeft;
    offsetY = e.clientY - activeCircle.offsetTop;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
};

function onMouseMove(e) {
    if (activeCircle) {
        activeCircle.style.left = `${e.clientX - offsetX}px`;
        activeCircle.style.top = `${e.clientY - offsetY}px`;
    }
}


function onMouseUp() {
    if (activeCircle) {
        let circleRect = activeCircle.getBoundingClientRect();
        let dropRect = dropZone.getBoundingClientRect();

        
        if (
            circleRect.left >= dropRect.left &&
            circleRect.top >= dropRect.top &&
            circleRect.right <= dropRect.right &&
            circleRect.bottom <= dropRect.bottom
        ) {
            activeCircle.style.left = `${dropZone.offsetLeft + 25}px`;
            activeCircle.style.top = `${dropZone.offsetTop + 25}px`;
            submitBtn.removeAttribute("disabled");
            
        }

        document.onmousemove = null;
        document.onmouseup = null;
        activeCircle = null;
    }
}
document.getElementById("callForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    let nameValue = document.getElementById("name-popup").value;
    const phoneNumber = document.getElementById("tel").value;
    
    if (!validate(phoneNumber)) {
        console.log("Невалидный номер");
        return;
    }

    console.log("Значение инпута:", nameValue, phoneNumber);
    
    if (homeArrow) {
        homeArrow.innerHTML = `WELCOME TO ${nameValue}`;
    } else {
        console.error("Элемент #homeArrow не найден!");
    }
});

function validate(phoneNumber) {
    const numberValid = /^\+38(\(0\d{2}\)|0\d{2})\d{2,3}-?\d{2}-?\d{2,3}$/;
    return numberValid.test(phoneNumber);
}


document.querySelectorAll(".three-click").forEach(image => {
    image.addEventListener("click", function(event) {
        if (event.detail === 3) {
            this.style.transition = "transform 0.5s ease";
            this.style.transform = "rotate(360deg)";

            setTimeout(() => {
                this.style.transform = "rotate(0deg)";
            }, 500);
        }
    });
});// тройной кликер ))))
function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}


function showPopup() {
    callPopup.style.display = "block"
  }
  
  function hidePopup() {
    callPopup.style.display = "none"
  }
  function showCaptcha() {
    captcha.style.display = "block"
  }
  
  function hideCaptcha() {
    captcha.style.display = "none"
  }
  captcha.addEventListener("click", (event) => {
    if (event.target === captcha) {
        hideCaptcha()
    }
  })
  callPopup.addEventListener("click", (event) => {
    if (event.target === callPopup) {
        hidePopup()
    }
  })

  document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll(".work-list a");
    const items = document.querySelectorAll(".work-item");
    
    filters.forEach(filter => {
        filter.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.id;
            
            filters.forEach(f => f.classList.remove("active"));
            this.classList.add("active");
            
            items.forEach(item => {
                if (category === "all" || item.dataset.category.includes(category)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
            
            localStorage.setItem("selectedCategory", category);
        });
    });

    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
        document.getElementById(savedCategory)?.click();
    }
});



orderCallButton.addEventListener("click", showPopup) 
captchaActive.addEventListener("click", showCaptcha)

// document.addEventListener("mousemove", (event) =>{
//     console.log(event)
    
// });
