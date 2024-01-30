import { Browser } from './constants'
import { Home, CheckIn, CheckOut, PhotoInteraction, Visitors, EmployeeVisitor, ServiceProvider, AppointmentForm, NIDForm  } from './pages'
import store from './store/store'

import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
        <Route path={Browser.NIDTYPE} element={<NIDForm/>}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
