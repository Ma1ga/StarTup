
const form = document.getElementById('contactForm');
const popup = document.getElementById('confirmationPopup')
const confirmButton = document.getElementById('confirmButton');
const rejectButton = document.getElementById('rejectButton')
document.addEventListener("DOMContentLoaded", function () {
    const categoryLinks = document.querySelectorAll(".work-list a");
    const workItems = document.querySelectorAll(".work-item");

    function filterWorks(category) {
        workItems.forEach(item => {
            const itemCategoryAttr = item.getAttribute("data-category") || ""; 
            const itemCategories = itemCategoryAttr.trim() ? itemCategoryAttr.split(" ") : [];

            if (category === "all" || itemCategories.includes(category)) {
                item.closest(".col-md-4").style.display = "block";
            } else {
                item.closest(".col-md-4").style.display = "none";
            }
        });
    }

    function updateActiveClass(activeCategory) {
        categoryLinks.forEach(link => {
            link.classList.toggle("active", link.id === activeCategory);
        });
    }

    const savedCategory = localStorage.getItem("selectedCategory") || "all";
    updateActiveClass(savedCategory);
    filterWorks(savedCategory);

    categoryLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const selectedCategory = this.id;

            localStorage.setItem("selectedCategory", selectedCategory);
            updateActiveClass(selectedCategory);
            filterWorks(selectedCategory);
        });
    });
});

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