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
        <h3 className="main-element" id="titulo">Usuarios: </h3>
        <table className="main-element" id="tabla-contactos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Acción</th>
            </tr>
          </thead>
            <tbody>
              {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td><Link href={"/Contactos/"+ usuario.id}>{usuario.nombre}</Link></td>
                    <td>{usuario.apellidos}</td>
                    <td><button onClick={e => deleteUser(usuario.id)}>Eliminar Usuario</button></td>
                  </tr>
              ))}
            </tbody>
        </table>
        <Link href={"/AddUser"}><h3 className="main-element">Add Usuario</h3></Link>
      </div>  
    )
}


