"use client"

import { useEffect, useState, use } from "react";

export default function User({params}) {

    const { id } = use(params);
    const [usuario, setUsuario] = useState(null)
    const [isEditing, setIsEditing] = useState(false)


  async function fetchUser(){
    const url = "/api/contactos/contacto?id=" + id
    console.log(url)
    const response = await fetch(url);
    const user = await response.json()
    setUsuario(user[0])
  }

  
  useEffect( () => {fetchUser()}, [])


  if (!usuario) {
    return <h1>Ese usuario no se ha encontrado</h1>;
  }

  async function editarUser(e){
    e.preventDefault();
    const response = await fetch("/api/contactos/contacto?id="+id, {
        method: "PUT",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify(usuario) 
    })
    fetchUser();
  }

  function onChange(e) {
    setUsuario({...usuario,[e.target.name]:e.target.value})
  }
    return (
      isEditing ? 
        <div>
          <h1>Formulario de Registro</h1>
          <form onSubmit={editarUser}>
            <label>Nombre:
                <input type="text" name="nombre" onChange={e => onChange(e)} value={usuario.nombre}required/>
            </label><br/>
            <label>Apellidos:
                <input type="text" name="apellidos" onChange={e => onChange(e)} value={usuario.apellidos} required/>
            </label><br/>
            <label>Correo Electrónico:
                <input type="email" name="correo" onChange={e => onChange(e)} value={usuario.correo} required/>
            </label><br/>
            <label>Número de Teléfono:
                <input type="tel" name="numero_telefono" pattern="[0-9]{9}" onChange={e => onChange(e)} value={usuario.numero_telefono} required/>
            </label><br/>
            <label>Fecha de Nacimiento:
                <input type="date" name="fecha_nacimiento" onChange={e => onChange(e)} value={usuario.fecha_nacimiento} required/>
            </label><br/>
            <button type="submit">Enviar</button>
          </form>
          <p>
            <button onClick={() => setIsEditing(false)}>Ocultar</button>
          </p>
        </div>
      :
      <div>
        <h3>Usuario: </h3>
        <p><strong>ID:</strong> {usuario.id}</p>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Número de Teléfono:</strong> {usuario.numero_telefono}</p>
        <p><strong>Fecha de Nacimiento:</strong> {usuario.fecha_nacimiento}</p>
        <p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </p>
      </div>  
    )
}