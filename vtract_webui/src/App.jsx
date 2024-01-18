import { Browser } from './constants'
import { Home, CheckIn, CheckOut  } from './pages'
import store from './store/store'

import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>    
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path={Browser.HOME} element={<Home/>}></Route>
        <Route path={Browser.CHECKIN} element={<CheckIn/>}></Route>
        <Route path={Browser.CHECKOUT} element={<CheckOut/>}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
