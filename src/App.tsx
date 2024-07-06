import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App