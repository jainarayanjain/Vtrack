import { Browser } from './constants'
import { Home, CheckIn, CheckOut, PhotoInteraction, Visitors, EmployeeVisitor, ServiceProvider, AppointmentForm  } from './pages'
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
        <Route path={Browser.PHOTOINTERACTION} element={<PhotoInteraction/>}></Route>
        <Route path={Browser.VISITORTYPE} element={<Visitors/>}></Route>
        <Route path={Browser.EMPLOYEEVISITOR} element={<EmployeeVisitor/>}></Route>
        <Route path={Browser.SERVICEPROVIDER} element={<ServiceProvider/>}></Route>
        <Route path={Browser.APPOINTMENTVISITOR} element={<AppointmentForm/>}></Route>

      </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
