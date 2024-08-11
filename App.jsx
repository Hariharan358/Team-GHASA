
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, HomeLayout, Landing, Login, Logout, Register } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import{CandidateList,Candidate} from"./pages";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "thanks",
        element: <thanks/>
      },
      {
        path: "voterslist",
        element: <CandidateList />
      },
      {
        path: "voters",
        element: <Candidate />
      },
      
     
      

    ],
  },
]);

function App() {
  
  

  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App
