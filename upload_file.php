<?php
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$selectedTag = isset($_POST['selectedTag']) ? $_POST['selectedTag'] : ''; // Retrieve the selected tag
uploadToAPI($target_file,$selectedTag);


function uploadToAPI($filePath,$selectedTag) {
    $endpoint = 'https://api1.docalysis.com/api/v1/files/create';
    $headers = [
        'Authorization: ajdr37e6b7bjkywc6pkuzgnuwqgodhtu'
    ];
    $form_data = [
        'name' => basename($filePath),
        'path' => $selectedTag
    ];

    $curl = curl_init($endpoint);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

    $cfile = new CURLFile(realpath($filePath)); 
    $post_fields = ['file' => $cfile];
    foreach ($form_data as $key => $value) {
        $post_fields[$key] = $value;
    }

    curl_setopt($curl, CURLOPT_POSTFIELDS, $post_fields);

    $response = curl_exec($curl);
    if (curl_errno($curl)) {
        echo 'Curl error number: ' . curl_errno($curl) . '<br>';
        echo 'Curl error: ' . curl_error($curl);
        $error = ['error' => 'Curl error: ' . curl_error($curl)];
        echo json_encode($error);
    } else {
        echo $response; 
    }

    curl_close($curl);
    //echo $response;
}
?>
