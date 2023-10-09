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

  // Resets form values to orginal placeholders
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("isRead").checked = false;
}

function addBooksToTable() {
  const tableBody = document.getElementById("table-body");
  // Clear the existing content in the table body. My understanding is that because we keep creating elements, the data attributes or div sizes keep getting larger and makes the spaceing unequal. I included this because it works, not because my logic says it works.
  tableBody.innerHTML = "";

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
    const bookPages = document.createElement("td");
    bookPages.textContent = book.pages;

    // Status for read or not
    const bookStatus = document.createElement("td");
    const statusSymbol = document.createElement("i");
    statusSymbol.classList.add("fa");
    if (book.isRead === false) {
      statusSymbol.classList.add("fa-times");
    } else {
      statusSymbol.classList.add("fa-check");
    }
    bookStatus.appendChild(statusSymbol);

    // Remove book row icon
    const trashRow = document.createElement("td");
    const trashSymbol = document.createElement("i");
    trashSymbol.classList.add("fa", "fa-trash");
    trashRow.appendChild(trashSymbol);

    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    bookRow.appendChild(bookPages);
    bookRow.appendChild(bookStatus);
    bookRow.appendChild(trashRow);
    tableBody.appendChild(bookRow);
  }
}
function updateIsRead(bookindex) {
  library[bookindex].isRead = !library[bookindex].isRead;
}
// Event listen for status click
const table = document.getElementById("books-list");

// Add an event listener to the table to handle clicks on the status symbols
table.addEventListener("click", function (e) {
  const clickedElement = e.target;
  const row = clickedElement.closest("tr");
  const rowIndex = row.rowIndex - 1;

  // Check if the clicked element is an <i> element with the "fa" class
  if (
    clickedElement.tagName === "I" &&
    clickedElement.classList.contains("fa")
  ) {
    // Toggle the class for the clicked element to change the icon
    if (clickedElement.classList.contains("fa-check")) {
      clickedElement.classList.remove("fa-check");
      clickedElement.classList.add("fa-times");
      updateIsRead(rowIndex); // change isRead value to false
    } else if (clickedElement.classList.contains("fa-times")) {
      clickedElement.classList.remove("fa-times");
      clickedElement.classList.add("fa-check");
      updateIsRead(rowIndex); // change isRead value to true
    } else if (clickedElement.classList.contains("fa-trash")) {
      library.splice(rowIndex, 1);
      row.remove();
    }
  }
});
