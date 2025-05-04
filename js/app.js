async function fetchBooks() {
    try {
        const response = await fetch('api.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const books = await response.json();
        console.log('Fetched Books:', books); // Debugging line
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        if (Array.isArray(books) && books.length > 0) {
            books.forEach(book => {
                console.log('Book:', book); // Debugging line
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';
                bookItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Price:</strong> $${book.price.toFixed(2)}</p>
                `;
                bookList.appendChild(bookItem);
            });
        } else {
            bookList.innerHTML = '<p>No books found.</p>';
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        document.getElementById('book-list').innerHTML = '<p>Error loading books.</p>';
    }
}

async function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, price })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        alert(result.message);
        fetchBooks();
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Failed to add book.');
    }
}

async function updateBook() {
    const id = document.getElementById('update-id').value;
    const title = document.getElementById('update-title').value;
    const author = document.getElementById('update-author').value;
    const price = document.getElementById('update-price').value;

    try {
        const response = await fetch(`api.php?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, price })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        alert(result.message);
        fetchBooks();
    } catch (error) {
        console.error('Error updating book:', error);
        alert('Failed to update book.');
    }
}

async function deleteBook() {
    const id = document.getElementById('delete-id').value;

    try {
        const response = await fetch(`api.php?id=${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        alert(result.message);
        fetchBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book.');
    }
}
