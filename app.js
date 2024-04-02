// variables
const noteTitle = document.querySelector("#note-title");
const noteText = document.querySelector("#note-text");
const addNoteButton = document.querySelector("#add-note-btn");
const notesList = document.querySelector("#notes-list");
const notes = [];

// adding a note
addNoteButton.addEventListener("click", () => {
  const note = new Note();
  notes.push(note);
  AddNoteToUI(note);
  ViewNote(note.id);
});

class Note {
  constructor() {
    this.title = "Untitled";
    this.note = null;
    this.id = this.#CreateID();
    this.createdAtDate = this.#GetCurrentDateAndTime();
    this.updatedAtDate = null;
  }

  #CreateID() {
    return Math.random().toString(36).substr(2, 9);
  }

  #GetCurrentDateAndTime() {
    return new Date().toLocaleString();
  }

  UpdateOnDateChange() {
    this.updatedAtDate = this.#GetCurrentDateAndTime();
  }
}

/**
 *
 * @param {Note} note
 */
function AddNoteToUI(note) {
  const li = document.createElement("li");
  li.textContent = note.title;

  notesList.appendChild(li);
}

/**
 * @param {string} id - The id of the note to be viewed
 */
function ViewNote(id) {
  const note = notes.find((note) => note.id === id);
  noteText.value = note.note;
  noteTitle.textContent = note.title;
}
