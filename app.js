const addBookBtn = document.getElementById("addBookBtn");

let library = [];

addBookBtn.addEventListener("click", addBookFromForm);

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  library.push(newBook);
  addBooksToTable();
}
function addBookFromForm(e) {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = parseInt(document.getElementById("pages").value);
  let isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  // resets form values to orginal placeholders
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("isRead").checked = false;
}

function addBooksToTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  // Clear the existing content in the table body

  for (let i = 0; i < library.length; i += 1) {
    const book = library[i];

    if (!book.title.trim() || !book.author.trim()) {
      continue; // Skip adding books with empty title or author
    }

    const bookRow = document.createElement("tr");

    // Create table cells for book details
    const bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;

    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    tableBody.appendChild(bookRow);
  }
}
