const image = document.getElementById("three-click");

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


// document.addEventListener("mousemove", (event) =>{
//     console.log(event)
    
// });
