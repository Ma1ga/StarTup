
function sendOrderToTelegram(productName, price) {
    const data = {
        info: productName, 
        price: price       
    };

    fetch("send.php", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        console.log("Сообщение отправлено:", result);
    })
    .catch(error => {
        console.error("Ошибка:", error);
    });
}


