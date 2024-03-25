import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import './user.css'
const URL = process.env.REACT_APP_URL;
const CTT = () => {
  const { handleSubmit, register } = useForm();
  const [mtp, setMtp] = useState([]);
  const [datos, setDatos] = useState({
    id_enc: "",
    id_creador: "",
    codigoInicio: "",
    codigoFinal:""
  });
  
  
  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/MateriaPrima`),
    ])
      .then(([estadosResponse, rolesResponse]) => {
        setMtp(estadosResponse.data);
        console.log("Datos de Estadosroutes:", estadosResponse.data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);


  const onSubmit = async (formData) => {
    // formData.preventDefault();
    try {
      // Actualizar el estado 'datos' con los valores del formulario
      setDatos({
        // id_creador,
        codigoInicio: formData.codigoInicio,
        codigoFinal:formData.codigoFinal
    });
   
    
      // Realizar la solicitud POST al servidor con los datos del formulario
      const response = await axios.post(
        `${URL}/CTT`,formData
      );
      window.location.href = "/Home/TablaCP";
      console.log("Respuesta del servidor:", response.data);
      // Aquí podrías agregar lógica adicional, como mostrar un mensaje de éxito al usuario, por ejemplo
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Aquí podrías manejar el error, mostrar un mensaje al usuario, etc.
    }
  };


  // console.log(estados);
  return (
    <div className="mt-4 text-center">
  {/* <h5 className="text-muted">Orden de Trabajo - Cernido de Materia Prima</h5> */}
  <div className="container">
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="mb-3">
        <label htmlFor="estados" className="form-label">
          Codigo de inicio
        </label>
        <input type="text" className="form-control" id="codigoInicio" {...register("codigoInicio")} required />

      </div>
      <div className="mb-3">
        <label htmlFor="estados" className="form-label">
          Codigo Final
        </label>
        <input type="text" className="form-control" id="codigoFinal" {...register("codigoFinal")} required />

      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </div>
    </form>
  </div>
</div>

  );
};


    export default CTT;
