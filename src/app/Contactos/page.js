"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Users({params}) {

    const { id } = use(params);
    const [usuarios, setUsuarios] = useState([])


  async function fetchUsers(){
    const url = "/api/contactos"
    const response = await fetch(url);
    const users = await response.json()
    setUsuarios(users)
  }

  
  useEffect( () => {fetchUsers()}, [])


  if (!usuarios) {
    return <h1>La lista de usuarios esta vacia</h1>;
  }

  function deleteUser(id){
    if(window.confirm('Estas seguro que quieres borrar este usuario?')){
        removeUser(id)
    }
  } 

  async function removeUser(idEliminar){
    const response = await fetch("/api/contactos", {
        method: "DELETE",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify({id: idEliminar})
    })

    fetchUsers();
  }

    return (
      <div>
        <h3>Usuarios: </h3>
        {
            <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                <Link href={"/Contactos/"+ usuario.id}>{usuario.nombre}</Link> - {usuario.apellidos}<br/>
                <button onClick={e => deleteUser(usuario.id)}>Eliminar Usuario</button>
              </li>
            ))}
          </ul>
        }
        <Link href={"/AddUser"}><h3>Add Usuario</h3></Link>
      </div>  
    )
}


