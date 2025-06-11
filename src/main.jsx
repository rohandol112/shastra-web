import React from "react"
import ReactDOM from "react-dom/client"
import {
  createRoutesFromChildren,
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom"

import MainLayout from "./components/MainLayout"
import Home from "./pages/Home"
import Team from "./pages/Team"
import Events from "./pages/Events"
import Learn from "./pages/Learn"
import Contact from "./pages/Contact"
import URLNotFound, { ErrorElement } from "./pages/URLNotFound"

import "./index.css"

const router = createBrowserRouter(createRoutesFromChildren(
    <Route path="/" element={<MainLayout />} errorElement={<ErrorElement />} >
      <Route index element={<Home />} />
      <Route path="team" element={<Team />} />
      <Route path="events" element={<Events />} /> 
      <Route path="learn" element={<Learn />} />
      <Route path="contact" element={<Contact />} />

      <Route path="*" element={<URLNotFound /> } />
    </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
