<?php
$host = "localhost";
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

// Get the selected tag from the GET request
$selectedTag = $_GET['tag'] ?? '';

// Prepare SQL query based on whether a tag is provided
$query = $selectedTag ? 
    "SELECT DocId, DocName, DocTag FROM Documents WHERE DocTag = ?" :
    "SELECT DocId, DocName, DocTag FROM Documents";

$stmt = $conn->prepare($query);

if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}

// Bind parameter if a tag is provided
if ($selectedTag) {
    $stmt->bind_param("s", $selectedTag);
}

$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    die("Error fetching documents: " . $conn->error);
}

// Convert the result set to an associative array
$documents = array();
while ($row = $result->fetch_assoc()) {
    $documents[] = $row;
}

// Send the JSON response to the client
header('Content-Type: application/json');
echo json_encode($documents);

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
?>
