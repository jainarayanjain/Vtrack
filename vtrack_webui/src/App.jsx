import { Browser } from "./constants";
import {
  Home,
  CheckIn,
  CheckOut,
  PhotoInteraction,
  Visitors,
  EmployeeForm,
  ServiceProvider,
  AppointmentForm,
  NIDForm,
  HostDetailsForm,
  Login,
  ApprovalPage,
  Myform,
  IdCard,
} from "./pages";

// import store from "./store/store";
import { store, persistor } from "./store/store";

import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path={Browser.HOME} element={<Home />}></Route>
              <Route path={Browser.HOSTDETAIL} element={<HostDetailsForm />}></Route>
              <Route path={Browser.CHECKIN} element={<CheckIn />}></Route>
              <Route path={Browser.CHECKOUT} element={<CheckOut />}></Route>
              <Route path={Browser.PHOTOINTERACTION} element={<PhotoInteraction />}></Route>
              <Route path={Browser.VISITORTYPE} element={<Visitors />}></Route>
              <Route path={Browser.EMPLOYEEVISITOR} element={<EmployeeForm />}></Route>
              <Route path={Browser.SERVICEPROVIDER} element={<ServiceProvider />}></Route>
              <Route path={Browser.APPOINTMENTVISITOR} element={<AppointmentForm />}></Route>
              <Route path={Browser.NIDTYPE} element={<NIDForm />}></Route>
              <Route path={Browser.LOGIN} element={<Login />}></Route>
              <Route path={Browser.APPROVAL} element={<ApprovalPage />}></Route>
              <Route path={Browser.IDCARD} element={<IdCard />}></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer limit={1} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
