
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

    // Create tr element
    const row = document.createElement('tr');
   
    row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td> <a href = "#" class = "delete" > X </td>
    `;

    
    list.appendChild(row);

    }

    showAlert(message, className){
        // Create div
        const div = document.createElement('div')
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // get Parent
        const container = document.querySelector('.container')
        // Get form
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div, form);

        // TimeOut after 3 secs
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }


    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = ' ';
        document.getElementById('author').value = ' ';
        document.getElementById('isbn').value = ' ';
    }
}

// Local Storage class
class Store {

    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null ){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book)
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(){

    }
}

// DOM load event

document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event Listeners 

document.querySelector('#book-form').addEventListener('submit', function(e){

    // get form values

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value


    // Instantiate book
    const book  = new Book(title, author, isbn)

    
    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === ''|| author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error')
    } else {

        // Add book to list
        ui.addBookToList(book);

        // Add to local storage
        Store.addBook(book)

        // Show Success
        ui.showAlert('Book Added', 'success')

        // Clear Field
        ui.clearFields();

    }

    e.preventDefault();  // prevents page from any action


})


// Event listener for Delete
document.getElementById('book-list').addEventListener('click', function(e){

    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book removed!', 'success')

    e.preventDefault();
})