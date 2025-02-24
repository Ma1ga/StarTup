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
    console.log("Значение инпута:", nameValue, phoneNumber);
    if (homeArrow) {
        homeArrow.innerHTML = `WELCOME TO ${nameValue}`;
    } else {
        console.error("Элемент #homeArrow не найден!");
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

function validate() {
    const numberValid = /^\+38(\(0\d{2}\)|0\d{2})\d{2,3}-?\d{2}-?\d{2,3}$/;
    const phoneNumber = document.getElementById("tel").value;
    if (numberValid.test(phoneNumber)) {
        return "Валидный номер"; 
    } else {
        return "Невалидный номер"; 
    }
}


orderCallButton.addEventListener("click", showPopup) 
captchaActive.addEventListener("click", showCaptcha)

// document.addEventListener("mousemove", (event) =>{
//     console.log(event)
    
// });
