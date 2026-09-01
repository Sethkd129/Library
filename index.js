// ===== DATA =====
let myLibrary = [];

// ===== DOM REFERENCES =====
const libraryContainer = document.getElementById("library");
const newBookBtn = document.getElementById("new-book-bttn");
const bookForm = document.getElementById("book-form");
const bookDialog = document.getElementById("book-dialog");
const cancelBtn = document.getElementById("cancel");
const colorBox = document.getElementById("colorBox");
const title = document.getElementById("title");

libraryContainer.classList.add("library");
newBookBtn.classList.add("new-book-bttn");
colorBox.classList.add("colorBox");
title.classList.add("title");


const cb = document.createElement("div");
cb.textContent = "COLOR BOX!!!";
colorBox.appendChild(cb);
// original color
document.body.style.backgroundColor = "rgb(49, 50, 100)";


// ===== BOOK CONSTRUCTOR + PROTOTYPE =====
function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, pages: ${this.pages}, read: ${this.read ? "read" : "not read yet"}`;
};

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};



// ===== CORE LOGIC =====
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function removeFromLibrary(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    displayBooks();
}

function displayBooks() {
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("p");
        title.textContent = `Title: ${book.title}`;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement("p");
        pages.textContent = book.read ? "read" : "REAM ME PLEASE";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Kill This Book Huni";
        removeBtn.addEventListener("click", () => {
            removeFromLibrary(book.id);
        });

        const trb = document.createElement("button");
        trb.textContent = "Toggle Read";

        trb.addEventListener("click", () => {
            book.toggleRead()
            displayBooks();
        })

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeBtn);
        card.appendChild(trb);

        libraryContainer.appendChild(card);
    });
}

function changeColor() {
    const c1 = Math.floor(Math.random() * 256);
    const c2 = Math.floor(Math.random() * 256);
    const c3 = Math.floor(Math.random() * 256);

    const color = `rgb(${c1}, ${c2}, ${c3})`;
    const otherColor = `rgb(${c3}, ${c1}, ${c2})`;

    document.body.style.backgroundColor = color;
    colorBox.style.backgroundColor = otherColor;
}


// ===== EVENT LISTENERS =====
newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    bookForm.reset();
    bookDialog.close();
});

cancelBtn.addEventListener("click", () => {
    bookForm.reset();
    bookDialog.close();
});

colorBox.addEventListener("mouseover", changeColor);


// ===== INITIAL SETUP =====
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310);
addBookToLibrary("Dune", "Frank Herbert", 412);

displayBooks();