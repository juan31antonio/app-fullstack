"use client"

import { useEffect, useState, use } from "react";

export default function User({params}) {

    const { id } = use(params);
    const [user, setUser] = useState()


  async function fetchUser(){
    const url = "/api/contactos/contacto?id=" + id
    const response = await fetch(url);
    const user = await response.json()
    setUser(user)
  }

  
  useEffect( () => {fetchUser()}, [])


  if (!user) {
    return <h1>Ese usuario no se ha encontrado</h1>;
  }

    return (
        <div>
            <h3>Usuario: </h3>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Apellidos:</strong> {user.apellidos}</p>
            <p><strong>Correo:</strong> {user.correo }</p>
            <p><strong>Numero de Telefono:</strong> {user.numero_telefono}</p>
            <p><strong>Fecha de Nacimiento:</strong> {user.fecha_nacimiento}</p>
        </div>
    )
}