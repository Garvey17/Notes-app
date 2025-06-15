
import { useEffect, useState } from "react";
import NotesApp from "./components/NotesApp";
import { NoteContextProvider } from "./contexts/NoteContexts";
import { ThemeProvider } from "./contexts/ThemeContext";




function App() {


 
  return (
    <ThemeProvider>
    <NoteContextProvider>
      <NotesApp/>
    </NoteContextProvider>
    </ThemeProvider>
  );
}

export default App;