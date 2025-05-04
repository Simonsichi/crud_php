<?php
// db/config.php

$host = "localhost";
$user = "root"; // default user for XAMPP
$password = ""; // no password by default
$database = "bookstore_db";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
