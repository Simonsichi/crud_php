<?php
// Include database configuration
include 'db/config.php';

// Set the content type to JSON for the API response
header("Content-Type: application/json");

// Get the HTTP method (GET, POST, PUT, DELETE)
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Handle the different request methods (CRUD operations)
switch ($requestMethod) {
    case 'GET':
        // Read all books or a single book by ID
        if (isset($_GET['id'])) {
            // Fetch a single book by ID
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM books WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $books = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($books);
        } else {
            // Fetch all books
            $result = $conn->query("SELECT * FROM books");
            $books = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($books);
        }
        break;

    case 'POST':
        // Add a new book (Create)
        $input = json_decode(file_get_contents('php://input'), true);
        $title = $input['title'];
        $author = $input['author'];
        $price = $input['price'];
        $stmt = $conn->prepare("INSERT INTO books (title, author, price) VALUES (?, ?, ?)");
        $stmt->bind_param("ssd", $title, $author, $price);
        $stmt->execute();
        echo json_encode(["message" => "Book added successfully"]);
        break;

    case 'PUT':
        // Update an existing book by ID
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        $title = $input['title'];
        $author = $input['author'];
        $price = $input['price'];
        $stmt = $conn->prepare("UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?");
        $stmt->bind_param("ssdi", $title, $author, $price, $id);
        $stmt->execute();
        echo json_encode(["message" => "Book updated successfully"]);
        break;

    case 'DELETE':
        // Delete a book by ID
        $id = intval($_GET['id']);
        $stmt = $conn->prepare("DELETE FROM books WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(["message" => "Book deleted successfully"]);
        break;

    default:
        // Handle invalid request method
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

// Close the database connection
$conn->close();
?>
