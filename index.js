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
const quotes = [
    {
        text: "Having placeat facere possimus, omnis voluptas assumenda est, omnis dolor.",
        author: "John Doe, Google Inc.",
        image: "img/Citat1.png"
    },
    {
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
        author: "Jane Smith, Microsoft",
        image: "img/Citat2.png"
    },
    {
        text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        author: "Elon Musk, Tesla",
        image: "img/Citat3.png"
    }
];

let interval;

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteImage = document.querySelector(".clients-logo"); 
const dots = document.querySelectorAll(".dot");

function setQuote(i) {
    index = i;
    quoteText.textContent = quotes[i].text;
    quoteAuthor.textContent = quotes[i].author;
    quoteImage.src = quotes[i].image; 

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

document.querySelector(".slider-footer").addEventListener("mouseenter", () => clearInterval(interval));
document.querySelector(".slider-footer").addEventListener("mouseleave", startSlider);

startSlider();

document.addEventListener('DOMContentLoaded', function () {
    const popups = document.querySelectorAll('.popup');

    window.openPopup = function (id) {
        document.getElementById(id).style.display = 'block';
    };

    document.addEventListener('click', function (event) {
        popups.forEach(popup => {
            const isInsidePopup = popup.contains(event.target); 
            const isPopupTrigger = event.target.closest('.parent-a'); 

            if (!isInsidePopup && !isPopupTrigger) {
                popup.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.popup-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function () {
            this.closest('.popup').style.display = 'none';
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const items = Array.from(carousel.children);
    let visibleCount = getVisibleCount();
    let isAnimating = false; // Флаг для предотвращения спама кликов

    document.getElementById('next').addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        const firstItem = items.shift();
        items.push(firstItem);
        animateCarousel(-1);
    });

    document.getElementById('prev').addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        const lastItem = items.pop();
        items.unshift(lastItem);
        animateCarousel(1);
    });

    function animateCarousel(direction) {
        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = `translateX(${direction * -100 / visibleCount}%)`;

        setTimeout(() => {
            carousel.style.transition = "none";
            carousel.style.transform = "translateX(0)";
            updateCarousel();
            isAnimating = false;
        }, 500);
    }

    function updateCarousel() {
        carousel.innerHTML = '';
        items.forEach(item => carousel.appendChild(item));
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




window.addEventListener('scroll', function () {
    let parallax = document.querySelector('.main-paralax');
    let scrollPosition = window.scrollY;
    
    parallax.style.backgroundPositionY = -(scrollPosition * 0.1) + 'px';
});
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

    localStorage.setItem("userName", nameValue);
    localStorage.setItem("userPhone", phoneNumber);

    console.log("Данные сохранены:", nameValue, phoneNumber);

    const homeArrow = document.getElementById("home-arrow");
    if (homeArrow) {
        homeArrow.innerHTML = `WELCOME TO ${nameValue}`;
    } else {
        console.error("Элемент #home-arrow не найден!");
    }
});

function validate(phoneNumber) {
    const numberValid = /^\+38(\(0\d{2}\)|0\d{2})\d{2,3}-?\d{2}-?\d{2,3}$/;
    return numberValid.test(phoneNumber);
}

document.addEventListener("DOMContentLoaded", function () {
    let savedName = localStorage.getItem("userName");
    let savedPhone = localStorage.getItem("userPhone");

    if (savedName) {
        document.getElementById("name-popup").value = savedName;
        document.getElementById("home-arrow").innerHTML = `WELCOME TO ${savedName}`;
    }

    if (savedPhone) {
        document.getElementById("tel").value = savedPhone;
    }
});



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
