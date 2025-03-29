<?php

$data = json_decode(file_get_contents("php://input"), true);


if (!empty($data)) {
    $info = $data['info'];
    $price = $data['price'];

    
    $textMessage = "Новый заказ:\товар: $info\nЦена: $price";

    $token = "7604038856:AAH0C6SaqQqGcPp61ScrrggJ64KShbnuIbo";
    $chat_id = "1137697786";

    
    $textMessage = urlencode($textMessage);

    $urlQuery = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chat_id . "&text=" . $textMessage;

    $result = file_get_contents($urlQuery);

    echo $result;
} else {
    echo "Данные не получены";
}
?>