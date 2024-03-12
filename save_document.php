<?php
$host = "localhost"; // Change this if your MySQL database is hosted on a different server
$database = "yahavlv_MTABOOT";
$username = "yahavlv_BOOT";
$password = "MtaMta2024";
$documentsTable = "Documents";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get document details from the POST request
$docId = $_POST['docId'];
$documentName = $_POST['documentName'];
$tags = $_POST['tags']; 

// Insert document details into the Documents table
$sqlInsertDocument = "INSERT INTO $documentsTable (DocId, DocName, DocTag) VALUES ('$docId', '$documentName', '$tags')";
if ($conn->query($sqlInsertDocument) === TRUE) {
    echo "Document details saved successfully";
} else {
    echo "Error: " . $sqlInsertDocument . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>
