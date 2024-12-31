import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/login/login';
import Panel from './pages/Empleados-Admin/panel/panel';

// Rutas módulo administrativo
import DocumentForm from './pages/Empleados-Admin/empleado/dpiForm';
import InforPersonalForm from './pages/Empleados-Admin/empleado/infoPersonalForm';
import FamiliaresForm from './pages/Empleados-Admin/empleado/FamiliaresForm';
import NivelEducativoForm from './pages/Empleados-Admin/empleado/nivelEducativoFomr';
import DatosGeneralesForm from './pages/Empleados-Admin/empleado/DatosGeneralesForm';
import EmpleadoNuevoForm from './pages/Empleados-Admin/empleado/EmpleadoNuevoForm';
import { ReporteEmpleado } from './pages/Empleados-Admin/empleadosReporte/reporteEmpleados';
import { ReporteVacacionesEmpleados } from './pages/Empleados-Admin/Vacaciones-Reports/Reporte-Vacaciones-Empleados';
import SuspensionesPage from './pages/Empleados-Admin/Suspensiones.Page';

// Rutas módulo de empleados
import ContactsPage from './pages/empleadosProfile/Profile/ContactPage';
import HomePage from './pages/empleadosProfile/home/home';
import FamilyPage from './pages/empleadosProfile/family/FamilyPage';
import ProfetionalPage from './pages/empleadosProfile/inforamacionProfesional/ProfetionalPage';
import GeneralInfoPage from './pages/empleadosProfile/InformacionGeneral/GeneralInfo';
import EmployeePage from './pages/empleadosProfile/employeePage/employeePage';
import VacationApp from './pages/empleadosProfile/Vacations/VacationPage';
import ProgramarVacacionesPage from './pages/empleadosProfile/Vacations/ProgramarVacacionesPage';
import SolicitudesPage from './pages/empleadosProfile/Vacations/SolcitudesPage';

// Rutas Generales
import './styles/App.css'; // Actualiza la ruta según la ubicación del archivo CSS
import ProtectedRoute from './components/ProtectRoute/ProtectedRoute';

function App() {


  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path='/' element={<SignIn />} />

      {/* Rutas protegidas del módulo administrativo */}
      <Route element={  <ProtectedRoute allowedRoles={[1, 3]} />}>
        <Route path='/panel' element={ <Panel />} />
        <Route path='/ingresar-nuevo-empleado' element={ <DocumentForm/> }/>
        <Route path='/ingresar-infoPersonal' element={ <InforPersonalForm/> }/>
        <Route path='/familiares' element={ <FamiliaresForm/> }/>
        <Route path='/nivel-educativo' element={ <NivelEducativoForm/> }/>
        <Route path='/datos-generales' element={ <DatosGeneralesForm/> }/>
        <Route path='/nuevo-empleado' element={ <EmpleadoNuevoForm/> }/>
        <Route path='/lista-de-empleados' element={ <ReporteEmpleado/> }/>
        <Route path='/vacaciones-empleados' element={ <ReporteVacacionesEmpleados/> }/>
        <Route path='/suspensiones' element={ <SuspensionesPage/> }/>
      </Route>

      {/* Rutas protegidas del módulo de empleados */}
      <Route element={ <ProtectedRoute allowedRoles={[1, 3, 4, 5]}/>}>
        <Route path='/empleados/home' element={ <HomePage/> }/>
        <Route path='/empleados/infoPersonal' element={ <ContactsPage/> }/>
        <Route path='/empleados/family' element={ <FamilyPage/> }/>
        <Route path='/empleados/informacion-profesional' element={ <ProfetionalPage/> }/>
        <Route path='/empleados/informacion-General' element={ <GeneralInfoPage/> }/>
        <Route path='/empleados/informacion-laboral' element={ <EmployeePage/> }/>
        <Route path='/empleados/programar-vacaciones' element={ <VacationApp/> }/>
        <Route path='/empleados/programar-fecha' element={ <ProgramarVacacionesPage/> }/>
      </Route>

      {/* Rutas protegidas para uso exclusivo de coordinadores */}
      <Route element={<ProtectedRoute allowedRoles={[5]}/>}>
        <Route path='/empleados/solicitudes' element={ <SolicitudesPage/> }/>
      </Route>

    </Routes>




  );
}

export default App;
