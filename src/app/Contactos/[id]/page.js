"use client"

import { useEffect, useState, use } from "react";

export default function User({params}) {

    const { id } = use(params);
    const [usuario, setUsuario] = useState(null)


  async function fetchUser(){
    const url = "/api/contactos/contacto?id=" + id
    const response = await fetch(url);
    const user = await response.json()
    setUsuario(user[0])
  }

  
  useEffect( () => {fetchUser()}, [])


  if (!usuario) {
    return <h1>Ese usuario no se ha encontrado</h1>;
  }

    return (
        <div>
            <h3>Usuario: </h3>
            <p><strong>ID:</strong> {usuario.id}</p>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
            <p><strong>Correo:</strong> {usuario.correo }</p>
            <p><strong>Numero de Telefono:</strong> {usuario.numero_telefono}</p>
            <p><strong>Fecha de Nacimiento:</strong> {usuario.fecha_nacimiento}</p>
        </div>
    )
}