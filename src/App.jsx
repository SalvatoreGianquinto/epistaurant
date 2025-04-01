//includere bootstrap e cancellare i css di Vite
import "bootstrap/dist/css/bootstrap.min.css"
import CustomNavbar from "./components/CustomNavbar"
import Home from "./components/Home"

function App() {
  return (
    <main>
      <CustomNavbar tema="dark" />
      <Home />
    </main>
  )
}

export default App
