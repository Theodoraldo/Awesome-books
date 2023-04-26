const title = document.querySelector('.title');
const author = document.querySelector('.author');
const form = document.querySelector('form');
const displayBooks = document.querySelector('.container');
const addForm = document.querySelector('.add-form');
const listList = document.querySelector('.list-list');
const contactInfo = document.querySelector('.contact-info');
const message = document.querySelector('span');
const selectLi = document.querySelector('.menu__items');

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
      <div class='displayRow'>
        <ul>
          <li>"${items[i].title}" by ${items[i].author}</li>
        </ul>
        <button class='remove' onclick='NewBooks.removeitem(${i})'>Remove</button>
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
  }

  static removeitem(index) {
    dataStore.splice(index, 1);
    updateData();
    fetchData();
  }
}

// Getting stored data from localStorage
form.onsubmit = (e) => {
  e.preventDefault();
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
    title.value = '';
    author.value = '';
    message.innerHTML = '';
  }
};

selectLi.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'List') {
    fetchData();
    addForm.style.display = 'none';
    contactInfo.style.display = 'none';
    listList.style.display = 'block';
  }
  if (e.target.innerHTML === 'Add New') {
    addForm.style.display = 'block';
    contactInfo.style.display = 'none';
    listList.style.display = 'none';
  }
  if (e.target.innerHTML === 'Contact') {
    addForm.style.display = 'none';
    contactInfo.style.display = 'block';
    listList.style.display = 'none';
  }
});

document.querySelector('body').onload = fetchData();