import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Navbar from "../../../components/navBar/NavBar";
import { Container, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import * as XLSX from "xlsx"; // Importa la biblioteca XLSX
import { useCheckSession } from "../../../services/session/checkSession";
import { getLocalStorageData } from "../../../services/session/getLocalStorageData";
import { useRedirectPage } from "../../../hooks/LoginHooks/RedirectLoginHook";
import { useLocation } from "react-router-dom";

export const ReporteVacacionesEmpleados = () => {
  const location = useLocation();
  console.log(location.pathname)
    const isSessionVerified = useCheckSession();
    const userData = getLocalStorageData();
    useRedirectPage(userData);

  // 1 - Configuramos los hooks
  const [vacacionesList, setVacacionesList] = useState([]);
  const [unidad, setUnidad] = useState("Seleccione unidad"); // Estado para la unidad seleccionada
  const [unidades, setUnidades] = useState([]); // Estado para las unidades obtenidas del API

  // 2 - Función para mostrar los datos con axios
  const baseEndpoint = "http://localhost:3000/api/vacacionesReport";

  const getData = async (unidadSeleccionada) => {
    try {
      // Limpiar la tabla si no hay unidad seleccionada
      if (unidadSeleccionada === "Seleccione unidad") {
        setVacacionesList([]);
        return;
      }
      console.log(unidadSeleccionada)
      const endpoint = `${baseEndpoint}?unidad=${encodeURIComponent(unidadSeleccionada)}`;
      const response = await axios.get(endpoint);
      const data = response.data.reporteVacaciones || []; // Asegurar que sea un array
      setVacacionesList(data);
    } catch (error) {
      console.log("Error al obtener los datos", error);
      setVacacionesList([]); // Limpiar los datos en caso de error
    }
  };

  // 3 - Función para obtener las unidades desde el API
  const getUnidades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/unidades");
      const data = response.data.departamentos.filter((unidad) => unidad.estado === "A"); // Filtrar por estado "A"
      setUnidades(data);
    } catch (error) {
      console.log("Error al obtener las unidades", error);
    }
  };

  useEffect(() => {
    getUnidades(); // Llamar al obtener las unidades al cargar el componente
  }, []);

  useEffect(() => {
    getData(unidad); // Llamar a getData cuando cambie la unidad seleccionada
  }, [unidad]);

  // 4 - Función para exportar a XLS
  const exportToXLS = () => {
    const worksheet = XLSX.utils.json_to_sheet(vacacionesList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de vacaciones");
    XLSX.writeFile(workbook, "reporte_vacaciones_solicitadas.xlsx");
  };

  // 5 - Definimos las columnas con estilos personalizados
  const columns = [
    {
      name: "idSolicitud",
      label: "Gestión",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            key={columnMeta.index}
            style={{
              backgroundColor: "#133d80",
              color: "#FFF",
              textAlign: "center",
              borderLeft: "1px solid #FFF",
              borderRight: "1px solid #FFF"
            }}
          >
            {columnMeta.label}
          </th>
        ),
        setCellProps: () => ({
          style: { textAlign: "center" }
        })
      }
    },
    {
      name: "Nombre",
      label: "Nombres y Apellidos",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            key={columnMeta.index}
            style={{
              backgroundColor: "#133d80",
              color: "#FFF",
              textAlign: "center",
              borderLeft: "1px solid #FFF",
              borderRight: "1px solid #FFF"
            }}
          >
            {columnMeta.label}
          </th>
        ),
        setCellProps: () => ({
          style: { textAlign: "center" }
        })
      }
    },
    {
      name: "unidadSolicitud",
      label: "Unidad",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            key={columnMeta.index}
            style={{
              backgroundColor: "#133d80",
              color: "#FFF",
              textAlign: "center",
              borderLeft: "1px solid #FFF",
              borderRight: "1px solid #FFF"
            }}
          >
            {columnMeta.label}
          </th>
        ),
        setCellProps: () => ({
          style: { textAlign: "center" }
        })
      }
    },
    {
      name: "fechaInicioVacaciones",
      label: "Inicio de vacaciones",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            key={columnMeta.index}
            style={{
              backgroundColor: "#133d80",
              color: "#FFF",
              textAlign: "center",
              borderLeft: "1px solid #FFF",
              borderRight: "1px solid #FFF"
            }}
          >
            {columnMeta.label}
          </th>
        ),
        setCellProps: () => ({
          style: { textAlign: "center" }
        }),
        customBodyRender: (value) => {
          if (!value) return ""; // Manejar valores nulos o indefinidos
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          });
          return formattedDate;
        }
      }
    }
  ];

  // 6 - Configuramos las opciones para la tabla
  const options = {
    textLabels: {
      body: {
        noMatch: "Seleccione unidad para realizar la búsqueda",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      filter: {
        all: "Todo",
        title: "Filtros",
        reset: "Reiniciar",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar Filas Seleccionadas",
      },
    },
    filterType: "checkbox",
    responsive: "standard",
    setRowProps: (row, dataIndex) => ({
      style: {
        backgroundColor: dataIndex % 2 === 0 ? "#f5f5f5" : "#ffffff"
      }
    }),
    download: false,
    selectableRows: "multiple",
    selectableRowsHeader: false,
    customToolbar: () => (
      <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
        <InputLabel id="unidad-select-label">Unidad</InputLabel>
        <Select
          labelId="unidad-select-label"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
        >
          <MenuItem value="Seleccione unidad">Seleccionar unidad</MenuItem>
          {unidades.map((unidad) => (
            <MenuItem key={unidad.idUnidad} value={unidad.nombreUnidad}>
              {unidad.nombreUnidad}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  };

  // 7 - Renderizamos la datatable con botón de exportación a XLS y el dropdown
  return (
    <>
      <Navbar />
      <br />
      <Container>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#4caf50", color: "#fff", marginBottom: 2 }}
          onClick={exportToXLS}
        >
          Exportar a XLS
        </Button>
        <MUIDataTable
          title={` ${unidad}`}
          data={vacacionesList}
          columns={columns}
          options={options}
        />
      </Container>
    </>
  );
};
