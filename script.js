const url = 'http://localhost:3000/notes';
const form = document.querySelector('#note-form');
const input2 = document.querySelector('#note-text');
const input = document.querySelector('#title-text');
const outputDiv = document.getElementById('container');
let clearOutput = false;
let formIsValid;

function listNotes() {
  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      for (note of data) {
        const noteCard = document.createElement('div');
        console.log(note.body);
        noteCard.classList.add('note');
        outputDiv.appendChild(noteCard);
        renderNote(noteCard, note);
      }
    });
}

function renderNote(noteItem, note) {
  noteItem.innerHTML = `<div class="noteCard"><div class="title"> ${note.title}</div><div class="body"> ${note.body}</div><div class="button-cont"><button
  id="delete-note"
  type="delete"
>Delete</button></div></div>`;
}

listNotes();
// makes button work
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const titleText = document.getElementById('title-text').value;
  const noteText = document.getElementById('note-text').value;
  console.log(titleText, noteText);
  form.reset();
  createNote(titleText, noteText);
});

function createNote(titleText, noteText) {
  // I am making a POST request so that I can add
  // a new todo to my database.
  fetch(url, {
    // I need to send some extra information with this request
    // specifically i am sending the value of my input on the DOM
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titleText,
      body: noteText,
      // here I am creating a new key and using moment().format()
      // to create a time string that captures when the new todo was created
      create_at: moment().format(),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// function renderNote(noteObj) {
//     const itemEl = document.createElement('li')
//     itemEl.id = todoObj.id
//     itemEl.classList.add(
//       // These strings are TACHYONS class names
//       'lh-copy',
//       'pv3',
//       'ba',
//       'bl-0',
//       'bt-0',
//       'br-0',
//       'b--dotted',
//       'b--black-3')

//     renderTodoText(itemEl, todoObj)
//     console.log(itemEl)
//     todoList.appendChild(itemEl)
//   }

// This function is taking two arguments: a todo <li> a todo object.

// function renderTodoText (todoListItem, todoObj) {
//     todoListItem.innerHTML = `<span class="dib w-60">${todoObj.body}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
//   }
