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
}
function addBookFromForm(e) {
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
  e.preventDefault(); //prevents form from submitting.
}
