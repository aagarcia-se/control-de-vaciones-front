import { useState } from 'react'
import SignIn from './pages/login/login'
import Panel from './pages/panel/panel'
import { Route, Routes } from 'react-router-dom'
import DocumentForm from './pages/empleado/dpiForm'
import InforPersonalForm from './pages/empleado/infoPersonalForm'
import FamiliaresForm from './pages/empleado/FamiliaresForm'
import NivelEducativoForm from './pages/empleado/nivelEducativoFomr'
import DatosGeneralesForm from './pages/empleado/DatosGeneralesForm'
import EmpleadoNuevoForm from './pages/empleado/EmpleadoNuevoForm'
import { ReporteEmpleado } from './pages/empleadosReporte/reporteEmpleados'
import ContactsPage from './pages/empleadosProfile/Profile/ContactPage'




function App() {

  return (

    <Routes>
      <Route path='/' element={ <SignIn />} />
      <Route path='/panel' element={ <Panel />} />
      <Route path='/ingresar-nuevo-empleado' element={ <DocumentForm/> }/>
      <Route path='/ingresar-infoPersonal' element={ <InforPersonalForm/> }/>
      <Route path='/familiares' element={ <FamiliaresForm/> }/>
      <Route path='/nivel-educativo' element={ <NivelEducativoForm/> }/>
      <Route path='/datos-generales' element={ <DatosGeneralesForm/> }/>
      <Route path='/nuevo-empleado' element={ <EmpleadoNuevoForm/> }/>
      <Route path='/lista-de-empleados' element={ <ReporteEmpleado/> }/>
      <Route path='/employee-profile' element={ <ContactsPage/> }/>
      
    </Routes>
  )
}

export default App
