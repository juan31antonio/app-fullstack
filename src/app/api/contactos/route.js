import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: contacto, error } = await supabase.from("contacto").select("id, nombre, apellidos").order("nombre");

    return new Response(
        JSON.stringify(contacto),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function POST(request) {
    const body = await request.json();

    if(body.nombre && body.apellidos && body.numero_telefono){
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.correo)){
            if(String(body.numero_telefono).length == 9){
                const { data: contacto, error } = await supabase.from("contacto").insert({nombre: body.nombre, apellidos: body.apellidos, correo: body.correo, numero_telefono: body.numero_telefono, fecha_nacimiento: body.fecha_nacimiento});
                return new Response(
                    JSON.stringify({message: "Usuario agregado correctamente"}),
                    { headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    return new Response(
        JSON.stringify({message: "El usuario no se ha podido agregar"}),
        { headers: { "Content-Type": "application/json" } }
    );
}

export async function DELETE(request){
    const body = await request.json();

    const { data, error } = await supabase
    .from("contacto")
    .delete()
    .eq("id", body.id);

    return new Response(
        JSON.stringify({message: "Usuario eliminado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}









