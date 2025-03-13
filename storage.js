
const form = document.getElementById('contactForm');
const popup = document.getElementById('confirmationPopup')
const confirmButton = document.getElementById('confirmButton');
const rejectButton = document.getElementById('rejectButton')

function showPopup() {
    document.getElementById('popupName').textContent = document.getElementById('name').value;
    document.getElementById('popupEmail').textContent = document.getElementById('email').value
    document.getElementById('popupSubject').textContent = document.getElementById('subject').value
    document.getElementById('popupCompany').textContent = document.getElementById('company').value
    document.getElementById('popupMessage').textContent = document.getElementById('message').value

    popup.style.display = 'block'
}

function saveData() {
    localStorage.name = document.getElementById('name').value
    localStorage.email = document.getElementById('email').value
    localStorage.subject = document.getElementById('subject').value
    localStorage.company = document.getElementById('company').value
    localStorage.message = document.getElementById('message').value

    alert('данные сохранились')
}


function loadData() {
    document.getElementById('name').value = localStorage.name ;
    document.getElementById('email').value = localStorage.email ;
    document.getElementById('subject').value = localStorage.subject ;
    document.getElementById('company').value = localStorage.company ;
    document.getElementById('message').value = localStorage.message ;
}


form.addEventListener('submit', function (e) {
    e.preventDefault(); 
    showPopup(); 
});

confirmButton.addEventListener('click', function () {
    saveData(); 
    popup.style.display = 'none'; 
});

rejectButton.addEventListener('click', function () {
    popup.style.display = 'none';
});

loadData()