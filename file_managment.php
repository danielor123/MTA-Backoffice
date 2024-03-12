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

// Fetch documents from the "Documents" table based on the selected tag
if ($selectedTag) {
    $query = "SELECT DocId, DocName, DocTag FROM Documents WHERE DocTag = ?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param("s", $selectedTag);
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

    // Close the prepared statement
    $stmt->close();
} else {
    // If no tag is provided, return an error response
    echo json_encode(['error' => 'No tag provided']);
}

// Close the database connection
$conn->close();
?>