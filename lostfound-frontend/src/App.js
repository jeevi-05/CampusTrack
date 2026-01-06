import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterPage from "./Components/LoginComponent/RegisterPage";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import LostItemEntry from "./Components/ItemComponent/LostItemEntry";
import LostItemReport from "./Components/ItemComponent/LostItemReport";
import FoundItemReport from "./Components/ItemComponent/FoundItemReport";
import FoundItemEntry from "./Components/ItemComponent/FoundItemEntry";
import ManagePosts from "./Components/ItemComponent/ManagePosts";
import StudentList from "./Components/LoginComponent/StudentList";
import ChatMessage from "./Components/MessageComponent/ChatMessage";
import MatchedItemList from "./Components/ItemComponent/MatchedItemList";

// Component to wrap Routes and scroll to top on route change
const ScrollWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top whenever the route changes
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollWrapper>
        <Routes>
          {/* No Navbar */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />

          {/* Pages with Navbar */}
          <Route path="/AdminMenu" element={<AdminMenu />} />
          <Route path="/StudentMenu" element={<StudentMenu />} />
          <Route path="/lost-entry" element={<LostItemEntry />} />
          <Route path="/lost-report" element={<LostItemReport />} />
          <Route path="/found-report" element={<FoundItemReport />} />
          <Route path="/found-entry" element={<FoundItemEntry />} />
          <Route path="/post-report" element={<ManagePosts />} />
          <Route path="/chat-msg" element={<ChatMessage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/matched-items" element={<MatchedItemList />} />
        </Routes>
      </ScrollWrapper>
    </BrowserRouter>
  );
}

export default App;
