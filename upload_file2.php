<?php
$target_dir = "FILES/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$selectedTag = isset($_POST['selectedTag']) ? $_POST['selectedTag'] : ''; // Retrieve the selected tag
$uploadOk = 1;

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 50000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
if($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $response = ['success' => true, 'message' => "The file has been uploaded."];
        // Make API call
        uploadToAPI($target_file,$selectedTag);
    } else {
        $response = ['success' => false, 'message' => "Sorry, there was an error uploading your file."];
    }
}

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
        echo 'Curl error: ' . curl_error($curl);
    }

    curl_close($curl);
    echo $response;
}
?>
