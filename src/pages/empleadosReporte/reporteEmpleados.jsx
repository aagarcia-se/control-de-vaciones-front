import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Navbar from "../../components/navBar/NavBar";
import { Container, Button } from "@mui/material";
import * as XLSX from "xlsx"; // Importa la biblioteca XLSX

export const ReporteEmpleado = () => {
  // 1 - Configuramos los hooks
  const [empleados, setEmpleados] = useState([]);

  // 2 - Función para mostrar los datos con axios
  const endpoint = "http://localhost:3000/api/employeesList";

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      const data = response.data.responseData.emplloyeesList; // Corregido el nombre de la propiedad
      setEmpleados(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 3 - Función para exportar a XLS
  const exportToXLS = () => {
    const worksheet = XLSX.utils.json_to_sheet(empleados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados");
    XLSX.writeFile(workbook, "reporte_empleados.xlsx");
  };

  // 4 - Definimos las columnas con estilos personalizados
  const columns = [
    {
      name: "idEmpleado",
      label: "Código Colaborador",
      options: {
        customHeadRender: (columnMeta) => (
          <th
            key={columnMeta.index}
            style={{
              backgroundColor: "#133d80",
              color: "#FFF",
              textAlign: "center",
              borderLeft: "1px solid #FFF", // Agregar borde blanco a la izquierda
              borderRight: "1px solid #FFF" // Agregar borde blanco a la derecha
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
      name: "numeroDocumento",
      label: "CUI",
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
      name: "Nombres",
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
      name: "celular",
      label: "Celular",
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
      name: "correo",
      label: "E-mail",
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
      name: "puesto",
      label: "Puesto",
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
      name: "fechaIngresoLabores",
      label: "Ingresó",
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
    }
  ];

  // 5 - Configuramos las opciones para la tabla
  const options = {
    filterType: "checkbox",
    responsive: "standard", // Hacer la tabla responsive
    setRowProps: (row, dataIndex) => ({
      style: {
        backgroundColor: dataIndex % 2 === 0 ? "#f5f5f5" : "#ffffff" // Alternar color de fondo
      }
    }),
    download: false, // Deshabilitamos la descarga CSV predeterminada de MUIDataTable
    selectableRows: "multiple", // Mantener la selección de filas
    selectableRowsHeader: false, // Ocultar el checkbox en el encabezado
  };

  // 6 - Renderizamos la datatable con botón de exportación a XLS
  return (
    <>
      <Navbar />
      <br />
      <Container>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#4caf50", color: "#fff", marginBottom: 2 }} // Estilos personalizados para el color verde
          onClick={exportToXLS}
        >
          Exportar a XLS
        </Button>
        <MUIDataTable
          title={"Lista de empleados"}
          data={empleados}
          columns={columns}
          options={options}
        />
      </Container>
    </>
  );
};
