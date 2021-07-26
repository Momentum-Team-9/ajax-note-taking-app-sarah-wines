const url = 'http://localhost:3000/notes';
const form = document.querySelector('#note-form');
const input2 = document.querySelector('#note-text');
const input = document.querySelector('#title-text');
const outputDiv = document.getElementById('container');
let clearOutput = false;
let formIsValid;
let noteCardCont = document.querySelectorAll('noteCardCont');
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
  noteItem.innerHTML = `<form class="noteCardCont"><div class="noteCard"><div class="title"> ${note.title}</div><div class="body"> ${note.body}</div><div class="button-cont">
  <button class="edit-note"
  type="edit"
>Edit</button></div><div class="button-cont"><button
  class="delete-note"
  type="delete"
>Delete</button></div></div></form>`;
}

listNotes();
// makes button work
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const titleText = document.getElementById('title-text').value;
  const noteText = document.getElementById('note-text').value;
  form.reset();
  createNote(titleText, noteText);
});

function createNote(titleText, noteText) {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titleText,
      body: noteText,
      create_at: moment().format(),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

noteCardCont.addEventListener('click', function (event) {
  console.log('delete');
  deleteNote(event.target);
});

function deleteNote(element) {
  const noteId = element.parentElement.id;
  fetch(`http://localhost:3000/notes` + '/' + `${noteId}`, {
    method: 'DELETE',
  }).then(() => element.parentElement.remove());
}
