function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.118.139:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionFinca() {
    $.ajax({
        url:"http://129.151.118.139:8080/api/Farm/all",
        //url: "http://localhost:8080/api/Farm/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaFinca(response);
        }

    });

}

function pintarRespuestaFinca(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Direccion</td>";
        myTable+="<td>Extensión</td>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].address + "</td>";
        myTable+="<td>" + response[i].extension + "</td>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonFinca2" onclick="borrar(' + response[i].id + ')">Borrar Finca!</button></td>';
        myTable+='<td><button class = "botonFinca2" onclick="cargarDatosFinca(' + response[i].id + ')">Editar Finca!</button></td>';
        myTable+='<td><button class = "botonFinca2" onclick="actualizar(' + response[i].id + ')">Actualizar Finca!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaFinca").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosFinca(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.118.139:8080/api/Farm/"+id,
        //url: "http://localhost:8080/api/Farm/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#address2").val(item.address);
            $("#extension").val(item.extension);
            $("#name").val(item.name);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarFinca() {

    if($("#address2").val().length == 0 || $("#extension").val().length == 0 || $("#name").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                address: $("#address2").val(),
                extension: $("#extension").val(),
                name: $("#name").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.118.139:80/api/Farm/save",
                //url: "http://localhost:8080/api/Farm/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#address2").val("");
                    $("#extenion").val("");
                    $("#name").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.118.139:8080/api/Farm/"+idElemento,
            //url: "http://localhost:8080/api/Farm/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaFinca").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#address2").val().length == 0 || $("#extension").val().length == 0 || $("#name").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            address: $("#address2").val(),
            extension: $("#extension").val(),
            name: $("#name").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.118.139:80/api/Farm/update",
            //url: "http://localhost:8080/api/Farm/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaFinca").empty();
                listarFinca();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#address2").val("");
                $("#extension").val("");
                $("#name").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
