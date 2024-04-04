import logo from "./logo.svg";
import "./App.css";
import MyNav from "./Components/MyNav";
import MyFooter from "./Components/MyFooter";
import AllTheBooks from "./Components/AllTheBooks";
import ContextProvider from "./Context/ContextProvider";
import { useEffect, useState } from "react";
import NotFound from "./Components/NotFound";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

// Questo è il modo corretto per importare un file: non utilizzare il percorso relativo al tuo computer come hai fatto te,
// ma relativo al progetto
import fantasy from "./JSON/fantasy.json";
import history from "./JSON/history.json";
import horror from "./JSON/horror.json";
import romance from "./JSON/romance.json";
import scifi from "./JSON/scifi.json";

import "./Components/AllTheBooks.css"
import SingleBook from "./Components/SingleBook";
import BookDetails from "./Components/BookDetails";


function App() {
  // Inizializzo una variabile che conterrò tutte le categorie selezionate dall'utente attraverso il tick delle caselle
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Inizializzo una variabile che conterrà la lista di tutti i libri di diverse categorie
  const [allBooks, setAllBooks] = useState([]);

  // Inizializzo una varaibile che conterrà la lista di tutti i libri filtrati per categoria
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Questa funzione combinerà tutti i libri in un'unica lista, salvata nella variabile allBooks
  const combineBooks = () => {
    // Andiamo a "spalmare" il contenuto di tutti i json dentro un'unica lista (array)
    const combinedBooks = [
      ...fantasy,
      ...history,
      ...horror,
      ...romance,
      ...scifi,
    ];

    // Salviamo l'array di tutti i libri dentro ad allBooks
    setAllBooks(combinedBooks);
  };

  // inizializzo una variabile che conterrà il testo cercato
  const [searchedText, setSearchedText] = useState([]);
  const handleSearchedText = (e) => {    
    const value = e.target.value;
    setSearchedText(value);
    console.log(searchedText);
  }

  // Gestisci il tick della categoria
  const handleCategoryChange = (e) => {
    // Prendiamo dall'oggetto e.target, i due valori "value" e "checked"
    const { value, checked} = e.target;

    // Se il box è "checkato" (ticked)
    if (checked) {
      // Aggiungiamo la categoria alla lista delle categorie attive
      setSelectedCategories([...selectedCategories, value]);
    } else {
      // Il box non è "checkato"
      // Rimuoviamo la categoria dalla lista delle categorie attive
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  // Appena il componente viene montato, uniamo tutta la lista dei libri di diverse categorie dentro a allBooks
  useEffect(() => {
    combineBooks();
  }, []);

  // Quando viene checkato un box dall'utente (selectedCategories cambia), aggiorniamo la lista dei libri filtrati per categoria
  useEffect(() => {
    const filteredBooks = allBooks.filter((book) =>
      selectedCategories.includes(book.category) && book.title.includes(searchedText)
    );
    setFilteredBooks(filteredBooks);
  }, [selectedCategories, searchedText]);



  return (
    <ContextProvider>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<><MyNav handleCheck={handleCategoryChange} setText={handleSearchedText}/><AllTheBooks allBooks={filteredBooks} getText={searchedText}/></>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route exact path="/BookDetails/:asin" element={<BookDetails/>}/>
      </Routes>
      
      </BrowserRouter>
   
    </ContextProvider>
  );
}

export default App;
