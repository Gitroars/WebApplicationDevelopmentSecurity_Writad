import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";
import Footer from "./components/Footer";
import { PriceScreen } from "./screens/PriceScreen";
import ReadScreen from "./screens/ReadScreen";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/books' element={<BooksScreen />}></Route>
            <Route path='/vip' element={<PriceScreen />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
