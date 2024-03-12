<?php
$host = "localhost"; 
$database = "yahavlv_MTABOOT";
$username = "yahavlv_BOOT";
$password = "MtaMta2024";
$tagsTable = "Tags"; 

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get tag details from the POST request
$tagName = $_POST['newTag'];
$tagFolder = $_POST['tagid'];

echo $tagName;
echo $tagFolder;


// Insert document details into the tags table
$sqlInsertDocument = "INSERT INTO $tagsTable (TagName,TagFolder) VALUES ('$tagName', '$tagFolder')";
if ($conn->query($sqlInsertDocument) === TRUE) {
    echo "New tag saved successfully";
} else {
    echo "Error: " . $sqlInsertDocument . "<br>" . $conn->error;
}


// Close statement and connection
$conn->close();
?>
