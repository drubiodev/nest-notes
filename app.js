// variables
const NoteWrapper = document.querySelector("main");
const noteTitle = document.getElementById("note-title");
const noteText = document.getElementById("note-text");
const addNoteButton = document.getElementById("add-note-btn");
const saveNoteButton = document.getElementById("save-note-btn");
const notesList = document.getElementById("notes-list");
const notes = JSON.parse(localStorage.getItem("notes")) || {};

// load notes from localStorage
for (const id in notes) {
  AddNoteToUI(notes[id]);
}

// // call api to get notes
// fetch("http://localhost:8000/notes", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     localStorage.setItem("notes", JSON.stringify(data));
//   })
//   .then(() => {
//     for (const id in notes) {
//       AddNoteToUI(notes[id]);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// adding a note
addNoteButton.addEventListener("click", () => {
  // create a note
  const note = new Note();
  // add note to the notes array
  notes[note.id] = note;
  // save notes to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
  // add note to the UI
  AddNoteToUI(note);
  // view the note
  ViewNote(note.id);

  // focus on the title and highlight the text
  noteTitle.focus();
  selectText(noteTitle);
});

function selectText(element) {
  var range = document.createRange(); // Create a range object
  range.selectNodeContents(element); // Set the range to the contents of the element
  var selection = window.getSelection(); // Get the current selection
  selection.removeAllRanges(); // Remove all ranges from the selection
  selection.addRange(range); // Add the range to the selection
}

// saving a note
saveNoteButton.addEventListener("click", () => {
  console.log("save note button clicked");
  // get id of the note
  const id = NoteWrapper.getAttribute("data-note-id");
  // get the note
  const note = new Note(notes[id]);
  // update the note
  note.title = noteTitle.textContent;
  note.content = noteText.innerText;

  note.Save();

  // save notes to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));
  // update the title div on the li
  const li = document.querySelector(`li[data-id="${id}"]`);
  li.querySelector("div").textContent = note.title;
});

// action buttons clicked
notesList.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON") {
    const parent = target.parentElement;
    const id = parent.getAttribute("data-id");
    const note = new Note(notes[id]);

    if (target.textContent === "View") {
      ViewNote(note.id);
    } else if (target.textContent === "Delete") {
      note.Delete();
      // save notes to localStorage
      localStorage.setItem("notes", JSON.stringify(notes));
      parent.remove();
    }
  }
});

/**
 * @class Note
 * @property {string} title - The title of the note
 * @property {string} content - The content of the note
 * @property {string} id - The id of the note
 * @property {string} createdAtDate - The date and time the note was created
 * @property {string} updatedAtDate - The date and time the note was last updated
 * @method UpdateOnDateChange - Updates the updatedAtDate property of the note
 */
class Note {
  constructor(noteData = {}) {
    this.title = noteData.title ?? "Untitled";
    this.content = noteData.content ?? "";
    this.id = noteData.id ?? this.#CreateID();
    this.createdAtDate =
      noteData.createdAtDate ?? this.#GetCurrentDateAndTime();
    this.updatedAtDate = noteData.updatedAtDate;
  }

  #CreateID() {
    return Math.random().toString(36).substring(2, 10);
  }

  #GetCurrentDateAndTime() {
    return new Date().toLocaleString();
  }

  #UpdateOnDateChange() {
    this.updatedAtDate = this.#GetCurrentDateAndTime();
  }

  Save() {
    notes[this.id] = this;
    this.#UpdateOnDateChange();
  }

  Delete() {
    delete notes[this.id];
  }
}

/**
 *
 * @param {Note} note
 */
function AddNoteToUI(note) {
  const li = document.createElement("li");
  // create div to place title
  const titleDiv = document.createElement("div");
  titleDiv.textContent = note.title;

  // add view button
  const viewButton = document.createElement("button");
  viewButton.textContent = "View";

  // add delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  li.setAttribute("data-id", note.id);
  li.appendChild(titleDiv);
  li.appendChild(viewButton);
  li.appendChild(deleteButton);

  notesList.appendChild(li);
}

/**
 * @param {string} id - The id of the note to be viewed
 */
function ViewNote(id) {
  const note = notes[id];
  noteText.innerText = note.content;
  noteTitle.textContent = note.title;
  NoteWrapper.setAttribute("data-note-id", note.id);
}

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", searchNotes);

function searchNotes() {
  const filterWords = new Set(
    searchInput.value
      .toUpperCase()
      .split(" ")
      .filter((word) => word.trim() !== "")
  );
  const ul = document.getElementById("notes-list");
  const li = Array.from(ul.getElementsByTagName("li"));

  // If search field is blank, display all list items
  if (searchInput.value.trim() === "") {
    li.forEach((item) => (item.style.display = ""));
    return;
  }

  const displayList = [];

  li.forEach((item) => {
    const id = item.getAttribute("data-id");
    const note = notes[id];
    const title = note.title.toUpperCase();
    const content = note.content ? note.content.toUpperCase() : "";
    const noteText = title + " " + content;

    if (Array.from(filterWords).some((word) => noteText.includes(word))) {
      displayList.push(item);
    }
  });

  li.forEach((item) => (item.style.display = "none"));
  displayList.forEach((item) => (item.style.display = ""));
}
