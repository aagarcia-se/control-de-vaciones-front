const endpoints = {
    login: '/login',
    getInfoPeresonal: '/obtenerInfoPersonal',
    getInfoDpi: '/infoDpi',
    GET_FAMILIARES: '/obtenerFamiliares',
    GET_NIVEL_ACADEMICO: 'getNivelEducativo',
    GET_DATOS_MEDIOS: '/obtenerDatosMedicos',
    GET_DATOS_SOLI: '/obtenerInfoSoli',
    GET_DATOS_LABORALES: '/ObtenerdatosLaborales',
    GET_DIAS_FESTIVOS_C: '/getDiasFestivos',
    GET_SOLICITUDBYID_VACACIONES: '/solicitudesById',
    GET_SOLICITUDES_VACACIONES: '/solicitudes'
};

const endpointsPost = {
    login: '/login',
    POST_INGRESA_SOLICITUD: '/ingresarSolicitudVacaciones'
};

export { endpoints, endpointsPost };
export default endpoints; // Exportación por defecto
