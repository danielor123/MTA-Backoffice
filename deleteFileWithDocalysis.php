<?php

// Get document ID from the POST request
$fileId = $_POST['docId'];
deleteFileWithDocalysis($fileId);

function deleteFileWithDocalysis($fileId) {
    $apiUrl = "https://api1.docalysis.com/api/v1/files/" . $fileId . "/delete";
    $apiKey = "ajdr37e6b7bjkywc6pkuzgnuwqgodhtu"; 

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: Bearer " . $apiKey,
    ));
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}
?>
