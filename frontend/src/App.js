import { BrowserRouter, Routes, Route} from 'react-router-dom'


// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ChimpTestPage from './pages/ChimpTestPage'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
                path="/ChimpTest"
                element={<ChimpTestPage />} />
            <Route
                path="/"
                element={<Home/>} />
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
