import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import Swal from 'sweetalert2'; // Importar SweetAlert
const URL = process.env.REACT_APP_URL;
const DRM = ({  encabezado, EncName,fecha_creacion, id, codigoInicio, codigoFinal }) => {
  const { handleSubmit, register } = useForm();
  const [modeloUF, setModeloUf] = useState([]);
  const [maquina, setMaquina]= useState([]);
  const [turno, setTurno]= useState([])

  const maquinaria="Horno"; 

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/ModelosUF`),
      axios.get(`${URL}/maquinaria/${maquinaria}`),
      axios.get(`${URL}/Turnos`)
    ])
      .then(([ModelosResponse, MaquinaResponse, TurnosResponse]) => {
        setModeloUf(ModelosResponse.data);
        setMaquina(MaquinaResponse.data);
        setTurno(TurnosResponse.data)
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      
   
      const response = await axios.post(`${URL}/DTH`, {
        id_cth: id.toString(),
        id_modelo: formData.id_modelo,
        id_horno: formData.id_horno,
        id_turno: formData.id_turno,
        id_creador:'',
        tempCabezaIZ:formData.tempCabezaIZ,
        tempCentroIZ: formData.tempCentroIZ,
        tempPieIZ: formData.tempPieIZ,
        tempCabezaDR: formData.tempCabezaDR,
        tempCentroDR: formData.tempCentroDR,
        tempPieDR: formData.tempPieDR,
        
      });
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaCP";
      }, 1500);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };



  

  return (

    
    <div className="mt-2">
      <h4 style={{ textAlign: "center", color: "gray" }}>Control de Temperatura Tunel</h4>
      <div className="card">
        <div className="card-body">
          <label htmlFor="materiaPrima" className="form-label">
            Orden
          </label>
          <p id="materiaPrima" className="form-control-static">
            {encabezado} - {EncName}
          </p>

         
          <label htmlFor="fecha" className="form-label">
            Fecha de Creación
          </label>
          <p id="fecha" className="form-control-static">
            {formatFecha(fecha_creacion)}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 row g-3">
        <div>
       
        <div className="row text-center" >
    <div className="col-sm-3">
      <label htmlFor={`modelo`} className="form-label">
        Modelo
      </label>
      <select
        className="form-select"
        name={`id_modelo`}
        id={`id_modelo`}
        {...register(`id_modelo`)}
      >
        {Array.isArray(modeloUF.rows) &&
          modeloUF.rows.length > 0 &&
          modeloUF.rows.map((modelo) => (
            <option key={modelo.id_mod} value={modelo.id_mod} >
              {modelo.nombre_modelo}
            </option>
          ))}
      </select>
    </div>

    <div className="col-sm-3">
      <label htmlFor={`turno`} className="form-label">
        Turno
      </label>
      <select
        className="form-select"
        name={`id_turno`}
        id={`id_turno`}
        {...register(`id_turno`)}
      >
        {Array.isArray(turno.rows) &&
          turno.rows.length > 0 &&
          turno.rows.map((turno) => (
            <option key={turno.id} value={turno.id} >
              {turno.turno}
            </option>
          ))}
      </select>
    </div>
    <div className="col-sm-3">
      <label htmlFor={`horno`} className="form-label">
        Horno
      </label>
      <select
        className="form-select"
        name={`id_horno`}
        id={`id_horno`}
        {...register(`id_horno`)}
      >
        {Array.isArray(maquina.rows) &&
          maquina.rows.length > 0 &&
          maquina.rows.map((maquina) => (
            <option key={maquina.id_maq} value={maquina.id_maq} >
              {maquina.nombre_maq}
              </option>
            ))}
      </select>

      
    </div>
    </div>

    <div className="row text-center mt-2">
  <div className="col-md-auto">
    <label htmlFor={`Cabeza Izquierda`} className="form-label">
      Cabeza Izquierda
    </label>
    <input type="text" className="form-control" id="tempCabezaIZ" {...register(`tempCabezaIZ`)} required />
  </div>
  <div className="col-md-auto">
    <label htmlFor={`Centro Izquierdo`} className="form-label">
      Centro Izquierdo
    </label>
    <input type="text" className="form-control" id="tempCentroIZ" {...register(`tempCentroIZ`)} required />
  </div>
  <div className="col-md-auto">
    <label htmlFor={`Pie Izquierdo`} className="form-label">
      Pie Izquierdo
    </label>
    <input type="text" className="form-control" id="tempPieIZ" {...register(`tempPieIZ`)} required />
  </div>
  <div className="col-md-auto">
    <label htmlFor={`Cabeza Derecha`} className="form-label">
      Cabeza Derecha
    </label>
    <input type="text" className="form-control" id="tempCabezaDR" {...register(`tempCabezaDR`)} required />
  </div>
  <div className="col-md-auto">
    <label htmlFor={`Centro Derecho`} className="form-label">
      Centro Derecho
    </label>
    <input type="text" className="form-control" id="tempCentroDR" {...register(`tempCentroDR`)} required />
  </div>
  <div className="col-md-auto">
    <label htmlFor={`Pie Derecho`} className="form-label">
      Pie Derecho
    </label>
    <input type="text" className="form-control" id="tempPieDR" {...register(`tempPieDR`)} required />
  </div>
</div>



        </div>
       
        <div className="col-3 m2-3">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DRM;
