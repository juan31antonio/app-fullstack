"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function AddUser({params}) {

    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        numero_telefono: 0,
        fecha_nacimiento: ""
    });

    async function agregarUsuario(){
        const response = await fetch("/api/contactos", {
            method: "POST",
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(usuario)
        })
        fetchUsers();
    }

    function onChange(e) {
        setUsuario({...usuario,[e.target.name]:e.target.value})
    }

    function addUser(){
        if(usuario.nombre && usuario.apellidos && usuario.numero_telefono){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.correo)){
                if(String(usuario.numero_telefono).length == 9){
                    agregarUsuario()
                }
            }
        }
    }

    return (
        <div>
        <h1>Formulario de Registro</h1>
        <form onSubmit={addUser} className="form-addUser">
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
          <button type="submit" id="addUser-button">Enviar</button>
        </form>
        <p>
          <Link href={"/Contactos"}><button>Volver Atras</button></Link>
        </p>
      </div>
    )
}


