import { createContext, useState, useEffect } from "react";

export const NoteContext = createContext();

export const NoteContextProvider = ({ children }) => {


  const [notes, setNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('notes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes(prev => [...prev, { ...note, id: Date.now().toString() }]);
  };

  const updateNote = (id, newText) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, note: newText } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const toggleComplete = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const changeNoteColor = (id, color) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, color } : note
    ));
  };

  return (
    <NoteContext.Provider 
      value={{ 
        notes, 
        addNote, 
        updateNote, 
        deleteNote, 
        toggleComplete, 
        changeNoteColor 
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};