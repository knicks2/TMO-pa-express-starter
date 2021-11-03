const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).send("Don't panic.");
});

app.post("/api/books", (req, res) => {
  res.status(201).json(postBooks(req.body));
});

app.get("/api/books", (req, res) => {
  res.status(200).json(getBooks());
});

app.delete("/api/books", (req, res) => {
  deleteBooks();
  res.status(204).end();
});

module.exports = app;

var booksLibrary = [];
var size = 0;

function postBooks(body) {
  book = Object.assign({"id": size+1}, body);
  booksLibrary.push(book);
  size++;
  return booksLibrary[size-1];
}

function getBooks() {
  booksLibrary.sort( (a, b) => {
    if (a["title"] < b["title"]) {
      return -1;
    }
    if (a["title"] > b["title"]) {
      return 1;
    }
    return 0;
  });
  return {"books": booksLibrary};
}

function deleteBooks() {
  booksLibrary = [];
  size = 0;
}