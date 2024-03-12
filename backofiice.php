<?php
$host = "localhost"; // Change this if your MySQL database is hosted on a different server
$database = "yahavlv_MTABOOT";
$username = "yahavlv_BOOT";
$password = "MtaMta2024";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch existing tags
    $sql = "SELECT TagName FROM Tags";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $tags = array();
        while ($row = $result->fetch_assoc()) {
            $tags[] = $row["TagName"];
        }
        echo json_encode($tags);
    } else {
        echo "0 results";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle tag insertion
    $newTag = $_POST['newTag'];

    // Check if the tag already exists
    $checkExisting = "SELECT COUNT(*) AS count FROM Tags WHERE TagName = '$newTag'";
    $result = $conn->query($checkExisting);
    $row = $result->fetch_assoc();

    if ($row['count'] == 0) {
        // Tag doesn't exist, insert it
        $insertTag = "INSERT INTO Tags (TagName) VALUES ('$newTag')";
        if ($conn->query($insertTag) === TRUE) {
            echo "Tag added successfully";
        } else {
            echo "Error: " . $insertTag . "<br>" . $conn->error;
        }
    } else {
        // Tag already exists
        echo "Tag already exists";
    }
}

// Close the connection
$conn->close();
?>
