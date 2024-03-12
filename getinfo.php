<?php

$apiUrl = "https://api1.docalysis.com/api/v1/files/hvyv64/info";
$apiKey = "ajdr37e6b7bjkywc6pkuzgnuwqgodhtu";

$ch = curl_init($apiUrl);

$headers = array(
    'Authorization: Bearer ' . $apiKey
);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Use true for production

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($httpCode == 200) {
        echo $response;
    } else {
        echo 'HTTP error: ' . $httpCode;
    }
}

curl_close($ch);
?>
