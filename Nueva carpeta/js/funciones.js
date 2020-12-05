var peticionHttp = new XMLHttpRequest();
var fila;
var list;
var listado;
var nombre;
var apellido;
var localidad;
var sexo;
window.addEventListener("load",load);
function load()
{
    
    cargar(loadGet());
}



//loadGet(peticionHttp);
function loadGet() {
    peticionHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        listado=JSON.parse(this.responseText);
        cantidad= cargarlista(listado);
       
      }
    }
    peticionHttp.open("GET", "http://localhost:3000/personas", true);
    peticionHttp.send();
    
}
function cargarlista(lista)
{
    tabla=$("body");
    var j=0;
    for (var item of lista)
    {
        j++;
        var row=document.createElement("tr");
        row.addEventListener("click",abrir);
        var CNombre=document.createElement("td");
        var nombre=document.createTextNode(item.nombre);
        CNombre.appendChild(nombre);
        row.appendChild(CNombre);
        var ColumnaApellido=document.createElement("td");
        var apellido=document.createTextNode(item.apellido);
        ColumnaApellido.appendChild(apellido);
        row.appendChild(ColumnaApellido);
        var ColumnaLocalidad=document.createElement("td");
        var Localidad =item.localidad
        var lugar=document.createTextNode(Localidad.nombre);
        ColumnaLocalidad.appendChild(lugar);
        row.appendChild(ColumnaLocalidad);
        var ColumnaSexo=document.createElement("td");
        var sexo=document.createTextNode(item.sexo);
        ColumnaSexo.appendChild(sexo);
        row.appendChild(ColumnaSexo);
        tabla.appendChild(row);
    }
    return j;

}
function crearTabla(lista)
{
    var row=document.createElement("tr");
    for(var item of lista)
    {       
        var cN=document.createElement("td");
        var noText=document.createElement("select");
        cN.appendChild(noText);
        row.appendChild(cN);
    }

    return row;

}

function cerrar()
{
    var contenedor=$("div");
    contenedor.hidden=true;
}

function buscarid(nombre,lista)
{
    var id=0;
    for(var item of lista)
    {
        if(item.nombre==nombre)
        {
            id=item.id;
        }
    }
return id;
}

function AgregarLocalidades(lugar)
{
    peticionHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          list=JSON.parse(this.responseText);
          var Localidad=$("select");
          agregarOpciones(Localidad,list,lugar);
        }
      }
      peticionHttp.open("GET", "http://localhost:3000/localidades", true);
      peticionHttp.send();
      
      
}

function abrir(e)
{
    e.preventDefault();
    fila=e.target.parentNode;
    nombre=fila.firstChild;
    console.log(nombre.textContent);
    apellido=nombre.nextSibling;
    localidad=apellido.nextSibling;
    sexo=localidad.nextSibling;
    $("nombre").value=nombre.textContent;
    $("apellido").value=apellido.textContent;
    if(sexo.textContent=="Female")
    {
        $('f').checked = true;
    }else
    {
        $('m').checked = true;
    }
    
    var contenedor=$("div");
    contenedor.hidden=false;
    AgregarLocalidades(localidad.textContent);
    

}

function cargar()
{
    var btn=$("btnGuardar");
    btn.addEventListener("click",click)
    var btnCerrar=$("btnCerrar");
    btnCerrar.addEventListener("click",cerrar);
    


}
function click()
{
    
    var sexo
    var nombre=$("nombre");
    var Apellido=$("apellido");
    var Localidad=$("select");
    if($('f').checked==true)
    {
        sexo="Female";
    } 
    else
    {
        sexo="Male";
    }
    if(nombre.value==="" && marca.value.length<=3)
    {
        nombre.className="inputError";
        return;
    }
   // alert(marca.value);
    Apellido.className="inputSinError";
    if( Apellido.value===""&& Apellido.value.length<=3)
    {
        Apellido.className="inputError";
        return;
    }
    Apellido.className="inputSinError";
    var json = {"id": buscarid(nombre.textContent,listado),"nombre": nombre.value,"apellido": Apellido.value,
    "sexo": sexo,"localidad":{"id": buscarid(Localidad.value,list),"nombre": Localidad.value}};
    console.log(json);
    editarfila();
    postGuardar("http://localhost:3000/editar",JSON.stringify(json),true);
    cerrar();
    
}


function postGuardar(url,aguardar)
{
    //console.log("si");
    //$(loader).hidden=false;
    var peticion =new XMLHttpRequest();
    peticion.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("si");
            var respuesta=peticion.responseText;

          alert(respuesta);
          
        }else
        {
            alert ("no paso");
        }
    peticion.open("POST", url);
    peticion.setRequestHeader("Content-Type", "application/json");
    peticion.send(aguardar);
}
}

function editarfila()
{
    nombre.textContent=$("nombre").value;
    apellido.textContent=$("apellido").value;
    localidad.textContent=$("select").value;
    if($('f').checked==true)
    {
        sexo.textContent="Female";
    } 
    else
    {
        sexo.textContent="Male";
    }
}

function Agregarfila()
{
    varj=cantidad;
    tabla=$("body");
    var modelos=$("modelo");
    var marcas=$("marca");
    var Año=$("select");
    j++;
    var row=document.createElement("tr");
    var cN=document.createElement("td");
    var marca=document.createTextNode(marcas);
    cN.appendChild(marca);
    row.appendChild(cN);
    var ColumnaModelo=document.createElement("td");
    var modelo=document.createTextNode(modelos);
    ColumnaModelo.appendChild(modelo);
    row.appendChild(ColumnaModelo);
    var ColumnaAño=document.createElement("td");
    var Años=document.createElement("select");
    Años.setAttribute("name","lista");
    Años.setAttribute("size","1");
    Años.setAttribute("id","id"+j);
    agregarOpciones(Años,Año);
    ColumnaAño.appendChild(Años);
    row.appendChild(ColumnaAño);
    tabla.appendChild(row);
}




function agregarOpciones(miSelect,lista,localidad)
{
    
 var j=0;
 for(var item of lista)
 {
    
    var opcion=document.createElement("option");
    j++;
    opcion.setAttribute("value",item.nombre);
    opcion.setAttribute("label",item.nombre);
    if(j==1)
    {
        opcion.setAttribute("selected","true");
    }
    miSelect.appendChild(opcion);
 }
 if(localidad!=null)
 {
    var opcion=document.createElement("option");
    j++;
    opcion.setAttribute("value",localidad);
    opcion.setAttribute("label",localidad);
    opcion.setAttribute("selected","true");
    miSelect.appendChild(opcion);
 }
}
function $(id)
{
    return document.getElementById(id);
}