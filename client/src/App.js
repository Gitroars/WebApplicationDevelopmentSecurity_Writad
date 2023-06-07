import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksScreen from "./screens/BooksScreen";
import BasketScreen from "./screens/BasketScreen";
import Footer from "./components/Footer";
import BookScreen from "./screens/BookScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import UserOrdersScreen from "./screens/UserOrdersScreen";
import AdminConsoleScreen from "./screens/AdminConsoleScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ReadScreen from "./screens/ReadScreen";
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<BooksScreen />}></Route>
            <Route path='/books' element={<BooksScreen />}></Route>
            <Route path='/book/:id' element={<BookScreen />}></Route>
            <Route path='/basket' element={<BasketScreen />}></Route>
            <Route path='/login' element={<LoginScreen />}></Route>
            <Route path='/registration' element={<RegistrationScreen />}></Route>
            <Route path='/profile' element={<ProfileScreen />}></Route>
            <Route path='/checkout' element={<CheckoutScreen />}></Route>
            <Route path='/order-success' element={<OrderSuccessScreen />}></Route>
            <Route path='/your-orders' element={<UserOrdersScreen />}></Route>
            <Route path='/admin-console' element={<AdminConsoleScreen />}></Route>
            <Route path='/library' element={<LibraryScreen />}></Route>
            <Route path='/book/:id/chapter' element={<ReadScreen />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
