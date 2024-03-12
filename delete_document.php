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

// Get document ID from the POST request
$docId = $_POST['docId'];

// Delete the document from the "Documents" table
$sqlDeleteDocument = "DELETE FROM Documents WHERE DocId = ?";
$stmt = $conn->prepare($sqlDeleteDocument);

if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}

$stmt->bind_param("s", $docId);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Document deleted successfully";
} else {
    echo "Error deleting document";
}

// Close the prepared statement
$stmt->close();

// Close the database connection
$conn->close();
?>