
<?php
$data = $_POST;
$file = $_FILES['screenshot'];

if (!empty($data)) {
    $info = $data['info'];
    $price = $data['price'];

    $textMessage = " Новый заказ:\n$info\n Общая сумма: $price$";

    $token = "7604038856:AAH0C6SaqQqGcPp61ScrrggJ64KShbnuIbo";
    $chat_id = "1137697786";

    $textUrl = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($textMessage);
    file_get_contents($textUrl);

    if ($file && $file['tmp_name']) {
        $post = [
            'chat_id' => $chat_id,
            'photo' => new CURLFile($file['tmp_name'], $file['type'], $file['name']),
            'caption' => "Скриншот заказа"
        ];

        $ch = curl_init("https://api.telegram.org/bot$token/sendPhoto");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
    }

    echo "OK";
} else {
    echo "Данные не получены";
}
?>
