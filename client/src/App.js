import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route
              path='/books'
              element={<BooksScreen />}
            ></Route>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
