import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";
import BasketScreen from "./screens/BasketScreen";
import Footer from "./components/Footer";
import BookScreen from "./screens/BookScreen";
import LoginScreen from "./screens/LoginScreen";
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/books' element={<BooksScreen />}></Route>
            <Route path='/book/:id' element={<BookScreen />}></Route>
            <Route path='/basket' element={<BasketScreen />}></Route>
            <Route path='/login' element={<LoginScreen />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
