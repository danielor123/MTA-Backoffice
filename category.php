<?php
$host = "localhost"; 
$database = "yahavlv_MTABOOT";
$username = "yahavlv_BOOT";
$password = "MtaMta2024";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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
// Close the connection
$conn->close();
?>