<?php
$newTag = isset($_POST['newTag']) ? $_POST['newTag'] : 'default_value'; // Replace 'default_value' as needed

// Replace with your desired file name and file URL
$name = 'blank.pdf';
$url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
$path = $newTag;


$apiUrl = 'https://api1.docalysis.com/api/v1/files/create';
$apiKey = 'ajdr37e6b7bjkywc6pkuzgnuwqgodhtu';

$data = [
    'name' => $name,
    'path' => $path,
    'url' => $url,
];

$ch = curl_init($apiUrl);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
]);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
}

curl_close($ch);

echo $response;
?>
