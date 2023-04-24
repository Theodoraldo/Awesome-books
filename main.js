const title = document.querySelector('.title');
const author = document.querySelector('.author');
const form = document.querySelector('form');
const displayBooks = document.querySelector('.container');
const message = document.querySelector('span');
// Is localStorage Empty
if (localStorage.getItem('Book List') === null) {
  localStorage.setItem('Book List', JSON.stringify([]));
}
// Data Storage into localStorage
const dataStore = JSON.parse(localStorage.getItem('Book List'));
// localStorage data update
function updateData() {
  localStorage.setItem('Book List', JSON.stringify(dataStore));
}
// Create data row
function createBooks(items) {
  let books = '';
  for (let i = 0; i < items.length; i += 1) {
    books += `
      <p>${items[i].title}</p>
      <p>${items[i].author}</p>
      <button onclick='removeitem(${i})'>Remove</button>
      <hr />
    `;
  }
  return books;
}
// Fetching data from localStorage
function fetchData() {
  displayBooks.innerHTML = `
    <ul>
      ${createBooks(dataStore)}
    </ul>
  `;
}
// Adding new data to localStorage
function newData(bookTitle, bookAuthor) {
  const Books = {
    title: bookTitle,
    author: bookAuthor,
  };
  dataStore.push(Books);
  updateData();
  fetchData();
}

// Removing  data from localStorage
function removeitem(index) {
  dataStore.splice(index, 1);
  updateData();
  fetchData();
}
removeitem(1000);

// Getting stored data from localStorage
form.onsubmit = (e) => {
  if (title.value === '') {
    message.innerHTML = 'Please enter title of book';
    e.preventDefault();
  } else if (author.value === '') {
    message.innerHTML = 'Please enter author of book';
    e.preventDefault();
  } else {
    newData(title.value, author.value);
  }
};
window.onload = fetchData();