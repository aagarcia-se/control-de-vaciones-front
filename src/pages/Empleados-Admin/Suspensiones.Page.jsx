import React, { useState } from "react";
import Navbar from "../../components/navBar/NavBar";
import { useCheckSession } from "../../services/session/checkSession";
import { useErrorAlert } from "../../hooks/LoginHooks/useErrorAlert";
import Spinner from "../../components/spinners/spinner";
import { useGetSuspensiones } from "../../hooks/Suspensiones/useGetSuspensiones";
import {
  formatDateSetCalendar,
  formatDateToDisplay,
} from "../../services/utils/dates/vacationUtils";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import {
  Alert,
  Grid,
  Slide,
  Snackbar,
  TextField,
  Pagination,
} from "@mui/material";
import { ingresarSuspension } from "../../services/EmpleadosServices/Suspensiones/Suspensiones.service";
import { useRedirectPage } from "../../hooks/LoginHooks/RedirectLoginHook";
import { getLocalStorageData } from "../../services/session/getLocalStorageData";

const SuspensionesPage = () => {
  // Validar sesión activa
  const isSessionVerified = useCheckSession();
  const userData = getLocalStorageData();
  useRedirectPage(userData);

  const { suspensiones, error, loading } = useGetSuspensiones();
  const { alertVisible } = useErrorAlert(error);
  const [successOpen, setSuccessOpen] = useState(false);

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    id: null,
    nombreEmpleado: "",
    dpi: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: "",
  });

  // Estado para manejar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Manejo del cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo del cambio en el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reiniciar a la primera página al filtrar
  };

  // Manejo del envío del formulario para agregar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idEmpleado: null,
      CUI: formData.dpi,
      nombreEmpleado: formData.nombreEmpleado,
      fechaInicioSuspension: formData.fechaInicio,
      fechaFinSuspension: formData.fechaFin,
      descripcionSuspension: formData.descripcion,
    };

    try {
      const response = await ingresarSuspension(payload);
      if (response && response.status === 200) {
        setFormData({
          id: null,
          nombreEmpleado: "",
          dpi: "",
          fechaInicio: "",
          fechaFin: "",
          descripcion: "",
        });

        setShowModal(false);
        setIsEditing(false);

        setSuccessOpen(true);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error("Error al registrar la suspensión:", response.message);
      }
    } catch (error) {
      console.error("Error al registrar la suspensión:", error.message);
    }
  };

  // Filtrar suspensiones por término de búsqueda
  const filteredSuspensiones = suspensiones.filter(
    (suspension) =>
      suspension.nombreEmpleado
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      suspension.CUI.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los registros visibles según la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSuspensiones.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSuspensiones.length / itemsPerPage);

  // Cambiar de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (!isSessionVerified || loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {/* Input de búsqueda */}
        <TextField
          label="Buscar por Nombre o CUI"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Botón para abrir el modal */}
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => {
            setFormData({
              id: null,
              nombreEmpleado: "",
              dpi: "",
              fechaInicio: "",
              fechaFin: "",
              descripcion: "",
            });
            setShowModal(true);
            setIsEditing(false);
          }}
        >
          <span className="me-2">Suspender empleado</span>
          <i className="fa fa-plus"></i>
        </button>

        {/* Tabla de suspensiones */}
        <div className="mt-4">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>Registros</th>
                <th>Empleado</th>
                <th>DPI</th>
                <th>Inicio suspension</th>
                <th>Finalizacion suspension</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            {!error ? (
              <tbody>
                {currentItems.map((suspension) => (
                  <tr key={suspension.idSuspension}>
                    <td>{suspension.idSuspension}</td>
                    <td>{suspension.nombreEmpleado}</td>
                    <td>{suspension.CUI}</td>
                    <td>
                      {formatDateToDisplay(suspension.fechaInicioSuspension)}
                    </td>
                    <td>
                      {formatDateToDisplay(suspension.fechaFinSuspension)}
                    </td>
                    <td>{suspension.descripcionSuspension}</td>
                    <td>
                      {/* <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(suspension.idSuspension)}
                      >
                        Editar
                      </button> */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(suspension.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 4 }}
              >
                <ErrorAlert message={error} visible={alertVisible} />
              </Grid>
            )}
          </table>

          {/* Paginación */}
          <Pagination
            sx={{ mb: 5 }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="d-flex justify-content-center mt-3"
          />
        </div>
      </div>

      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Slide}
        sx={{
          "& .MuiSnackbarContent-root": {
            padding: "8px 16px",
            minWidth: "200px",
          },
        }}
      >
        <Alert
          onClose={() => setSuccessOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            fontSize: "1.0rem",
            backgroundColor: "#28a745",
            color: "#ffffff",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
            "& .MuiAlert-action": {
              color: "#ffffff",
            },
          }}
        >
          Suspension ingresada correctgamente
        </Alert>
      </Snackbar>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {isEditing ? "Actualizar Suspensión" : "Registrar Suspensión"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* DPI */}
                  <div className="form-group mb-3">
                    <label htmlFor="dpi">DPI</label>
                    <input
                      type="text"
                      id="dpi"
                      name="dpi"
                      className="form-control"
                      placeholder="Ingrese el DPI"
                      value={formData.dpi}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Nombre del empleado */}
                  <div className="form-group mb-3">
                    <label htmlFor="nombreEmpleado">Nombre del Empleado</label>
                    <input
                      type="text"
                      id="nombreEmpleado"
                      name="nombreEmpleado"
                      className="form-control"
                      placeholder="Ingrese el nombre del empleado"
                      value={formData.nombreEmpleado}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Fecha de inicio */}
                  <div className="form-group mb-3">
                    <label htmlFor="fechaInicio">Fecha de Inicio</label>
                    <input
                      type="date"
                      id="fechaInicio"
                      name="fechaInicio"
                      className="form-control"
                      value={
                        formData.fechaInicio
                          ? formatDateSetCalendar(formData.fechaInicio)
                          : ""
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Fecha de finalización */}
                  <div className="form-group mb-3">
                    <label htmlFor="fechaFin">Fecha de Finalización</label>
                    <input
                      type="date"
                      id="fechaFin"
                      name="fechaFin"
                      className="form-control"
                      value={
                        formData.fechaFin
                          ? formatDateSetCalendar(formData.fechaFin)
                          : ""
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Descripción */}
                  <div className="form-group mb-3">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      className="form-control"
                      rows="4"
                      placeholder="Ingrese la descripción de la suspensión"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  {/* Botón de envío */}
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? "Actualizar" : "Registrar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuspensionesPage;
