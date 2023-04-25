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

function createBooks(items) {
  let books = '';
  for (let i = 0; i < items.length; i += 1) {
    books += `
      <div class="displayRow">
        <ul>
          <li>${items[i].title} by ${items[i].author}</li>
        </ul>
        <button onclick='Removed.removeitem(${i})'>Remove</button>
      </div>
      <hr/>
      `;
  }
  return books;
}

// Fetching data from localStorage
function fetchData() {
  displayBooks.innerHTML = `
      ${createBooks(dataStore)}
  `;
}

// Adding new data to localStorage using
class NewBooks {
  constructor(BookTitle, BookAuthor) {
    this.btitle = BookTitle;
    this.bauthor = BookAuthor;
  }

  newData() {
    const Books = {
      title: this.btitle,
      author: this.bauthor,
    };
    dataStore.push(Books);
    updateData();
    fetchData();
  }
}

// Removing  data from localStorage using class
class Removed {
  static removeitem(index) {
    dataStore.splice(index, 1);
    updateData();
    fetchData();
  }
}

// Getting stored data from localStorage
form.onsubmit = (e) => {
  if (title.value === '') {
    message.innerHTML = 'Please enter title of book';
    message.style.color = 'red';
    message.style.fontWeight = 'bold';
    e.preventDefault();
  } else if (author.value === '') {
    message.innerHTML = 'Please enter author of book';
    message.style.color = 'red';
    message.style.fontWeight = 'bold';
    e.preventDefault();
  } else {
    const myBook = new NewBooks(title.value, author.value);
    myBook.newData();
  }
};

window.onload = fetchData();
