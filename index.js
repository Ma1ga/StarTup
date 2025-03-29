const image = document.getElementById("three-click");
const orderCallButton = document.getElementById("order-call");
const callPopup = document.querySelector(".call-popup");
const closePopupButton = document.querySelector(".close-popup");
const captchaActive = document.getElementById("captcha-active");
const captcha = document.querySelector(".captcha");
const popupDresser = document.getElementById("hair-dresser");
const readMorePopup = document.getElementById("readMorePopup");
const readMoreButton = document.getElementById("readMoreA");
const confirmDataPopup = document.getElementById("confirmationPopup");
const confirmDataPopupButton = document.getElementById("confirm-buttom");
const  cardPopup = document.getElementById("card");
let activeCircle = null;
let offsetX, offsetY;
let dropZone = document.getElementById("dropZone");
let submitBtn = document.getElementById("submitBtn");
let popupName = document.getElementById("name-popup");
let callForm = document.getElementById("callForm");
let homeArrow = document.getElementById("home-arrow");
let index = 0;
let viewButton = document.getElementById("viewButton");
let blackBackground = document.querySelector(".black-fonts")

const quotes = [
    {
        text: "Having placeat facere possimus, omnis voluptas assumenda est, omnis dolor.",
        author: "John Doe, Google Inc.",
        image: ["img/Citat1.png",]
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

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) { 
        navbar.classList.add('fixed-top');
    } else {
        navbar.classList.remove('fixed-top');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const items = Array.from(carousel.children);
    let visibleCount = getVisibleCount();
    let isAnimating = false; 

    document.getElementById('next').addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        const firstItem = items.shift();
        items.push(firstItem);
        animateCarousel(1);
    });

    document.getElementById('prev').addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        const lastItem = items.pop();
        items.unshift(lastItem);
        animateCarousel(-1);
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


circle.addEventListener("mousedown", function (event) {
    event.preventDefault();
    startDrag(event);
});
document.addEventListener("mousemove", function (event) {
    moveCircle(event);
});
document.addEventListener("mouseup", function () {
    endDrag();
});

circle.addEventListener("touchstart", function (event) {
    event.preventDefault();
    startDrag(event.touches[0]);
});
document.addEventListener("touchmove", function (event) {
    moveCircle(event.touches[0]);
});
document.addEventListener("touchend", function () {
    endDrag();
});


function startDrag(event) {
    activeCircle = circle;
    offsetX = event.clientX - circle.getBoundingClientRect().left;
    offsetY = event.clientY - circle.getBoundingClientRect().top;
}

function moveCircle(event) {
    if (!activeCircle) return;

    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;

    activeCircle.style.position = "absolute";
    activeCircle.style.left = `${x}px`;
    activeCircle.style.top = `${y}px`;
}


function endDrag() {
    if (!activeCircle) return;

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

    activeCircle = null;
}


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
    localStorage.setItem("isRegistered", "true"); 

    console.log("Данные сохранены:", nameValue, phoneNumber);

    document.getElementById("order-call").style.display = "none";
    closePopup("popup");

    const homeArrow = document.getElementById("home-arrow");
    if (homeArrow) {
        homeArrow.innerHTML = `WELCOME TO ${nameValue}`;
    }

    document.getElementById("logout-btn").style.display = "block";
});

function validate(phoneNumber) {
    const numberValid = /^\+38(\(0\d{2}\)|0\d{2})\d{2,3}-?\d{2}-?\d{2,3}$/;
    return numberValid.test(phoneNumber);
}

document.addEventListener("DOMContentLoaded", function () {
    let savedName = localStorage.getItem("userName");
    let savedPhone = localStorage.getItem("userPhone");
    let isRegistered = localStorage.getItem("isRegistered");

    if (isRegistered === "true") {
        document.getElementById("order-call").style.display = "none";
        document.getElementById("logout-btn").style.display = "block"; 
    }

    if (savedName) {
        document.getElementById("name-popup").value = savedName;
        document.getElementById("home-arrow").innerHTML = `WELCOME TO ${savedName}`;
    }

    if (savedPhone) {
        document.getElementById("tel").value = savedPhone;
    }
});

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        blackBackground.style.display ="none"
        popup.style.display = "none";
        isPopup = false

    }
}

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("isRegistered");

    document.getElementById("order-call").style.display = "inline-block";
    document.getElementById("logout-btn").style.display = "none";

    document.getElementById("home-arrow").innerHTML = "WELCOME TO STARTUP";
});


let isPopup = false;

function showPopup() {
    callPopup.style.display = "block"
    blackBackground.style.display ="block";
    isPopup = true;
  }
  
  function hidePopup() {
    callPopup.style.display = "none"
    blackBackground.style.display ="none"
    isPopup = false;
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

//   callPopup.addEventListener("click", (event) => {
//     if (event.target === callPopup) {
//         hidePopup()
//     }
//   })

window.addEventListener("click", (event) => {  
    setTimeout(() => {
        if (isPopup && !callPopup.contains(event.target) && orderCallButton.contains(event.target)) {
            
            isPopup = false;
            console.log("Попап закрыт при клике вне его Call");
        }
    }); 
});


window.addEventListener("click", (event) => {  
    setTimeout(() => {
        if (isPopup && !confirmDataPopup.contains(event.target) && confirmDataPopupButton.contains(event.target)) {
            
            isPopup = false;
            console.log("Попап закрыт при клике вне его qwje");
        }
    }, ); 
}, 1000);
blackBackground.addEventListener("click", () => {
    closePopup('popup');
    closePopup('confirmationPopup');
    
    isPopup = true;
    console.log("Попап закрыт по затемнению");
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
    isPopup = true
    blackBackground.style.display = "block";
}

// function closePopup(popupId) {
//     const popup = document.getElementById(popupId);
//     if (popup) {
//         popup.style.display = "none";
//     } else {
//         console.error("Попап с ID " + popupId + " не найден!");
//     }
// }



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
confirmDataPopupButton.addEventListener("click", showPopup);
captchaActive.addEventListener("click", showCaptcha)

// document.addEventListener("mousemove", (event) =>{
//     console.log(event)
    
// });
