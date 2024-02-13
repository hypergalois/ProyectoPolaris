import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import NavBar from "./components/Navbar";

import HomePageLogin from "./pages/HomePageLogin";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProfilePage from "./pages/ProfilePage";
import ProjectFormPage from "./pages/ProjectFormPage";

import ProtectedRoute from "./ProtectedRoute";
import HomePageRegister from "./pages/HomePageRegister";

import HomePageBar from "./components/HomePageBar";
import HomePageLanding from "./components/HomePageLanding";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <main>
//           <HomePageBar />
//           <Routes>
//             {/* <Route path="/" element={<HomePageLogin />} /> */}
//             <Route path="/" element={<HomePageLanding/>} />
//             <Route path="/register" element={<HomePageRegister />} />
//             <Route element={<ProtectedRoute />}>
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/projects/new" element={<ProjectFormPage />} />
//             </Route>
//           </Routes>
//         </main>
//       </Router>
//     </AuthProvider>
//   )
// }

function App() {
  return (
    <AuthProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<HomePageLogin />} />
            <Route path="/register" element={<HomePageRegister />} />
            <Route path="/registerSecond" element={<HomePageRegisterSecond />} />
            {/* <Route path="/projects/new" element={<ProjectFormPage />} /> */}
            {/* <Route path="/projects/search" element={<ProjectSearchPage />}></Route> */}
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  )
}

export default App;
