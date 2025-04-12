/*----------- links.js -----------

Loads saved notes from localStorage and saves updates as the user types.*/

export function initNotes () {
    // Load notes Local Storage
    const notesArea = document.getElementById('notes-area');
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
      notesArea.value = savedNotes;
    }
  
    // Save notes while user types
    notesArea.addEventListener('input', () => {
      localStorage.setItem('userNotes', notesArea.value);
    });
}
  