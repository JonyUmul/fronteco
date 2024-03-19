import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatFecha } from "../../utilidades/FormatearFecta";
import './estilosFormatos.css'
import Swal from 'sweetalert2'; // Importar SweetAlert

const DCKBT= ({ encabezado, EncName, fecha_creacion, id }) => {
  const { handleSubmit, register } = useForm();
  const [respuestas, setRespuestas] = useState([]);
  const [errors, setError]= useState('')


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/respuestas"),

    ])
      .then(([RespuestasResponse]) => {
        setRespuestas(RespuestasResponse.data)
      
      }
      
      )
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3001/DCKPH2', {
    id_CKPH2:id.toString(),
    id_verificadoCorrectoAccionamientoDebomba:formData.id_verificadoCorrectoAccionamientoDebomba,
	  id_sensorInfrarrojaLimpio:formData.id_sensorInfrarrojaLimpio,
    id_SecompruebaSensorBarreraInfrarrojaFuncionaCorrectamente:formData.id_SecompruebaSensorBarreraInfrarrojaFuncionaCorrectamente,
    id_mangueraHidráulicaEstaEnBuenEstadoSinFugasAceite:formData.id_mangueraHidráulicaEstaEnBuenEstadoSinFugasAceite,
    id_integridadDeLosBujesYBarrasPrincipalesEstaBuenEstadoSinDaños:formData.id_integridadDeLosBujesYBarrasPrincipalesEstaBuenEstadoSinDaños,
    id_elGrupoAnteriorCompletoSatisfactoriamenteLimpiezaGenera:formData.id_elGrupoAnteriorCompletoSatisfactoriamenteLimpiezaGenera,
 
	id_creador:'8',
    
   observacion1:formData.observacion1,
   observacion2:formData.observacion2,
   observacion3:formData.observacion3,
   observacion4:formData.observacion4,
   observacion5:formData.observacion5,
   observacion6:formData.observacion6,
    
        
      }); Swal.fire({
        icon: 'success',
        title: 'Guardado exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
 
      // Redirigir a la página de TablaOT después de 1.5 segundos
      setTimeout(() => {
        window.location.href = "/Home/TablaMaq";
      }, 1500);
    } catch (error) {
      setError('Uno o varios datos estan vacios')
      console.error("Error al enviar los datos:", error);
    }
  };

 

 
  return (
    <div className="mt-1">
      <h4 style={{ textAlign: 'center', color: 'gray' }}>{encabezado}.{EncName}</h4>
     
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
  <div className="card-body">
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
      <label htmlFor="materiaPrima" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Orden:
      </label>
      <p id="materiaPrima" className="form-control-static" style={{ marginBottom: "0" }}>{encabezado} - {EncName}</p>
    </div>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <label htmlFor="fecha" className="form-label" style={{ marginRight: "10px", width: "150px" }}>
        Fecha de Creación:
      </label>
      <p id="fecha" className="form-control-static" style={{ marginBottom: "0" }}>{formatFecha(fecha_creacion)}</p>
    </div>

</div>

</div>

<form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
<div className="form-group mt-3">
  <label htmlFor="limpiezaGeneral">1. ¿Se ha verificado el correcto accionamiento del motor de la bomba?</label>
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
    {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
    {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
      <div key={respuesta.id} className="form-check">
        <input
          className="form-check-input"  
          type="radio"
          name="calificacionLimpieza"
          id={`id_verificadoCorrectoAccionamientoDebomba${respuesta.id}`}
          value={respuesta.id}
          {...register("id_verificadoCorrectoAccionamientoDebomba")}
        />
        <label className="form-check-label" htmlFor={`id_visorFuncionandoNivelDeAguaVisible${respuesta.id}`}>
          {respuesta.respuesta}
        </label>
      </div>
    ))}
  </div>
  

    <input type="text" className="form-control mt-2" id="observacionLimpieza" placeholder="Observación" {...register("observacion1")}  />

</div>

<div className="form-group" >
    <label htmlFor="accionamientoTornillos">2. ¿Se confirma que el sensor de barrera infrarroja está limpio?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="calificacionTornillos"
            id={`id_sensorInfrarrojaLimpio-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_sensorInfrarrojaLimpio")}
          />  
          <label className="form-check-label" htmlFor={`id_accionamientoCorrectoSelenoideAlimentacion-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion2")}  />
  </div>


  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">3. ¿Se ha comprobado que el sensor de barrera infrarroja funciona correctamente?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="calificacionTornillos"
            id={`id_SecompruebaSensorBarreraInfrarrojaFuncionaCorrectamente-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_SecompruebaSensorBarreraInfrarrojaFuncionaCorrectamente")}
          />  
          <label className="form-check-label" htmlFor={`id_accionamientoCorrectoSelenoideAlimentacion-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion3")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">4. ¿La manguera hidráulica está en buen estado y sin fugas de aceite:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="id_mangueraHidráulicaEstaEnBuenEstadoSinFugasAceite"
            id={`id_mangueraHidráulicaEstaEnBuenEstadoSinFugasAceite-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_mangueraHidráulicaEstaEnBuenEstadoSinFugasAceite")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion4")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">5. ¿La integridad de los bujes y las barras principales está en buen estado y sin daños?:</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="id_integridadDeLosBujesYBarrasPrincipalesEstaBuenEstadoSinDaños"
            id={`id_integridadDeLosBujesYBarrasPrincipalesEstaBuenEstadoSinDaños-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_integridadDeLosBujesYBarrasPrincipalesEstaBuenEstadoSinDaños")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion5")}  />
  </div>

  <div className="form-group" >
    <label htmlFor="accionamientoTornillos">5. ¿El grupo anterior ha completado satisfactoriamente la limpieza general?</label>
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
      {/* Itera sobre el array de respuestas y muestra las opciones de radio */}
      {Array.isArray(respuestas.rows) && respuestas.rows.length > 0 && respuestas.rows.map((respuesta) => (
        <div key={respuesta.id} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="id_accionamientoCorrectoSelenoideLlenado"
            id={`id_elGrupoAnteriorCompletoSatisfactoriamenteLimpiezaGenera-${respuesta.id}`}
            value={respuesta.id}
            {...register("id_elGrupoAnteriorCompletoSatisfactoriamenteLimpiezaGenera")}
          />
          <label className="form-check-label" htmlFor={`checkbox-calificacion-tornillos-${respuesta.id}`}>
            {respuesta.respuesta}
          </label>
        </div>
      ))}
    </div>
    
    <input type="text" className="form-control mt-2" id="observacionTornillos" placeholder="Observación" {...register("observacion6")}  />
  </div>

  <p style={{ color: errors ? 'red' : 'inherit' }}>{errors}</p>


 
  {/* Agrega más preguntas aquí siguiendo el mismo patrón */}
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Guardar</button>
  </div>
</form>


    </div>
  );
};

export default DCKBT;
