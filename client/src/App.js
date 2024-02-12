import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";
import { ChatContextProvider } from "./Context/chatContext";
import { useContext } from "react";
import { Context } from "./Context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App-is">
      <ChatContextProvider user={user}>
        <Header />
        <Outlet />
        <Footer />
      </ChatContextProvider>
    </div>
  );
}

export default App;
