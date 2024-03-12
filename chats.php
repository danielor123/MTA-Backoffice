<?php

$apiUrl = "https://api1.docalysis.com/api/v1/files/hz2mr6/chat";
$apiKey = "ajdr37e6b7bjkywc6pkuzgnuwqgodhtu";

$ch = curl_init($apiUrl);

$headers = array(
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
);

$data = array(
    'message' => "what the documents about?"
);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
}

curl_close($ch);

echo $response;
?>
