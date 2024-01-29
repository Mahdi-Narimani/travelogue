import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Homepage = lazy(() => import("./pages/Homepage"))
const Login = lazy(() => import("./pages/Login"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import('./pages/Pricing'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import("./pages/AppLayout"))

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";

import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from './components/City'
import Form from './components/Form'


const App = () =>
{
  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>

            <Route index element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />

            <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to='cities' replace/>} />
              <Route path="countries" element={<CountryList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App