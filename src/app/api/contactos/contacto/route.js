import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)


export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")

    const { data: contacto, error } = await supabase.from("contacto").select("*").eq("id", idBuscado);

    if(contacto) {
        return new Response(JSON.stringify(contacto), {status:200})
    }else{
        return new Response(JSON.stringify({error: "No existe"}), {status: 404})
    }
}


export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")

    const body = await request.json();
    if(body.nombre && body.apellidos && body.telefonoContacto){
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo)){
            if(String(body.telefonoContacto).length == 9){
                const { data: contacto, error } = await supabase.from("contacto").update([{nombre: body.nombre, apellidos: body.apellidos, correo: body.correo, numero_telefono: body.telefonoContacto, fecha_nacimiento: body.fechaNacimiento}]).eq("id", idBuscado);
                return new Response(
                    JSON.stringify({message: "Usuario actualizado correctamente"}),
                    { headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    return new Response(
        JSON.stringify({message: "El usuario no se ha podido actualizar"}),
        { headers: { "Content-Type": "application/json" } }
    );
}
