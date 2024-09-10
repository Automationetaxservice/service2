var functions = require("./functions");
var _Lista = require("./salesforceValues");

function firstStep(){
    document.getElementById("modalScriptAuthentication").classList.add("hidden");
    document.getElementById("modalScriptAuthentication").classList.remove("active");

    document.getElementById("modalScriptProblem").classList.add("hidden");
    document.getElementById("modalScriptProblem").classList.remove("active");

    document.getElementById("modalScriptProbe").classList.add("hidden");
    document.getElementById("modalScriptProbe").classList.remove("active");

    document.getElementById("modalScriptAgreement").classList.add("hidden");
    document.getElementById("modalScriptAgreement").classList.remove("active");

    document.getElementById("modalScriptRecap").classList.add("hidden");
    document.getElementById("modalScriptRecap").classList.remove("active");

    document.getElementById("modalScriptClosing").classList.add("hidden");
    document.getElementById("modalScriptClosing").classList.remove("active");

    document.getElementById("modalScriptGreeting").classList.remove("hidden");
    document.getElementById("modalScriptGreeting").classList.add("active");
    
    document.getElementById("modalScriptPrevious").classList.add("disabled")
    document.getElementById("modalScriptNext").classList.remove("disabled");
}
function hideSteps(){
    var container = document.querySelector('#modalScriptBody');
    var child = container.querySelector('.active');
    child.classList.add("hidden");
    child.classList.remove("active");
    document.getElementById("modalScriptPrevious").classList.add("disabled");
    document.getElementById("modalScriptNext").classList.add("disabled");
}
function checkState(){
    var id = document.getElementById("csList").value;
    if(id !== " "){
        firstStep();
    }else{
        hideSteps();
    }
}
function checkGreetValues(){
    if(document.getElementById("provieneLlamadaGreet").value === "En nombre del cliente de terceros"){
        document.getElementById("tercerosGreetDiv").classList.remove("hidden");
        document.getElementById("tipoAgenciaGreetDiv").classList.add("hidden");
    }
    mostrarTipoAgenciaDivGreet();
}

function cambiarContactScript(){
    checkState();
    _Lista.customerService(function(records){
        var record = document.getElementById("csList").value;
        var filtro = [];
        for(var j = 0; j<records.length; j++){
            var arrayc = records.filter(function(result) { return result.recordId === record; })[j];
            if(arrayc !== undefined){ filtro.push(arrayc); }
        }
    //1. Greeting
        var greeting = "<div class='divTituloModal'><h4 class='tituloModal'>1. Greeting</h4></div>";
        for(var k = 0; k<filtro.length; k++){
            var greet = filtro[k];
    greeting += "<div class='modalScriptRow' style='align-items:baseline;'>";
    greeting += "   <div style='width: 70%;'>";
    greeting += "       <div class='divInputScript'>";
    greeting += "           <label class='labelModal'>1. Hola, ¿Cómo le puedo ayudar el día de hoy?</label><br>";
    greeting += "           <input id='idContacto' class='hidden' value='"+greet.contact+"'>";
    greeting += "           <input id='idAccount' class='hidden' value='"+greet.account+"'>";
    greeting += "           <input id='idUsers' class='hidden' value='"+greet.users+"'>";
    greeting += "           <textarea id='ayudaGreet' name='ayudaGreet' class='inputModal'>"+ greet.solicitudCliente +"</textarea>";
    greeting += "       </div>";
    greeting += "       <div class='divInputScript'>";
    greeting += "           <label class='labelModal'>2. ¿De quién proviene la llamada?</label><br>";
    greeting += "           <select id='provieneLlamadaGreet' name='provieneLlamadaGreet' class='inputModal' onChange='mostrarTercerosGreetDiv();'>";
    if(greet.dequienLlamada === ' ') { greeting += "<option value=' ' selected>None</option>"; }else{ greeting += "<option value=' '>None</option>"; }
    if(greet.dequienLlamada === 'Cliente') { greeting += "<option value='Cliente' selected>Cliente</option>"; }else{ greeting += "<option value='Cliente'>Cliente</option>"; }
    if(greet.dequienLlamada === 'Proveedor') { greeting += "<option value='Proveedor' selected>Proveedor</option>"; }else{ greeting += "<option value='Proveedor'>Proveedor</option>"; }
    if(greet.dequienLlamada === 'Cliente Nuevo') { greeting += "<option value='Cliente Nuevo' selected>Cliente Nuevo</option>"; }else{ greeting += "<option value='Cliente Nuevo'>Cliente Nuevo</option>"; }
    if(greet.dequienLlamada === 'En nombre del cliente de terceros') { greeting += "<option value='En nombre del cliente de terceros' selected>En nombre del cliente de terceros</option>"; }else{ greeting += "<option value='En nombre del cliente de terceros'>En nombre del cliente de terceros</option>"; }
    if(greet.dequienLlamada === 'Llamada Interna') { greeting += "<option value='Llamada Interna' selected>Llamada Interna</option>"; }else{ greeting += "<option value='Llamada Interna'>Llamada Interna</option>"; }
    greeting += "           </select>";
    greeting += "       </div>";
    greeting += "       <div id='tercerosGreetDiv' class='hidden'>";
    greeting += "           <div id='parentezcoTitularGreetDiv' class='divInputScript' style='margin-top: 3%;'>";
    greeting += "               <label class='labelModal'>2.1 ¿Cuál es su parentezco con el titular?</label><br>";
    greeting += "               <div class='divInputScript'>";
    greeting += "                   <div class='modalScriptRow'>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            var all = 'Amigo;Esposo;Familiar;Hijos;Padres;Otro';
                                            if(greet.tipoParentezco && greet.tipoParentezco === all){ greeting += "<input checked id='parentezcoTitularGreetAll' name='parentezcoTitularGreet[]' type='checkbox' value='All' onClick='parentezcoGreetCheckAll(this);'>"; }else{ greeting += "<input id='parentezcoTitularGreetAll' name='parentezcoTitularGreet[]' type='checkbox' value='All' onClick='parentezcoGreetCheckAll(this);'>"; }
    greeting += "                               <label for='parentezcoTitularGreetAll' class='labelModal'>All</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            if( greet.tipoParentezco && (greet.tipoParentezco).includes("Amigo") ){ greeting += "<input checked id='parentezcoTitularGreetAmigo' name='parentezcoTitularGreet[]' type='checkbox' value='Amigo' onClick='mostrarTipoAgenciaDivGreet();'>"; }else{ greeting += "<input id='parentezcoTitularGreetAmigo' name='parentezcoTitularGreet[]' type='checkbox' value='Amigo' onClick='mostrarTipoAgenciaDivGreet();'>"; }
    greeting += "                               <label for='parentezcoTitularGreetAmigo' class='labelModal'>Amigo</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            if( greet.tipoParentezco && (greet.tipoParentezco).includes("Esposo") ){ greeting += "<input checked id='parentezcoTitularGreetEsposo' name='parentezcoTitularGreet[]' type='checkbox' value='Esposo' onClick='mostrarTipoAgenciaDivGreet();'>"; }else{ greeting += "<input id='parentezcoTitularGreetEsposo' name='parentezcoTitularGreet[]' type='checkbox' value='Esposo' onClick='mostrarTipoAgenciaDivGreet();'>"; }
    greeting += "                               <label for='parentezcoTitularGreetEsposo' class='labelModal'>Esposo</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            if( greet.tipoParentezco && (greet.tipoParentezco).includes("Familiar") ){ greeting += "<input checked id='parentezcoTitularGreetFamiliar' name='parentezcoTitularGreet[]' type='checkbox' value='Familiar' onClick='mostrarTipoAgenciaDivGreet();'>"; }else{ greeting += "<input id='parentezcoTitularGreetFamiliar' name='parentezcoTitularGreet[]' type='checkbox' value='Familiar' onClick='mostrarTipoAgenciaDivGreet();'>"; }
    greeting += "                               <label for='parentezcoTitularGreetFamiliar' class='labelModal'>Familiar</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div class='modalScriptRow'>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            if( greet.tipoParentezco && (greet.tipoParentezco).includes("Hijos") ){ greeting += "<input checked id='parentezcoTitularGreetHijos' name='parentezcoTitularGreet[]' type='checkbox' value='Hijos' onClick='mostrarTipoAgenciaDivGreet();''>"; }else{ greeting += "<input id='parentezcoTitularGreetHijos' name='parentezcoTitularGreet[]' type='checkbox' value='Hijos' onClick='mostrarTipoAgenciaDivGreet();''>"; }
    greeting += "                               <label for='parentezcoTitularGreetHijos' class='labelModal'>Hijos</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            if( greet.tipoParentezco && (greet.tipoParentezco).includes("Padres") ){ greeting += "<input checked id='parentezcoTitularGreetPadres' name='parentezcoTitularGreet[]' type='checkbox' value='Padres' onClick='mostrarTipoAgenciaDivGreet();'>"; }else{ greeting += "<input id='parentezcoTitularGreetPadres' name='parentezcoTitularGreet[]' type='checkbox' value='Padres' onClick='mostrarTipoAgenciaDivGreet();'>"; }
    greeting += "                               <label for='parentezcoTitularGreetPadres' class='labelModal'>Padres</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div style='width: 25%;'>";
    greeting += "                           <div style='display: flex; align-items: center;'>";
                                            if( greet.tipoParentezco && (greet.tipoParentezco).includes("Otro") ){ greeting += "<input checked id='parentezcoTitularGreetOtro' name='parentezcoTitularGreet[]' type='checkbox' value='Otro' onClick='mostrarTipoAgenciaDivGreet();'>"; }else{ greeting += "<input id='parentezcoTitularGreetOtro' name='parentezcoTitularGreet[]' type='checkbox' value='Otro' onClick='mostrarTipoAgenciaDivGreet();'>"; }
    greeting += "                               <label for='parentezcoTitularGreetOtro' class='labelModal'>Otro</label>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "           </div>";
    greeting += "           <div id='tipoAgenciaGreetDiv' class='hidden'>";
    greeting += "               <div class='divInputScript' style='margin-top: 3%;'>";
    greeting += "                   <label class='labelModal'>2.2 Tipo de Agencia</label><br>";
    greeting += "                   <div class='divInputScript'>";
    greeting += "                       <div class='modalScriptRow' style='margin-bottom: 2%;'>";
    greeting += "                           <div style='width: 50%;'>";
    greeting += "                               <div style='display: flex; align-items: center;'>";
                                                if( greet.tipoAgencia && greet.tipoAgencia === "Abogado;Agencia de gobierno;Agente de bienes y raices;Contador;Empleadores"){ greeting += "<input checked id='tipoAgenciaGreetAll' name='tipoAgenciaGreet[]' type='checkbox' value='All' onClick='agenciaGreetCheckAll(this)'>"; }else{ greeting += "<input id='tipoAgenciaGreetAll' name='tipoAgenciaGreet[]' type='checkbox' value='All' onClick='agenciaGreetCheckAll(this)'>"; }
    greeting += "                                   <label for='tipoAgenciaGreetAll' class='labelModal'>All</label>";
    greeting += "                               </div>";
    greeting += "                           </div>";
    greeting += "                           <div style='width: 50%;'>";
    greeting += "                               <div style='display: flex; align-items: center;'>";
                                                if( greet.tipoAgencia && (greet.tipoAgencia).includes("Abogado")){ greeting += "<input checked id='tipoAgenciaGreetAbogado' name='tipoAgenciaGreet[]' type='checkbox' value='Abogado'>"; }else{ greeting += "<input id='tipoAgenciaGreetAbogado' name='tipoAgenciaGreet[]' type='checkbox' value='Abogado'>"; }
    greeting += "                                   <label for='tipoAgenciaGreetAbogado' class='labelModal'>Abogado</label>";
    greeting += "                               </div>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div class='modalScriptRow' style='margin-bottom: 2%;'>";
    greeting += "                           <div style='width: 50%;'>";
    greeting += "                               <div style='display: flex; align-items: center;'>";
                                                if( greet.tipoAgencia && (greet.tipoAgencia).includes("Contador")){ greeting += "<input checked id='tipoAgenciaGreetContador' name='tipoAgenciaGreet[]' type='checkbox' value='Contador'>"; }else{ greeting += "<input id='tipoAgenciaGreetContador' name='tipoAgenciaGreet[]' type='checkbox' value='Contador'>"; }
    greeting += "                                   <label for='tipoAgenciaGreetContador' class='labelModal'>Contador</label>";
    greeting += "                               </div>";
    greeting += "                           </div>";
    greeting += "                           <div style='width: 50%;'>";
    greeting += "                               <div style='display: flex; align-items: center;'>";
                                                if( greet.tipoAgencia && (greet.tipoAgencia).includes("Empleadores")){ greeting += "<input checked id='tipoAgenciaGreetEmpleadores' name='tipoAgenciaGreet[]' type='checkbox' value='Empleadores'>"; }else{ greeting += "<input id='tipoAgenciaGreetEmpleadores' name='tipoAgenciaGreet[]' type='checkbox' value='Empleadores'>"; }
    greeting += "                                   <label for='tipoAgenciaGreetEmpleadores' class='labelModal'>Empleadores</label>";
    greeting += "                               </div>";
    greeting += "                           </div>";
    greeting += "                       </div>";
    greeting += "                       <div class='modalScriptRow'>";
    greeting += "                       <div style='width: 50%;'>";
    greeting += "                               <div style='display: flex; align-items: center;'>";
                                                if( greet.tipoAgencia && (greet.tipoAgencia).includes("Agencia de gobierno")){ greeting += "<input checked id='tipoAgenciaGreetGobierno' name='tipoAgenciaGreet[]' type='checkbox' value='Agencia de gobierno'>"; }else{ greeting += "<input id='tipoAgenciaGreetGobierno' name='tipoAgenciaGreet[]' type='checkbox' value='Agencia de gobierno'>"; }
    greeting += "                                   <label for='tipoAgenciaGreetGobierno' class='labelModal'>Agencia de gobierno</label>";
    greeting += "                               </div>";
    greeting += "                           </div>";
    greeting += "                           <div style='width: 50%;'>";
    greeting += "                               <div style='display: flex; align-items: center;'>";
                                                if( greet.tipoAgencia && (greet.tipoAgencia).includes("Agente de bienes y raices")){ greeting += "<input checked id='tipoAgenciaGreetAgente' name='tipoAgenciaGreet[]' type='checkbox' value='Agente de bienes y raices'>"; }else{ greeting += "<input id='tipoAgenciaGreetAgente' name='tipoAgenciaGreet[]' type='checkbox' value='Agente de bienes y raices'>"; }
    greeting += "                                   <label for='tipoAgenciaGreetAgente' class='labelModal'>Agente de bienes y raíces</label>";
    greeting += "                               </div>";
    greeting += "                            </div>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "           </div>";
    greeting += "           <div id='personaLlamadaDiv' class='divInputScript' style='margin-top: 3%;'>";
    greeting += "               <label class='labelModal'>2.3 ¿La persona que hace la llamada tiene cuenta con nosotros?</label><br>";
    greeting += "               <div class='divInputScript'>";
    greeting += "                   <label class='labelModal' style='font-size: 10px;'>Search Account</label><br>";
    greeting += "                   <div style='position: relative;' id='accounts1'></div>";
    greeting += "               </div>";
    greeting += "               <div class='divInputScript'>";
    greeting += "                   <label class='labelModal' style='font-size: 10px;'>Search Contact</label><br>";
    greeting += "                   <div style='position: relative;' id='contacts1'></div>";
    greeting += "               </div>";
    greeting += "           </div>";
    greeting += "       </div>";
    greeting += "       <div class='divInputScript' style='margin-top: 3%;'>";
    greeting += "           <label class='labelModal'>3. ¿Qué tipo de cliente es?</label><br>";
    greeting += "           <select id='tipoClienteGreet' class='inputModal'>";
                            if((!greet.ultimoApoyo) || greet.ultimoApoyo === ' '){ greeting += "<option selected value=' '>None</option>"; }else{ greeting += "<option value=' '>None</option>"; }
                            if(greet.ultimoApoyo && greet.ultimoApoyo === "Cliente Activo"){ greeting += "<option selected value='Cliente Activo'>Cliente Activo</option>"; }else{ greeting += "<option value='Cliente Activo'>Cliente Activo</option>"; }
                            if(greet.ultimoApoyo && greet.ultimoApoyo === "Cliente Inactivo"){ greeting += "<option selected value='Cliente Inactivo'>Cliente Inactivo</option>"; }else{ greeting += "<option value='Cliente Inactivo'>Cliente Inactivo</option>"; }
                            if(greet.ultimoApoyo && greet.ultimoApoyo === "Cliente Nuevo"){ greeting += "<option selected value='Cliente Nuevo'>Cliente Nuevo</option>"; }else{ greeting += "<option value='Cliente Nuevo'>Cliente Nuevo</option>"; }
    greeting += "           </select>";
    greeting += "       </div>";
    greeting += "       <div class='divInputScript' style='margin-top: 3%;'>";
    greeting += "           <label class='labelModal'>4. ¿En que años le hemos asistido con sus impuestos?</label><br>";
    greeting += "           <div class='divInputScript'>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        var anioImpuestosAll = '2022;2021;2020;2019;2018;2017;2016;2024;2023;2027;2026;2025';
                                        if(greet.anioImpuestos && greet.anioImpuestos === anioImpuestosAll){ greeting += "<input checked id='asistidoImpuestosAll' name='asistidoImpuestos[]' type='checkbox' value='All' onClick='asistidoImpuestosCheckAll(this)'>"; }else{ greeting += "<input id='asistidoImpuestosAll' name='asistidoImpuestos[]' type='checkbox' value='All' onClick='asistidoImpuestosCheckAll(this)'>"; }
    greeting += "                           <label for='asistidoImpuestosAll' class='labelModal'>All</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2027") ){ greeting += "<input checked id='asistidoImpuestos2027' name='asistidoImpuestos[]' type='checkbox' value='2027'>"; }else{ greeting += "<input id='asistidoImpuestos2027' name='asistidoImpuestos[]' type='checkbox' value='2027'>"; }
    greeting += "                           <label for='asistidoImpuestos2027' class='labelModal'>2027</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2026") ){ greeting += "<input checked id='asistidoImpuestos2026' name='asistidoImpuestos[]' type='checkbox' value='2026'>"; }else{ greeting += "<input id='asistidoImpuestos2026' name='asistidoImpuestos[]' type='checkbox' value='2026'>"; }
    greeting += "                           <label for='asistidoImpuestos2026' class='labelModal'>2026</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2025") ){ greeting += "<input checked id='asistidoImpuestos2025' name='asistidoImpuestos[]' type='checkbox' value='2025'>"; }else{ greeting += "<input id='asistidoImpuestos2025' name='asistidoImpuestos[]' type='checkbox' value='2025'>"; }
    greeting += "                           <label for='asistidoImpuestos2025' class='labelModal'>2025</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2024") ){ greeting += "<input checked id='asistidoImpuestos2024' name='asistidoImpuestos[]' type='checkbox' value='2024'>"; }else{ greeting += "<input id='asistidoImpuestos2024' name='asistidoImpuestos[]' type='checkbox' value='2024'>"; }
    greeting += "                           <label for='asistidoImpuestos2024' class='labelModal'>2024</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2023") ){ greeting += "<input checked id='asistidoImpuestos2023' name='asistidoImpuestos[]' type='checkbox' value='2023'>"; }else{ greeting += "<input id='asistidoImpuestos2023' name='asistidoImpuestos[]' type='checkbox' value='2023'>"; }
    greeting += "                           <label for='asistidoImpuestos2023' class='labelModal'>2023</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2022") ){ greeting += "<input checked id='asistidoImpuestos2022' name='asistidoImpuestos[]' type='checkbox' value='2022'>"; }else{ greeting += "<input id='asistidoImpuestos2022' name='asistidoImpuestos[]' type='checkbox' value='2022'>"; }
    greeting += "                           <label for='asistidoImpuestos2022' class='labelModal'>2022</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2021") ){ greeting += "<input checked id='asistidoImpuestos2021' name='asistidoImpuestos[]' type='checkbox' value='2021'>"; }else{ greeting += "<input id='asistidoImpuestos2021' name='asistidoImpuestos[]' type='checkbox' value='2021'>"; }
    greeting += "                           <label for='asistidoImpuestos2021' class='labelModal'>2021</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2020") ){ greeting += "<input checked id='asistidoImpuestos2020' name='asistidoImpuestos[]' type='checkbox' value='2020'>";}else{ greeting += "<input id='asistidoImpuestos2020' name='asistidoImpuestos[]' type='checkbox' value='2020'>"; }
    greeting += "                           <label for='asistidoImpuestos2020' class='labelModal'>2020</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2019") ){ greeting += "<input checked id='asistidoImpuestos2019' name='asistidoImpuestos[]' type='checkbox' value='2019'>"; }else{ greeting += "<input id='asistidoImpuestos2019' name='asistidoImpuestos[]' type='checkbox' value='2019'>"; }
    greeting += "                           <label for='asistidoImpuestos2019' class='labelModal'>2019</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2018") ){ greeting += "<input checked id='asistidoImpuestos2018' name='asistidoImpuestos[]' type='checkbox' value='2018'>"; }else{ greeting += "<input id='asistidoImpuestos2018' name='asistidoImpuestos[]' type='checkbox' value='2018'>"; }
    greeting += "                           <label for='asistidoImpuestos2018' class='labelModal'>2018</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2017") ){greeting += "<input checked id='asistidoImpuestos2017' name='asistidoImpuestos[]' type='checkbox' value='2017'>"; }else{ greeting += "<input id='asistidoImpuestos2017' name='asistidoImpuestos[]' type='checkbox' value='2017'>"; }
    greeting += "                           <label for='asistidoImpuestos2017' class='labelModal'>2017</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.anioImpuestos && (greet.anioImpuestos).includes("2016") ){ greeting += "<input checked id='asistidoImpuestos2016' name='asistidoImpuestos[]' type='checkbox' value='2016'>"; }else{ greeting += "<input id='asistidoImpuestos2016' name='asistidoImpuestos[]' type='checkbox' value='2016'>"; }
    greeting += "                           <label for='asistidoImpuestos2016' class='labelModal'>2016</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "           </div>";
    greeting += "       </div>";
    greeting += "       <div class='divInputScript' style='margin-top: 3%;'>";
    greeting += "           <label class='labelModal'>5. ¿En que años le vamos a apoyar con sus impuestos?</label><br>";
    greeting += "           <div class='divInputScript'>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        var anioApoyoAll = '2022;2021;2020;2019;2018;2017;2016;2015;2014;2013;2024;2023;2027;2026;2025';
                                        if( greet.apoyo && greet.apoyo === anioApoyoAll ){ greeting += "<input checked id='apoyarImpuestosAll' name='apoyarImpuestos[]' type='checkbox' value='All' onClick='apoyarImpuestosCheckAll(this)'>"; }else{ greeting += "<input id='apoyarImpuestosAll' name='apoyarImpuestos[]' type='checkbox' value='All' onClick='apoyarImpuestosCheckAll(this)'>"; }
    greeting += "                           <label for='apoyarImpuestosAll' class='labelModal'>All</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2027") ){ greeting += "<input checked id='apoyarImpuestos2027' name='apoyarImpuestos[]' type='checkbox' value='2027'>"; }else{ greeting += "<input id='apoyarImpuestos2027' name='apoyarImpuestos[]' type='checkbox' value='2027'>"; }
    greeting += "                           <label for='apoyarImpuestos2027' class='labelModal'>2027</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2026") ){ greeting += "<input checked id='apoyarImpuestos2026' name='apoyarImpuestos[]' type='checkbox' value='2026'>"; }else{ greeting += "<input id='apoyarImpuestos2026' name='apoyarImpuestos[]' type='checkbox' value='2026'>"; }
    greeting += "                           <label for='apoyarImpuestos2026' class='labelModal'>2026</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2025") ){ greeting += "<input checked id='apoyarImpuestos2025' name='apoyarImpuestos[]' type='checkbox' value='2025'>";}else{ greeting += "<input id='apoyarImpuestos2025' name='apoyarImpuestos[]' type='checkbox' value='2025'>"; }
    greeting += "                           <label for='apoyarImpuestos2025' class='labelModal'>2025</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2024") ){ greeting += "<input checked id='apoyarImpuestos2024' name='apoyarImpuestos[]' type='checkbox' value='2024'>"; }else{ greeting += "<input id='apoyarImpuestos2024' name='apoyarImpuestos[]' type='checkbox' value='2024'>"; }
    greeting += "                           <label for='apoyarImpuestos2024' class='labelModal'>2024</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2023") ){ greeting += "<input checked id='apoyarImpuestos2023' name='apoyarImpuestos[]' type='checkbox' value='2023'>"; }else{ greeting += "<input id='apoyarImpuestos2023' name='apoyarImpuestos[]' type='checkbox' value='2023'>"; }
    greeting += "                           <label for='apoyarImpuestos2023' class='labelModal'>2023</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2022") ){ greeting += "<input checked id='apoyarImpuestos2022' name='apoyarImpuestos[]' type='checkbox' value='2022'>"; }else{ greeting += "<input id='apoyarImpuestos2022' name='apoyarImpuestos[]' type='checkbox' value='2022'>"; }
    greeting += "                           <label for='apoyarImpuestos2022' class='labelModal'>2022</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2021") ){ greeting += "<input checked id='apoyarImpuestos2021' name='apoyarImpuestos[]' type='checkbox' value='2021'>"; }else{ greeting += "<input id='apoyarImpuestos2021' name='apoyarImpuestos[]' type='checkbox' value='2021'>"; }
    greeting += "                           <label for='apoyarImpuestos2021' class='labelModal'>2021</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2020") ){ greeting += "<input checked id='apoyarImpuestos2020' name='apoyarImpuestos[]' type='checkbox' value='2020'>"; }else{ greeting += "<input id='apoyarImpuestos2020' name='apoyarImpuestos[]' type='checkbox' value='2020'>"; }
    greeting += "                           <label for='apoyarImpuestos2020' class='labelModal'>2020</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2019") ){ greeting += "<input checked id='apoyarImpuestos2019' name='apoyarImpuestos[]' type='checkbox' value='2019'>"; }else{ greeting += "<input id='apoyarImpuestos2019' name='apoyarImpuestos[]' type='checkbox' value='2019'>"; }
    greeting += "                           <label for='apoyarImpuestos2019' class='labelModal'>2019</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2018") ){ greeting += "<input checked id='apoyarImpuestos2018' name='apoyarImpuestos[]' type='checkbox' value='2018'>"; }else{ greeting += "<input id='apoyarImpuestos2018' name='apoyarImpuestos[]' type='checkbox' value='2018'>"; }
    greeting += "                           <label for='apoyarImpuestos2018' class='labelModal'>2018</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2017") ){ greeting += "<input checked id='apoyarImpuestos2017' name='apoyarImpuestos[]' type='checkbox' value='2017'>"; }else{ greeting += "<input id='apoyarImpuestos2017' name='apoyarImpuestos[]' type='checkbox' value='2017'>"; }
    greeting += "                           <label for='apoyarImpuestos2017' class='labelModal'>2017</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "               <div class='modalScriptRow'>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2016") ){ greeting += "<input checked id='apoyarImpuestos2016' name='apoyarImpuestos[]' type='checkbox' value='2016'>"; }else{ greeting += "<input id='apoyarImpuestos2016' name='apoyarImpuestos[]' type='checkbox' value='2016'>"; }
    greeting += "                           <label for='apoyarImpuestos2016' class='labelModal'>2016</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2015") ){ greeting += "<input checked id='apoyarImpuestos2015' name='apoyarImpuestos[]' type='checkbox' value='2015'>"; }else{ greeting += "<input id='apoyarImpuestos2015' name='apoyarImpuestos[]' type='checkbox' value='2015'>"; }
    greeting += "                           <label for='apoyarImpuestos2015' class='labelModal'>2015</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2014") ){ greeting += "<input checked id='apoyarImpuestos2014' name='apoyarImpuestos[]' type='checkbox' value='2014'>"; }else{ greeting += "<input id='apoyarImpuestos2014' name='apoyarImpuestos[]' type='checkbox' value='2014'>"; }
    greeting += "                           <label for='apoyarImpuestos2014' class='labelModal'>2014</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "                   <div style='width: 25%;'>";
    greeting += "                       <div style='display: flex; align-items: center;'>";
                                        if( greet.apoyo && (greet.apoyo).includes("2013") ){ greeting += "<input checked id='apoyarImpuestos2013' name='apoyarImpuestos[]' type='checkbox' value='2013'>"; }else{ greeting += "<input id='apoyarImpuestos2013' name='apoyarImpuestos[]' type='checkbox' value='2013'>"; }
    greeting += "                           <label for='apoyarImpuestos2013' class='labelModal'>2013</label>";
    greeting += "                       </div>";
    greeting += "                   </div>";
    greeting += "               </div>";
    greeting += "           </div>";
    greeting += "       </div>";
    greeting += "   </div>";
    greeting += "   <div style='width: 5%;'></div>";
    greeting += "   <div style='width: 45%;'>";
    greeting += "       <div class='modalScriptInfo'>";
    greeting += "           <h4 style='margin-top: 0;'><b>Tipo de Cliente</b></h4>";
    greeting += "           <span class='labelInfo'><b>Cliente Activo </b>es alguien que es considerado cliente actual porque se le ayudamos a preparar impuestos 2021 o le ayudamos con la preparación de impuestos en menos de 12 meses.</span><br></br>";
    greeting += "           <span class='labelInfo'><b>Cliente Inactivo </b>es alguien que es considerado cliente retorno porque se le ayudamos a preparar impuestos 2020 o le ayudamos con la preparación de impuestos en los ultimo 5 anos.</span><br></br>";
    greeting += "           <span class='labelInfo'><b>Cliente Nuevo </b>es alguien que es considerado cliente nuevo porque que no lo encontramos en Salesforce y nunca se le ha ayudado con la preparación de impuestos o ya paso mas de 6 anos desde la ultima vez.</span>";
    greeting += "       </div>";
    greeting += "   </div>";
    greeting += "</div>";
        }
        document.getElementById("modalScriptGreeting").innerHTML = greeting;
        
        const llamadaAccountName = document.createElement("input");
        llamadaAccountName.setAttribute("id", "llamadaAccountName"); llamadaAccountName.setAttribute("class", "inputModal");
        llamadaAccountName.setAttribute("placeholder", "Search...");
        llamadaAccountName.onkeyup = function() { functions.accounts(this.value); };

        const llamadaAccountGreet = document.createElement("input");
        llamadaAccountGreet.setAttribute("id", "llamadaAccountGreet"); llamadaAccountGreet.setAttribute("name", "llamadaAccountGreet"); llamadaAccountGreet.setAttribute("class", "hidden");

        const accountResultados = document.createElement("div");
        accountResultados.setAttribute("id", "accountResultados");

        document.getElementById("accounts1").appendChild(llamadaAccountName);
        document.getElementById("accounts1").appendChild(llamadaAccountGreet);
        document.getElementById("accounts1").appendChild(accountResultados);

        const llamadaContactName = document.createElement("input");
        llamadaContactName.setAttribute("id", "llamadaContactName"); llamadaContactName.setAttribute("class", "inputModal");
        llamadaContactName.setAttribute("placeholder", "Search...");
        llamadaContactName.onkeyup = function() { functions.contacts(this.value); };

        const llamadaContactGreet = document.createElement("input");
        llamadaContactGreet.setAttribute("id", "llamadaContactGreet"); llamadaContactGreet.setAttribute("name", "llamadaContactGreet"); llamadaContactGreet.setAttribute("class", "hidden");

        const contactResultados = document.createElement("div");
        contactResultados.setAttribute("id", "contactResultados");

        document.getElementById("contacts1").appendChild(llamadaContactName);
        document.getElementById("contacts1").appendChild(llamadaContactGreet);
        document.getElementById("contacts1").appendChild(contactResultados);


        checkGreetValues();
        functions.accountList(greet.recordId);
        functions.contactList(greet.recordId);
    
    //2. Authentication
        var authentication = "<div class='divTituloModal'><h4 class='tituloModal'>2. Authentication</h4></div>";
authentication += " <div class='divInputScript'>";
authentication += "     <div class='divInputScript'><label class='labelModal'>1. ¿Su nombre es: <span id='spanFirstName'></span> <span id='spanLastName'></span>?</label></div>";
authentication += "     <div class='modalScriptRow'>";
authentication += "         <div class='divRadio'>";
authentication += "             <input checked type='radio' id='nombreAuthSi' name='nombreAuth' value='Si' onClick='namesAuth();'/>";
authentication += "             <label class='labelModal' for='nombreAuthSi'>Si</label>";
authentication += "         </div>";
authentication += "         <div class='divRadio' style='margin-right:2%;'>";
authentication += "             <input type='radio' id='nombreAuthNo' name='nombreAuth' value='No' onClick='namesAuth();'/>";
authentication += "             <label class='labelModal' for='nombreAuthNo'>No</label>";
authentication += "         </div>";
authentication += "         <div id='firstNameAuthDiv' class='hidden' style='width:30%;margin-right:5%;'>";
authentication += "             <input style='width: 100%;' id='firstNameAuth' name='firstNameAuth' placeholder='First Name'/>";
authentication += "         </div>";
authentication += "         <div id='lastNameAuthDiv' class='hidden' style='width:30%;'>";
authentication += "             <input style='width: 100%;' id='lastNameAuth' name='lastNameAuth' placeholder='Last Name'/>";
authentication += "         </div>";
authentication += "     </div>";
authentication += " </div>";
authentication += " <div class='divInputScript'>";
authentication += "     <div class='divInputScript'><label class='labelModal'>2. ¿Su número telefónico: <span id='spanPhone'></span>, es correcto?</label></div>";
authentication += "     <div class='modalScriptRow'>";
authentication += "         <div class='divRadio'>";
authentication += "             <input checked type='radio' id='telefonoAuthSi' name='telefonoAuth' value='Si' onClick='phoneAuth();'/>";
authentication += "             <label class='labelModal' for='telefonoAuthSi'>Si</label>";
authentication += "         </div>";
authentication += "         <div class='divRadio' style='margin-right: 2%;'>";
authentication += "             <input type='radio' id='telefonoAuthNo' name='telefonoAuth' value='No' onClick='phoneAuth();'/>";
authentication += "             <label class='labelModal' for='telefonoAuthNo'>No</label>";
authentication += "         </div>";
authentication += "         <div id='phoneNumberAuthDiv' class='hidden' style='width:30%;margin-right:5%;'>";
authentication += "             <input style='width: 100%;' id='phoneNumberAuth' name='phoneNumberAuth' placeholder='Phone Number'/>";
authentication += "         </div>";
authentication += "         <div id='phoneNotesAuthDiv' class='hidden' style='width:30%;'>";
authentication += "             <input style='width: 100%;' id='phoneNotesAuth' name='phoneNotesAuth' placeholder='Agregar Nota'/>";
authentication += "         </div>";
authentication += "     </div>";
authentication += " </div>";
authentication += " <div class='divInputScript'>";
authentication += "     <div class='divInputScript'><label class='labelModal'>3. ¿Su correo electrónico: <span id='spanEmail'></span>, es correcto?</label></div>";
authentication += "     <div class='modalScriptRow'>";
authentication += "         <div class='divRadio'>";
authentication += "             <input checked type='radio' id='correoAuthSi' name='correoAuth' value='Si' onClick='emailAuth();'/>";
authentication += "             <label class='labelModal' for='correoAuthSi'>Si</label>";
authentication += "         </div>";
authentication += "         <div class='divRadio' style='margin-right: 2%;'>";
authentication += "             <input type='radio' id='correoAuthNo' name='correoAuth' value='No' onClick='emailAuth();'/>";
authentication += "             <label class='labelModal' for='correoAuthNo'>No</label>";
authentication += "         </div>";
authentication += "         <div id='emailAuthDiv' class='hidden' style='width:65%;'>";
authentication += "             <input type='email' style='width: 100%;' id='emailAuth' name='primerNombreAuth' placeholder='Email'/>";
authentication += "         </div>";
authentication += "     </div>";
authentication += " </div>";
authentication += " <div class='divInputScript'>";
authentication += "     <div class='divInputScript'><label class='labelModal'>4. ¿Su número de seguro social: <span id='spanSSN'></span>, es correcto?</label></div>";
authentication += "     <div class='modalScriptRow'>";
authentication += "         <div class='divRadio'>";
authentication += "             <input checked type='radio' id='seguroAuthSi' name='seguroAuth' value='Si' onClick='SSNAuth();'/>";
authentication += "             <label class='labelModal' for='seguroAuthSi'>Si</label>";
authentication += "         </div>";
authentication += "         <div class='divRadio' style='margin-right: 2%;'>";
authentication += "             <input type='radio' id='seguroAuthNo' name='seguroAuth' value='No' onClick='SSNAuth();'/>";
authentication += "             <label class='labelModal' for='seguroAuthNo'>No</label>";
authentication += "         </div>";
authentication += "         <div id='ssnAuthDiv' class='hidden' style='width:30%;'>";
authentication += "             <input style='width: 100%;' id='ssnAuth' name='ssnAuth' placeholder='SSN'/>";
authentication += "         </div>";
authentication += "     </div>";
authentication += " </div>";
authentication += " <div class='divInputScript'>";
authentication += "     <div class='divInputScript'><label class='labelModal'>5. ¿Su dirección: <span id='spanStreet'></span> <span id='spanCity'></span> <span id='spanState'></span> <span id='spanCountry'></span> <span id='spanPostalCode'></span>, es correcta?</label></div>";
authentication += "     <div class='modalScriptRow'>";
authentication += "         <div class='divRadio'>";
authentication += "             <input checked type='radio' id='direccionAuthSi' name='direccionAuth' value='Si' onClick='addressAuth()'/>";
authentication += "             <label class='labelModal' for='direccionAuthSi'>Si</label>";
authentication += "         </div>";
authentication += "         <div class='divRadio' style='margin-right: 2%;'>";
authentication += "             <input type='radio' id='direccionAuthNo' name='direccionAuth' value='No' onClick='addressAuth()'/>";
authentication += "             <label class='labelModal' for='direccionAuthNo'>No</label>";
authentication += "         </div>";
authentication += "     </div>";
authentication += "     <div id='adressAuthDiv' class='modalScriptRow hidden'><br><br><br>";
authentication += "         <div style='width:20%; margin-right: 3%;'>";
authentication += "             <input style='width: 100%;' id='streetAuth' name='streetAuth' placeholder='Street'/>";
authentication += "         </div>";
authentication += "         <div  style='width:20%; margin-right: 3%;'>";
authentication += "             <input style='width: 100%;' id='cityAuth' name='cityAuth' placeholder='City'/>";
authentication += "         </div>";
authentication += "         <div style='width:15%; margin-right: 3%;'>";
authentication += "             <input style='width: 100%;' id='stateAuth' name='stateAuth' placeholder='State'/>";
authentication += "         </div>";
authentication += "         <div style='width:10%; margin-right: 3%;'>";
authentication += "             <input style='width: 100%;' id='countryAuth' name='countryAuth' placeholder='Country'/>";
authentication += "         </div>";
authentication += "         <div style='width:10%;'>";
authentication += "             <input style='width: 100%;' id='postalCodeAuth' name='postalCodeAuth' placeholder='Postal Code'/>";
authentication += "         </div>";
authentication += "     </div>";
authentication += " </div>";
authentication += " <div class='divInputScript'>";
authentication += "     <div class='divInputScript'><label class='labelModal'>6. ¿Su fecha de nacimiento es: <span id='spanDOB'></span>?</label></div>";
authentication += "     <div class='modalScriptRow'>";
authentication += "         <div class='divRadio'>";
authentication += "             <input checked type='radio' id='fechaAuthSi' name='fechaAuth' value='Si' onClick='fechaAuth();'/>";
authentication += "             <label class='labelModal' for='fechaAuthSi'>Si</label>";
authentication += "         </div>";
authentication += "         <div class='divRadio' style='margin-right: 2%;'>";
authentication += "             <input type='radio' id='fechaAuthNo' name='fechaAuth' value='No' onClick='fechaAuth();'/>";
authentication += "             <label class='labelModal' for='fechaAuthNo'>No</label>";
authentication += "         </div>";
authentication += "         <div id='fechaAuthDiv' class='hidden' style='width: 30%;'>";
authentication += "             <input style='width: 100%;' id='dobAuth' name='dobAuth' type='date'>";
authentication += "         </div>";
authentication += "     </div>";
authentication += " </div>";
            document.getElementById("modalScriptAuthentication").innerHTML = authentication;
        
    
    //4. Probe for Root Cause
    var probe = "";
    probe += "<div id='homeDivProbe' class='ModalScriptRow probe_active' style='align-items: normal !important; text-align:justify;'>";
    probe += "  <div class='divTituloModal'><h5>Home</h5></div><input id='scriptCaseId' class='hidden'>";
    probe += "  <div style='width:80%; padding: 10px;'>";
    probe += "      <h6 style='margin: 0px 0px 5px 0px;'><b>Overview:</b></h6>";
    probe += "      <span class='labelInfo'>1 - En este momento le hare una serie de preguntas/ o una entrevista que ayudara en la preparación de impuestos.</span><br></br>";
    probe += "      <h6 style='margin: 0px 0px 5px 0px;'><b>Beneficio:</b></h6>";
    probe += "      <span class='labelInfo'>1.1 - Esto nos ayudara a entender algunos puntos importantes en su declaración de impuestos.</span><br></br>";
    probe += "      <h6 style='margin: 0px 0px 5px 0px;'><b>Argumentos:</b></h6>";
    probe += "      <span class='labelInfo'>1.2 - Las preguntas tendrán relación con cambios en eventos familiares, ingresos, dependientes o lista de deducciones calificables.</span><br></br>";
    probe += "      <h6 style='margin: 0px 0px 5px 0px;'><b>Acciones:</b></h6>";
    probe += "      <span class='labelInfo'>1.3 - Vamos a realizar una entrevista de exploración de su situación fiscal para el año que se va a declarar</span><br></br>";
    probe += "  </div>";
    probe += "  <div style='width:80%; padding:10px;'>";
    probe += "      <div class='divInputScript'>";
    probe += "          <label class='labelModal'>Notas</label><br><textarea id='notasHomeProbe' name='notasHomeProbe' class='inputModal' style='width:100%;' onkeyup='notasHome(this)'></textarea>";
    probe += "      </div>";
    probe += "  </div>";
    probe += "</div>";
    probe += "<div id='taxinfoDivProbe' class='probe_hidden' style='align-items: normal !important'>";
    probe += "  <div class='divTituloModal'><h5>Taxpayer Info</h5></div>";
    probe += "  <span style='width:80%;display:block;' class='labelModal'>Han habido cambios de nombre o en el numero que usa para reportar sus impuestos. Esto puede pasar cuando se casan o cambios migratorios.</span><br></br>";
    probe += "  <div class='width:80%'>";
    probe += "      <div class='divInputScript'>";
    probe += "          <label style='width:80%;display:block;' class='labelModal'>2 - ¿Cambió sus nombres legalmente el año anterior por matrimonio o después de proceso migratorio?</label>";
    probe += "          <div class='modalScriptRow'>";
    probe += "              <div class='divRadio col-6'>";
                                probe += "<input type='radio' id='nombreTaxInfoProbeSi' name='nombreTaxInfoProbe' value='Si'/>";
    probe += "                  <label class='labelModal' for='nombreTaxInfoProbeSi'>Si</label>";
    probe += "              </div>";
    probe += "              <div class='divRadio col-6'>";
                                probe += "<input type='radio' id='nombreTaxInfoProbeNo' name='nombreTaxInfoProbe' value='No'/>";
    probe += "                  <label class='labelModal' for='nombreTaxInfoProbeNo'>No</label>";
    probe += "              </div>";
    probe += "          </div><br>";
    probe += "          <div class='divInputScript'>";
    probe += "              <label class='labelModal'>2.1 - ¿Cambió de seguro social?</label>";
    probe += "          </div>";
    probe += "          <div class='modalScriptRow'>";
    probe += "              <div class='divRadio col-6'>";
                                probe += "<input type='radio' id='seguroTaxInfoProbeSi' name='seguroTaxInfoProbe' value='Si'/>";
    probe += "                  <label class='labelModal' for='seguroTaxInfoProbeSi'>Si</label>";
    probe += "              </div>";
    probe += "              <div class='divRadio col-6'>";
                                probe += "<input type='radio' id='seguroTaxInfoProbeNo' name='seguroTaxInfoProbe' value='No'/>";
    probe += "                  <label class='labelModal' for='seguroTaxInfoProbeNo'>No</label>";
    probe += "              </div>";
    probe += "          </div>";
    probe += "      </div>";
    probe += "  </div><br>";
    probe += "  <div style='width: 80%;'>";
    probe += "      <div class='divInputScript'>";
    probe += "          <label class='labelModal'>Notas</label><br>";
    probe += "          <textarea id='notasTaxInfoProbe' name='notasTaxInfoProbe' class='inputModal' style='width:100%;' onkeyup='notasTaxInfo(this)'></textarea>";
    probe += "      </div>";
    probe += "  </div>";
probe += "  </div>";
probe += "  <div id='filingDivProbe' class='probe_hidden'>";
probe += "      <div class='divTituloModal'><h5>Filing</h5></div>";
probe += "      <div class='width:80%'>";
probe += "          <div class='divInputScript'>";
probe += "              <label style='width:80%;display:block;' class='labelModal'>3 - El estatus que mejor describe su estado civil</label>";
probe += "          </div>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio col-6' style='width:30%'>";
                            probe += "<input type='radio' id='estadocivilFilingProbeJefe' name='estadocivilFilingProbe' value='Jefe de familia' onClick='casadoAuth();'/>";
probe += "                  <label class='labelModal' for='estadocivilFilingProbeJefe'>Jefe de familia</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='estadocivilFilingProbeCasado' name='estadocivilFilingProbe' value='Casado' onClick='casadoAuth();'/>";
probe += "                  <label class='labelModal' for='estadocivilFilingProbeCasado'>Casado</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='estadocivilFilingProbeSoltero' name='estadocivilFilingProbe' value='Soltero' onClick='casadoAuth();'/>";
probe += "                  <label class='labelModal' for='estadocivilFilingProbeSoltero'>Soltero</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='estadocivilFilingProbeViudo' name='estadocivilFilingProbe' value='Viudo' onClick='casadoAuth();'/>";
probe += "                  <label class='labelModal' for='estadocivilFilingProbeViudo'>Viudo</label>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div id='casadoDiv' class='hidden'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>3.1 - ¿Tiene su certificado de matrimonio?</label>";
probe += "          </div>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio col-6'>";
                            probe += "<input type='radio' id='certificadoFilingProbeSi' name='certificadoFilingProbe' value='Si'/>";
probe += "                  <label class='labelModal' for='certificadoFilingProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio col-6'>";
                            probe += "<input type='radio' id='certificadoFilingProbeNo' name='certificadoFilingProbe' value='No'/>";
probe += "                  <label class='labelModal' for='certificadoFilingProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>3.2 - ¿Hay ingresos que su esposo/a reportara?</label>";
probe += "          </div>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio col-6'>";
                            probe += "<input type='radio' id='ingresosFilingProbeSi' name='ingresosFilingProbe' value='Si' onClick='notaIngresoEsposo();'/>";
probe += "                  <label class='labelModal' for='ingresosFilingProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio col-6'>";
                            probe += "<input type='radio' id='ingresosFilingProbeNo' name='ingresosFilingProbe' value='No' onClick='notaIngresoEsposo();'/>";
probe += "                  <label class='labelModal' for='ingresosFilingProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div id='notaIngresoEsposoDiv' class='hidden' style='width: 80%;'>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>3.2.1 - Nota que quiere compartir sobre ingreso de esposo/a</label><br>";
probe += "                  <textarea id='notaIngresoEsposo' name='notaIngresoEsposo' class='inputModal' style='width:100%;'></textarea>";
probe += "              </div><br>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas</label><br>";
probe += "              <textarea id='notasFilingProbe' name='notasFilingProbe' class='inputModal' style='width:100%;' onkeyup='notasFiling(this)'></textarea>";
probe += "          </div><br>";
probe += "      </div>";
probe += "  </div>";

probe += "  <div id='dependentsDivProbe' class='probe_hidden'>";
probe += "      <div style='text-align: center; margin-bottom: 10px;'><h5>Dependents</h5></div>";
probe += "      <div class='divInputScript'>";
probe += "          <label style='width:80%;display:block;' class='labelModal'>4 - ¿Va a declarar dependientes como sus hijos, padres o algun familiar que económicamente o legalmente dependa de usted en mas de 50%?</label>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width:20%'>";
                            probe += "<input type='radio' id='dependienteDependentsProbeSi' name='dependienteDependentsProbe' value='Si' onClick='dependentsDiv();'/>";
probe += "                  <label class='labelModal' for='dependienteDependentsProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='dependienteDependentsProbeNo' name='dependienteDependentsProbe' value='No' onClick='dependentsDiv();'/>";
probe += "                  <label class='labelModal' for='dependienteDependentsProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div id='dependentsDivSi' class='hidden'>";
probe += "          <div class='divTituloModal2'><h5>Changes</h5></div>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>4.1 - ¿Va a agregar o retirar algun dependiente?</label>";
probe += "          </div>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width: 20%;'>";
                            probe += "<input type='radio' id='changeDependentProbeAgregar' name='changeDependentProbe' value='Agregar' onClick='agregarDependientesDiv();'/>";
probe += "                  <label class='labelModal' for='changeDependentProbeAgregar'>Agregar</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width: 20%;'>";
                            probe += "<input type='radio' id='changeDependentProbeRetirar' name='changeDependentProbe' value='Retirar' onClick='agregarDependientesDiv();'/>";
probe += "                  <label class='labelModal' for='changeDependentProbeRetirar'>Retirar</label>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div id='agregarDependientesDiv' class='hidden'>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>4.1.1 - ¿Cuántos dependientes desea agregar?</label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div class='modalScriptRow'>";
probe += "                      <div class='col_2'>";
probe += "                          <input style='width:100%;' type='number' id='agregarChangeProbe' name='agregarChangeProbe' min='1' max='10'/>";
probe += "                      </div>";
probe += "                  </div>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>4.1.2 - Nombre de cada dependiente que va a agregar</label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div class='modalScriptRow'>";
probe += "                      <div style='width: 60%;'>";
probe += "                          <textarea style='width: 100%;' name='nombresAgregarChangeProbe' id='nombresAgregarChangeProbe'></textarea>";
probe += "                      </div>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div>";
probe += "          <div id='retirarDependientesDiv' class='hidden'>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>4.1.3 - ¿Cuántos dependientes desea retirar?</label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div class='col_2'>";
probe += "                      <input style='width:100%;' type='number' id='retirarChangeProbe' name='retirarChangeProbe' min='1' max='10'/>";
probe += "                  </div>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>4.1.4 - Nombre de cada dependiente que va a retirar</label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div style='width: 60%;'>";
probe += "                      <textarea style='width: 100%;' name='nombresRetirarChangeProbe' id='nombresRetirarChangeProbe'></textarea>";
probe += "                  </div>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>4.1.5 Mencionó que retira un dependiente, ¿Me podría compartir el motivo? </label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div class='modalScriptRow'>";
probe += "                      <div class='divRadio' style='width:30%'>";
                                    probe += "<input type='radio' id='motivoRetirarProbeEdad' name='motivoRetirarProbe' value='Ya es mayor de edad y trabaja'/>";
probe += "                          <label class='labelModal' for='motivoRetirarProbeEdad'>Ya es mayor de edad y trabaja</label>";
probe += "                      </div>";
probe += "                      <div class='divRadio' style='width:25%;'>";
                                    probe += "<input type='radio' id='motivoRetirarProbeSolo' name='motivoRetirarProbe' value='Va a declarar por si solo'/>";
probe += "                          <label class='labelModal' for='motivoRetirarProbeSolo'>Va a declarar por si solo</label>";
probe += "                      </div>";
probe += "                      <div class='divRadio' style='width:25%;'>";
                                    probe += "<input type='radio' id='motivoRetirarProbeVive' name='motivoRetirarProbe' value='Ya no vive con el'/>";
probe += "                          <label class='labelModal' for='motivoRetirarProbeVive'>Ya no vive con él</label>";
probe += "                      </div>";
probe += "                      <div class='divRadio' style='width:20%;'>";
                                    probe += "<input type='radio' id='motivoRetirarProbeFallecio' name='motivoRetirarProbe' value='Fallecio'/>";
probe += "                          <label class='labelModal' for='motivoRetirarProbeFallecio'>Fallecio</label>";
probe += "                      </div>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div class='divTituloModal2'><h5>Income</h5></div>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>4.2 - ¿Alguno de sus dependientes trabaja o trabajó?</label>";
probe += "          </div>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width: 20%;'>";
                            probe += "<input type='radio' id='trabajaIncomeDependentProbeSi' name='trabajaIncomeDependentProbe' value='Si' onClick='mostrarCantidadDineroDiv()'/>";
probe += "                  <label class='labelModal' for='trabajaIncomeDependentProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width: 20%;'>";
                            probe += "<input type='radio' id='trabajaIncomeDependentProbeNo' name='trabajaIncomeDependentProbe' value='No' onClick='mostrarCantidadDineroDiv()'/>";
probe += "                  <label class='labelModal' for='trabajaIncomeDependentProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div id='cantidadDineroDiv' class='hidden'>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>4.2.1 - Cantidad de dinero que ha ganado</label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div class='col_2'>";
probe += "                      <input style='width:100%;' type='number' id='cantidadIncomeDependentProbe' name='cantidadIncomeDependentProbe' min='0'/>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>4.2.2 Va a asistir con alguien mas que necesite realizar una cita? Como hijo, hermana, pareja etc?</label>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <div class='modalScriptRow'>";
probe += "                  <div class='divRadio' style='width:20%'>";
                                probe += "<input type='radio' id='asistirIncomeDependentProbeSi' name='asistirIncomeDependentProbe' value='Si'/>";
probe += "                      <label class='labelModal' for='asistirIncomeDependentProbeSi'>Si</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='asistirIncomeDependentProbeNo' name='asistirIncomeDependentProbe' value='No'/>";
probe += "                      <label class='labelModal' for='asistirIncomeDependentProbeNo'>No</label>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div class='divTituloModal2'><h5>Deductions</h5></div>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>4.3 - ¿Alguno de sus dependientes tuvo gastos de clases extra curriculares?</label>";
probe += "          </div>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width: 20%;'>";
                            probe += "<input type='radio' id='extraDeductionDependentProbeSi' name='extraDeductionDependentProbe' value='Si'/>";
probe += "                  <label class='labelModal' for='extraDeductionDependentProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width: 20%;'>";
                            probe += "<input type='radio' id='extraDeductionDependentProbeNo' name='extraDeductionDependentProbe' value='No'/>";
probe += "                  <label class='labelModal' for='extraDeductionDependentProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div><br>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas</label><br>";
probe += "              <textarea id='notasDependentsProbe' name='notasDependentsProbe' class='inputModal' style='width:100%;' onkeyup='notasDependents(this)'></textarea>";
probe += "          </div><br>";
probe += "      </div>";
probe += "  </div>";

probe += "  <div id='incomeDivProbe' class='probe_hidden'>";
probe += "      <div class='divTituloModal'><h5>Income</h5></div>";
probe += "      <div class='divInputScript'>";
probe += "          <label style='width:80%;display:block;' class='labelModal'>5.1 - ¿Usted trabaja para una compañía donde tiene retención de impuestos?</label>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width:20%'>";
                            probe += "<input type='radio' id='retencionIncomeProbeSi' name='retencionIncomeProbe' value='Si' onClick='mostrarNormasW2Div();'/>";
probe += "                  <label class='labelModal' for='retencionIncomeProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='retencionIncomeProbeNo' name='retencionIncomeProbe' value='No' onClick='mostrarNormasW2Div();'/>";
probe += "                  <label class='labelModal' for='retencionIncomeProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div id='normasW2Div' class='hidden'>";
probe += "          <div class='divInputScript'>";
probe += "              <label style='width:80%;display:block;' class='labelModal'>5.1.1 - ¿Ya tiene todas sus normas W-2?</label>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <div class='modalScriptRow'>";
probe += "                  <div class='divRadio' style='width:20%'>";
                                probe += "<input type='radio' id='normasIncomeProbeSi' name='normasIncomeProbe' value='Si' onClick='mostrarW2Div();'/>";
probe += "                      <label class='labelModal' for='normasIncomeProbeSi'>Si</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='normasIncomeProbeNo' name='normasIncomeProbe' value='No' onClick='mostrarW2Div();'/>";
probe += "                      <label class='labelModal' for='normasIncomeProbeNo'>No</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='normasIncomeProbeNoAplica' name='normasIncomeProbe' value='No Aplica' onClick='mostrarW2Div();'/>";
probe += "                      <label class='labelModal' for='normasIncomeProbeNoAplica'>No Aplica</label>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div id='cuantasW2Div' class='hidden'>";
probe += "              <div class='divInputScript'>";
probe += "                  <label class='labelModal'>5.1.2 - ¿Cuántas W-2 tiene?</label>";
probe += "              </div>";
probe += "              <div class='divInputScript'>";
probe += "                  <div class='col_2'>";
probe += "                      <input style='width:100%;' type='number' id='cuantasW2IncomeProbe' name='cuantasW2IncomeProbe' min='0'/>";
probe += "                  </div>";
probe += "              </div><br>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <label style='width:80%;display:block;' class='labelModal'>5.2 - ¿Usted recibe su pago en efectivo o cheques personales sin ningún descuento?</label>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width:20%'>";
                            probe += "<input type='radio' id='pagoIncomeProbeCompania' name='pagoIncomeProbe' value='Compañia' onClick='mostrarDeclaraIngresosDiv();'/>";
probe += "                  <label class='labelModal' for='pagoIncomeProbeCompania'>Compañia</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:50%;'>";
                            probe += "<input type='radio' id='pagoIncomeProbeEfectivo' name='pagoIncomeProbe' value='En cash o sin descuentos' onClick='mostrarDeclaraIngresosDiv();'/>";
probe += "                  <label class='labelModal' for='pagoIncomeProbeEfectivo'>En cash o sin descuentos</label>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div id='declaraIngresosDiv' class='hidden'>";
probe += "          <div class='divInputScript'>";
probe += "              <label style='width:80%;display:block;text-align: justify;' class='labelModal'>5.2.1 - Para el año 20xx abrió su propia compañía o declara esos ingresos y gastos de cash o de su compañía en conjunto con sus impuestos personales.</label>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <div class='modalScriptRow'>";
probe += "                  <div class='divRadio' style='width:20%'>";
                                probe += "<input type='radio' id='declaraIncomeProbe1099' name='declaraIncomeProbe' value='1099' onClick='mostrar1099Div();'/>";
probe += "                      <label class='labelModal' for='declaraIncomeProbe1099'>1099</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='declaraIncomeProbeCompania' name='declaraIncomeProbe' value='Compañia' onClick='mostrar1099Div();'/>";
probe += "                      <label class='labelModal' for='declaraIncomeProbeCompania'>Compañia</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='declaraIncomeProbeEfectivo' name='declaraIncomeProbe' value='Efectivo' onClick='mostrar1099Div();'/>";
probe += "                      <label class='labelModal' for='declaraIncomeProbeEfectivo'>Efectivo</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='declaraIncomeProbeW2' name='declaraIncomeProbe' value='Solo W2' onClick='mostrar1099Div();'/>";
probe += "                      <label class='labelModal' for='declaraIncomeProbeW2'>Solo W2</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='declaraIncomeProbeOtro' name='declaraIncomeProbe' value='Otro tipo de ingreso' onClick='mostrar1099Div();'/>";
probe += "                      <label class='labelModal' for='declaraIncomeProbeOtro'>Otro tipo de ingreso</label>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div><br>";
probe += "      </div>";
probe += "      <div id='cuantas1099Div' class='hidden'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>5.2.2 - Si me podría indicar cuántas formas 1099Nec tiene</label>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <div class='col_2'>";
probe += "                  <input style='width:100%;' type='number' id='cuantas1099IncomeProbe' name='cuantas1099IncomeProbe' min='0'/>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div class='divInputScript'>";
probe += "          <label style='display: block; width: 80%; text-align: justify;' class='labelModal'>5.3 - Ya tiene todos los documentos de ingresos y gastos, nos podria enviar el detalle de ingresos y gastos antes de la cita</label>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <div style='width: 80%;'>";
probe += "              <select style='width:100%;' id='detalleIncomeProbe' name='detalleIncomeProbe'>";
                            probe += "<option value='Si - Le pido de su apoyo si me los puede enviar'>Si - Le pido de su apoyo si me los puede enviar</option>";
                            probe += "<option value='No - En este caso es necesario trabajarlo como requisito para su cita'>No - En este caso es necesario trabajarlo como requisito para su cita</option>";
probe += "              </select>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div class='divInputScript'>";
probe += "          <label style='width:80%;display:block;' class='labelModal'>5.4 - ¿Usted tiene casa por renta como un ingreso adicional?</label>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width:20%'>";
                            probe += "<input type='radio' id='casaIncomeProbeSi' name='casaIncomeProbe' value='Si' onClick='mostrarRentaDiv();'/>";
probe += "                  <label class='labelModal' for='casaIncomeProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='casaIncomeProbeNo' name='casaIncomeProbe' value='No' onClick='mostrarRentaDiv();'/>";
probe += "                  <label class='labelModal' for='casaIncomeProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div id='rentaIngresoDiv' class='hidden'>";
probe += "          <div class='divInputScript'>";
probe += "              <label style='width:80%;display:block;' class='labelModal'>5.4.1 - ¿Necesita que hagamos sus CRP para sus inquilinos?</label>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <div class='modalScriptRow'>";
probe += "                  <div class='divRadio' style='width:20%'>";
                                probe += "<input type='radio' id='crpIncomeProbeSi' name='crpIncomeProbe' value='Si'/>";
probe += "                      <label class='labelModal' for='crpIncomeProbeSi'>Si</label>";
probe += "                  </div>";
probe += "                  <div class='divRadio' style='width:20%;'>";
                                probe += "<input type='radio' id='crpIncomeProbeNo' name='crpIncomeProbe' value='No'/>";
probe += "                      <label class='labelModal' for='crpIncomeProbeNo'>No</label>";
probe += "                  </div>";
probe += "              </div>";
probe += "          </div><br>";
probe += "          <div class='divInputScript'>";
probe += "              <label style='display: block; width: 80%; text-align: justify;' class='labelModal'>5.4.2 - ¿Ya tiene su lista de gastos e ingresos relacionada a la propiedad que tiene por renta?</label>";
probe += "          </div>";
probe += "          <div class='divInputScript'>";
probe += "              <div style='width: 80%;'>";
probe += "                  <select style='width:100%;' id='listaIncomeProbe' name='listaIncomeProbe'>";
                                probe += "<option value='Si - Le pido de su apoyo si me los puede enviar'>Si - Le pido de su apoyo si me los puede enviar</option>";
                                probe += "<option value='No - En este caso es necesario trabajarlo como requisito para su cita'>No - En este caso es necesario trabajarlo como requisito para su cita</option>";
probe += "                  </select>";
probe += "              </div>";
probe += "          </div><br>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas Income</label><br>";
probe += "              <textarea id='notasIncomeProbe' name='notasIncomeProbe' class='inputModal' style='width:100%;' onkeyup='notasIncome(this)'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "  </div>";

probe += "  <div id='crpDivProbe' class='probe_hidden'>";
probe += "      <div class='divTituloModal'><h5>CRP or Property Tax</h5></div>";
probe += "      <div class='divInputScript'>";
probe += "          <label style='width:80%;display:block;' class='labelModal'>6 ¿Enviará algún documento para realización de impuestos de la propiedad?</label>";
probe += "      </div>";
probe += "      <div class='divInputScript'>";
probe += "          <div class='modalScriptRow'>";
probe += "              <div class='divRadio' style='width:20%'>";
                            probe += "<input type='radio' id='crpProbeSi' name='crpProbe' value='Si'/>";
probe += "                  <label class='labelModal' for='crpProbeSi'>Si</label>";
probe += "              </div>";
probe += "              <div class='divRadio' style='width:20%;'>";
                            probe += "<input type='radio' id='crpProbeNo' name='crpProbe' value='No'/>";
probe += "                  <label class='labelModal' for='crpProbeNo'>No</label>";
probe += "              </div>";
probe += "          </div>";
probe += "      </div><br>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas CRP</label><br>";
probe += "              <textarea id='notasCRPProbe' name='notasCRPProbe' class='inputModal' style='width:100%;' onkeyup='notasCRP(this)'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "  </div>";

probe += "  <div id='notesDivProbe' class='probe_hidden'>";
probe += "      <div class='divTituloModal'><h5>Notes</h5></div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas Home</label><br>";
probe += "              <textarea id='notesHome' name='notesHome' class='inputModal' style='width:100%;'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas Taxpayer</label><br>";
probe += "              <textarea id='notesTaxpayer' name='notesTaxpayer' class='inputModal' style='width:100%;'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas Filing</label><br>";
probe += "              <textarea id='notesFiling' name='notesFiling' class='inputModal' style='width:100%;'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas Dependents</label><br>";
probe += "              <textarea id='notesDependents' name='notesDependents' class='inputModal' style='width:100%;'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas Income</label><br>";
probe += "              <textarea id='notesIncome' name='notesIncome' class='inputModal' style='width:100%;'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "      <div style='width: 80%;'>";
probe += "          <div class='divInputScript'>";
probe += "              <label class='labelModal'>Notas CRP</label><br>";
probe += "              <textarea id='notesCRP' name='notesCRP' class='inputModal' style='width:100%;'></textarea>";
probe += "          </div>";
probe += "      </div>";
probe += "  </div>";   
        
        
        document.getElementById("modalScriptProbeBody").innerHTML = probe;
    
    
    //5. Agreement to Proceed
    //for(AggregateResult cadena : [SELECT OwnerId FROM Account Group By OwnerId]){ system.debug(cadena); }

    //6. Recap/Next Steps
        var recap = "";
        var edit = "";
        for(var f = 0; f<filtro.length; f++){
recap += "  <div class='divScriptRecap'>";
recap += "      <div style='margin-bottom: 10px; text-align: center;'>";
recap += "          <h5>Script obligatorio a mencionar al cliente</h5>";
recap += "      </div>";
recap += "      <div class='divInputScript'>";
recap += "          <div id='recapDiv1'><span class='labelModal'>Este dia realizamos un requerimiento para: </span> <span id='textRecap1' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapDiv2'><span class='labelModal'>Su Parentezco es: </span> <span id='textRecap2' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapDiv3'><span class='labelModal'>La cita quedo registrada para el día: </span> <span id='textRecap3' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapDiv4'><span class='labelModal'>Confirmo que usted </span><span id='textRecap4' class='labelModal textRecap'></span><span class='labelModal'> desea realizar cambio de su nombre</span></div>";
recap += "          <div id='recapDiv5'><span class='labelModal'>Usted no requiere cambio de nombre</span></div>";
recap += "          <div id='recapDiv6'><span id='textRecap5' class='labelModal textRecap'></span><span class='labelModal'> Desea realizar cambio de Seguro Social</span></div>";
recap += "          <div id='recapDiv7'><span class='labelModal'>No requiere cambio de seguro social</span></div>";
recap += "          <div id='recapDiv8'><span class='labelModal'>Usted quiere declarar: <span id='textRecap6' class='labelModal textRecap'></span><span class='labelModal'> dependiente(s)</span></div>";
recap += "          <div id='recapDiv9'><span class='labelModal'>Usted no va a declarar dependientes</span></div>";
recap += "          <div id='recapDiv10'><span class='labelModal'>Usted </span><span id='textRecap7' class='labelModal textRecap'></span><span class='labelModal'> va a retirar algun dependiente</span></div>";
recap += "          <div id='recapDiv11'><span class='labelModal'>No va a retirar ningun dependiente</span></div>";
recap += "          <div id='recapDiv12'><span class='labelModal'>Nos informó que </span><span id='textRecap8' class='labelModal textRecap'></span><span class='labelModal'> cuenta con sus formas W-2</span><br>";
recap += "              <span class='labelModal'>Y tiene </span><span id='textRecap9' class='labelModal textRecap'></span><span class='labelModal'> forma(s) W-2</span></div>";
recap += "          <div id='recapDiv13'><span class='labelModal'>Nos informó que </span><span id='textRecap10' class='labelModal textRecap'></span><span class='labelModal'> cuenta con sus formas W-2</span></div>";
recap += "          <div id='recapDiv14'><span class='labelModal'>Comenta que No tiene mas ingresos</span></div>";
recap += "          <div><span class='labelModal'>Toda la información que le acabo de mencionar es correcta</span></div>";
recap += "      </div>";
recap += "      <div class='divInputScript'><span class='labelModal'>Le agradezco mucho, </span><span id='textRecap11' class='labelModal textRecap'></span></div>";
recap += "      <div class='divInputScript'><span class='labelModal'>Le confirmo entonces podría asistir de 10 a 15 minutos antes de su cita para poder proporcionarnos su documentación y de cualquier forma una compañera se estará comunicando con usted para confirmación de datos.</span></div>";
recap += "      <div class='divInputScript'><span class='labelModal'>Ok le parece bien si yo le envío un listado de documentos por mensaje de texto para que usted lo tenga presentes.</span></div>";
recap += "      <div class='divInputScript'><span class='labelModal'>Ok, </span><span id='textRecap12' class='labelModal textRecap'></span><span class='labelModal'> le estaría mandando un listado de documentos.</span></div>";
recap += "      <div class='divInputScript'><span class='labelModal'>Ok </span><span id='textRecap13' class='labelModal textRecap'></span><span class='labelModal'> como le comento yo no tendría más información de ese caso, mi compañera se comunicará con usted para proporcionar ese costo.</span></div>";
recap += "  </div><br>";

recap += "  <div class='divInformacionRecap'>";
recap += "      <div class='divTituloModal2'>";
recap += "          <h5>Información completa que brindó el cliente</h5>";
recap += "      </div><br>";
recap += "      <div class='divInputScript' style='margin-bottom: 10px; text-align: center;'>";
recap += "          <h5>Greeting</h5>";
recap += "      </div>";
recap += "      <div class='divInputScript'>";
recap += "          <div id='recapGreet1'><span class='labelModal'>Este dia realizamos un requerimiento para: </span><span id='textGreet1' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet2'><span class='labelModal'>Su Parentezco es: </span><span id='textGreet2' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet3'><span class='labelModal'>La cuenta asociada es: </span><span id='textGreet3' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet4'><span class='labelModal'>El contacto asociado es: </span><span id='textGreet4' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet5'><span class='labelModal'>Informativo (no mencionar) es: </span><span id='textGreet5' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet6'><span class='labelModal'>Comenta que le asistimos en sus impuestos el (los) año(s): </span><span id='textGreet6' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet7'><span class='labelModal'>Pertenece al tipo de: </span><span id='textGreet7' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapGreet8'><span class='labelModal'>La cita quedo registrada para el dia: <span id='textGreet8' class='labelModal textRecap'></span></span></div>";
recap += "      </div><br>";
recap += "      <div class='divInputScript divTituloModal2'>";
recap += "          <h5>Taxpayer Info</h5>";
recap += "      </div>";
recap += "      <div class='divInputScript'>";
recap += "          <div id='recapTax1'><span class='labelModal'>Confirmo que usted </span><span id='textTax1' class='labelModal textRecap'></span><span class='labelModal'> desea realizar cambio de su nombre</span></div>";
recap += "          <div id='recapTax2'><span class='labelModal'>Usted no requiere cambio de nombre</span></div>";
recap += "          <div id='recapTax3'><span id='textTax2' class='labelModal textRecap'></span><span class='labelModal'> Desea realizar cambio de seguro social</span></div>";
recap += "          <div id='recapTax4'><span class='labelModal'>No requiere cambio de seguro social</span></div>";
recap += "          <div id='recapTax5'><span class='labelModal'>Acordamos que su estado civil es: </span><span id='textTax3' class='labelModal textRecap'></span></div>";
recap += "      </div><br>";
recap += "      <div class='divInputScript divTituloModal2'>";
recap += "          <h5>Dependents</h5>";
recap += "      </div>";
recap += "      <div class='divInputScript'>";
recap += "          <div id='recapDep1'><span class='labelModal'>Usted quiere declarar: </span><span id='textDep1' class='labelModal textRecap'></span><span class='labelModal'> dependiente(s)</span></div>";
recap += "          <div id='recapDep2'><span class='labelModal'>Usted no va a declarar dependientes</span></div>";
recap += "          <div id='recapDep3'><span class='labelModal'>Su(s) depende(s) se llama(n) :</span><span id='textDep2' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapDep4'><span class='labelModal'>Usted </span><span id='textDep3' class='labelModal textRecap'></span><span class='labelModal'> va a retirar algun dependiente</span><br>";
recap += "                  <span class='labelModal'>El nombre del o los depende(s) a retirar es o son: </span><span id='textDep4' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapDep5'><span class='labelModal'>No va a reritar ningun dependiente</span></div>";
recap += "          <div id='recapDep6'><span id='textDep5' class='labelModal textRecap'></span>, <span class='labelModal'>Uno de sus dependes trabaja</span><br>";
recap += "                  <span class='labelModal'>Menciono que gana aproximadamente: </span><span id='textDep6' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapDep7'><span class='labelModal'>Me indicó que ningun dependiente trabaja</span></div>";
recap += "          <div id='recapDep8'><span class='labelModal'>Usted no requiere ningun cambio en sus dependientes</span></div>";
recap += "          <div id='recapDep9'><span class='labelModal'>Me comenta que </span><span id='textDep7' class='labelModal textRecap'></span><span class='labelModal'> asistira acompañado(a) de alguien mas</span></div>";
recap += "          <div id='recapDep10'><span class='labelModal'>Me indica que asistirá sólo usted</span></div>";
recap += "          <div id='recapDep11'><span class='labelModal'>Usted </span><span id='textDep8' class='labelModal textRecap'></span><span class='labelModal'> ha pagado cuidado infantil</span></div>";
recap += "          <div id='recapDep13'><span id='textDep9' class='labelModal textRecap'></span><span class='labelModal'> tiene dependientes en la universidad</span></div>";
recap += "          <div id='recapDep15'><span id='textDep10' class='labelModal textRecap'></span><span class='labelModal'> Ha tenido gastos en utiles escolares</span></div>";
recap += "          <div id='recapDep17'><span class='labelModal'>Su dependiente </span><span id='textDep11' class='labelModal textRecap'></span><span class='labelModal'> tuvo gastos extra curriculares</span></div>";
recap += "      </div><br>";
recap += "      <div class='divInputScript divTituloModal2'>";
recap += "          <h5>Income</h5>";
recap += "      </div>";
recap += "      <div class='divInputScript'>";
recap += "          <div id='recapInc1'><span class='labelModal'>Nos informó que </span><span id='textInc1' class='labelModal textRecap'></span><span class='labelModal'> cuenta con sus formas W-2</span><br>";
recap += "              <span class='labelModal'>y tiene </span><span id='textInc2' class='labelModal textRecap'></span><span class='labelModal'> forma(s) W-2</span></div>";
recap += "          <div id='recapInc2'><span class='labelModal'>Nos informo que </span><span id='textInc3' class='labelModal textRecap'></span><span class='labelModal'> cuenta con sus formas w2</span></div>";
recap += "          <div id='recapInc3'><span class='labelModal'>Indica que tiene ingresos de cash y son la(s) forma(s): </span><span id='textInc4' class='labelModal textRecap'></span></div>";
recap += "          <div id='recapInc4'><span class='labelModal'>y Tiene </span><span id='textInc5' class='labelModal textRecap'></span><span class='labelModal'> forma(s) 1099</span></div>";
recap += "          <div id='recapInc5'><span class='labelModal'>Comenta que No tiene mas ingresos</span></div>";
recap += "          <div id='recapInc6'><span id='textInc6' class='labelModal textRecap'></span><span class='labelModal'>, Recibio desempleo</span></div>";
recap += "          <div id='recapInc8'><span class='labelModal'>Comenta que </span><span id='textInc7' class='labelModal textRecap'></span><span class='labelModal'> tiene ingresos de juegos de azar o casino</span></div>";
recap += "          <div id='recapInc10'><span class='labelModal'>Menciono que </span><span id='textInc8' class='labelModal textRecap'></span><span class='labelModal'> tiene otros ingresos adicionales</span></div>";
recap += "          <div><span class='labelModal'>Toda la informacion que le acabo de mencionar es correcta.</span></div>";
recap += "      </div>";
recap += "  </div>";

edit += "       <div style='margin-bottom: 10px; text-align: center;'>";
edit += "           <h5>Greeting</h5>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow'>";
edit += "              <div style='width: 45%;'>";
edit += "                  <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Nombre del Cliente</label></div>";
edit += "                  <input style='width:100%;' id='nombreClienteRecap' name='nombreClienteRecap'>";
edit += "              </div>";
edit += "              <div style='width: 5%;'></div>";
edit += "              <div style='width: 45%;'>";
edit += "                  <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Account</label></div>";
edit += "                  <div style='position: relative;' id='accounts2'></div>";
edit += "              </div>";
edit += "           </div>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow'>";
edit += "               <div style='width: 45%;'>";
edit += "                   <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>¿De quién proviene la llamada?</label></div>";
edit += "                   <select style='width:100%;' id='quienLlamadaRecap' name='quienLlamadaRecap'>";
edit += "                       <option value='Cliente'>Cliente</option>";
edit += "                       <option value='Proveedor'>Proveedor</option>";
edit += "                       <option value='Cliente Nuevo'>Cliente Nuevo</option>";
edit += "                       <option value='En nombre del cliente de terceros'>En nombre del cliente de terceros</option>";
edit += "                       <option value='Llamada Interna'>Llamada Interna</option>";
edit += "                   </select>";
edit += "               </div>";
edit += "               <div style='width: 5%;'></div>";
edit += "               <div style='width: 45%;'>";
edit += "                   <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Contact</label></div>";
edit += "                  <div style='position: relative;' id='contacts2'></div>";
edit += "               </div>";
edit += "           </div>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow'>";
edit += "               <div style='width: 100%;'>";
edit += "                   <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Tipo de Parentezco</label></div>";
edit += "               <div class='divInputScript'>";
edit += "                   <div class='modalScriptRow'>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapAll' name='parentezcoTitularRecap[]' type='checkbox' value='All' onClick='parentezcoRecapCheckAll(this);'>";
edit += "                               <label for='parentezcoTitularRecapAll' class='labelModal'>All</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapAmigo' name='parentezcoTitularRecap[]' type='checkbox' value='Amigo'>";
edit += "                               <label for='parentezcoTitularRecapAmigo' class='labelModal'>Amigo</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapEsposo' name='parentezcoTitularRecap[]' type='checkbox' value='Esposo'>";
edit += "                               <label for='parentezcoTitularRecapEsposo' class='labelModal'>Esposo</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapFamiliar' name='parentezcoTitularRecap[]' type='checkbox' value='Familiar'>";
edit += "                               <label for='parentezcoTitularRecapFamiliar' class='labelModal'>Familiar</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                   </div>";
edit += "                   <div class='modalScriptRow'>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapHijos' name='parentezcoTitularRecap[]' type='checkbox' value='Hijos'>";
edit += "                               <label for='parentezcoTitularRecapHijos' class='labelModal'>Hijos</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapPadres' name='parentezcoTitularRecap[]' type='checkbox' value='Padres'>";
edit += "                               <label for='parentezcoTitularRecapPadres' class='labelModal'>Padres</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                       <div style='width: 25%;'>";
edit += "                           <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='parentezcoTitularRecapOtro' name='parentezcoTitularRecap[]' type='checkbox' value='Otro'>";
edit += "                               <label for='parentezcoTitularRecapOtro' class='labelModal'>Otro</label>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                   </div>";
edit += "               </div>";
edit += "               </div>";
edit += "           </div>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow'>";
edit += "               <div style='width: 100%;'>";
edit += "                   <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Año de impuestos</label></div>";
    edit += "           <div class='divInputScript'>";
    edit += "               <div class='modalScriptRow'>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecapAll' name='asistidoRecap[]' type='checkbox' value='All' onClick='asistidoRecapCheckAll(this)'>";
    edit += "                           <label for='asistidoRecapAll' class='labelModal'>All</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2027' name='asistidoRecap[]' type='checkbox' value='2027'>";
    edit += "                           <label for='asistidoRecap2027' class='labelModal'>2027</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2026' name='asistidoRecap[]' type='checkbox' value='2026'>";
    edit += "                           <label for='asistidoRecap2026' class='labelModal'>2026</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2025' name='asistidoRecap[]' type='checkbox' value='2025'>";
    edit += "                           <label for='asistidoRecap2025' class='labelModal'>2025</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "               </div>";
    edit += "               <div class='modalScriptRow'>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2024' name='asistidoRecap[]' type='checkbox' value='2024'>";
    edit += "                           <label for='asistidoRecap2024' class='labelModal'>2024</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2023' name='asistidoRecap[]' type='checkbox' value='2023'>";
    edit += "                           <label for='asistidoRecap2023' class='labelModal'>2023</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2022' name='asistidoRecap[]' type='checkbox' value='2022'>";
    edit += "                           <label for='asistidoRecap2022' class='labelModal'>2022</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2021' name='asistidoRecap[]' type='checkbox' value='2021'>";
    edit += "                           <label for='asistidoRecap2021' class='labelModal'>2021</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "               </div>";
    edit += "               <div class='modalScriptRow'>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2020' name='asistidoRecap[]' type='checkbox' value='2020'>";
    edit += "                           <label for='asistidoRecap2020' class='labelModal'>2020</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2019' name='asistidoRecap[]' type='checkbox' value='2019'>";
    edit += "                           <label for='asistidoRecap2019' class='labelModal'>2019</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2018' name='asistidoRecap[]' type='checkbox' value='2018'>";
    edit += "                           <label for='asistidoRecap2018' class='labelModal'>2018</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2017' name='asistidoRecap[]' type='checkbox' value='2017'>";
    edit += "                           <label for='asistidoRecap2017' class='labelModal'>2017</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "               </div>";
    edit += "               <div class='modalScriptRow'>";
    edit += "                   <div style='width: 25%;'>";
    edit += "                       <div style='display: flex; align-items: center;'>";
                                        edit += "<input id='asistidoRecap2016' name='asistidoRecap[]' type='checkbox' value='2016'>";
    edit += "                           <label for='asistidoRecap2016' class='labelModal'>2016</label>";
    edit += "                       </div>";
    edit += "                   </div>";
    edit += "               </div>";
    edit += "           </div>";
edit += "               </div>";
edit += "           </div>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow'>";
edit += "               <div style='width: 100%;'>";
edit += "                   <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Tipo de Agencia</label></div>";
edit += "                   <div class='divInputScript'>";
edit += "                       <div class='modalScriptRow' style='margin-bottom: 2%;'>";
edit += "                           <div style='width: 25%;'>";
edit += "                               <div style='display: flex; align-items: center;'>";
                                            edit += "<input id='tipoAgenciaRecapAll' name='tipoAgenciaRecap[]' type='checkbox' value='All' onClick='agenciaRecapCheckAll(this)'>";
edit += "                                   <label for='tipoAgenciaRecapAll' class='labelModal'>All</label>";
edit += "                               </div>";
edit += "                           </div>";
edit += "                           <div style='width: 25%;'>";
edit += "                               <div style='display: flex; align-items: center;'>";
                                            edit += "<input id='tipoAgenciaRecapAbogado' name='tipoAgenciaRecap[]' type='checkbox' value='Abogado'>";
edit += "                                   <label for='tipoAgenciaRecapAbogado' class='labelModal'>Abogado</label>";
edit += "                               </div>";
edit += "                           </div>";
edit += "                           <div style='width: 25%;'>";
edit += "                               <div style='display: flex; align-items: center;'>";
                                            edit += "<input id='tipoAgenciaRecapEmpleadores' name='tipoAgenciaRecap[]' type='checkbox' value='Empleadores'>";
edit += "                                   <label for='tipoAgenciaRecapEmpleadores' class='labelModal'>Empleadores</label>";
edit += "                               </div>";
edit += "                           </div>";
edit += "                           <div style='width: 25%;'>";
edit += "                               <div style='display: flex; align-items: center;'>";
                                            edit += "<input id='tipoAgenciaRecapContador' name='tipoAgenciaRecap[]' type='checkbox' value='Contador'>";
edit += "                                   <label for='tipoAgenciaRecapContador' class='labelModal'>Contador</label>";
edit += "                               </div>";
edit += "                           </div>";
edit += "                       </div>";
edit += "                       <div class='modalScriptRow'>";
edit += "                           <div style='width: 25%;'>";
edit += "                               <div style='display: flex; align-items: center;'>";
                                            edit += "<input id='tipoAgenciaRecapGobierno' name='tipoAgenciaRecap[]' type='checkbox' value='Agencia de gobierno'>";
edit += "                                   <label for='tipoAgenciaRecapGobierno' class='labelModal'>Agencia de gobierno</label>";
edit += "                               </div>";
edit += "                           </div>";
edit += "                           <div style='width: 50%;'>";
edit += "                               <div style='display: flex; align-items: center;'>";
                                            edit += "<input id='tipoAgenciaRecapAgente' name='tipoAgenciaRecap[]' type='checkbox' value='Agente de bienes y raices'>";
edit += "                                   <label for='tipoAgenciaRecapAgente' class='labelModal'>Agente de bienes y raíces</label>";
edit += "                               </div>";
edit += "                            </div>";
edit += "                       </div>";
edit += "                   </div>";
edit += "               </div>";
edit += "           </div>";
edit += "       </div><br>";
edit += "       <div class='divInputScript divTituloModal2'>";
edit += "           <h5>Problem/Issue Definition</h5>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow'>";
edit += "              <div style='width: 45%;'>";
edit += "                  <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Subject</label></div>";
edit += "                  <div style='width:100%;position:relative;' id='subjectRecapDiv'></div>";
edit += "              </div>";
edit += "              <div style='width: 5%;'></div>";
edit += "              <div style='width: 45%;'>";
edit += "                  <div class='divInputScript'><label style='display: block; width: 80%;' class='labelModal'>Solicitud del Cliente</label></div>";
edit += "                  <textarea style='width:100%;' id='solicitudRecap' name='solicitudRecap' style='width: 15px;'></textarea>";
edit += "              </div>";
edit += "           </div>";
edit += "       </div><br>";
edit += "       <div class='divInputScript divTituloModal2'>";
edit += "           <h5>Probe for Root Cause</h5>";
edit += "       </div>";
edit += "       <div class='divInputScript'>";
edit += "           <div class='modalScriptRow' style='align-items: baseline !important;'>";
edit += "              <div style='width: 45%;'>";
edit += "                   <div id='entrevistaRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>1 ¿Podemos realizar una entrevista de exploración de su situación fiscal para el año que declararemos?</label></div>";
edit += "                       <select style='width:100%;' id='entrevistaRecap' name='entrevistaRecap'>";
edit += "                           <option value='Si, de acuerdo'>Si, de acuerdo</option> <option value='No, cualquier motivo'>No, cualquier motivo</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='horarioRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>1.1 ¿Cuál seria el mejor horario para comunicarnos?</label></div>";
edit += "                       <input type='datetime-local' style='width:100%;' id='horarioRecap' name='horarioRecap'>";
edit += "                   </div><br>";
edit += "                   <div id='actualizarEstadoRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>2 ¿Quiere realizar alguna actualización de su estado migratorio?</label></div>";
edit += "                       <select style='width:100%;' id='actualizarEstadoRecap' name='actualizarEstadoRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='cambioNombreRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>2.1 Cambió sus nombres legalmente, ¿Por matrimonio o después de proceso migratorio?</label></div>";
edit += "                       <select style='width:100%;' id='cambioNombreRecap' name='cambioNombreRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='cambioSeguroRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>2.2 ¿Cambió de seguro social?</label></div>";
edit += "                       <select style='width:100%;' id='cambioSeguroRecap' name='cambioSeguroRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='estadoCivilRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>3 El estatus que mejor describe su estado civil</label></div>";
edit += "                       <select style='width:100%;' id='estadoCivilRecap' name='estadoCivilRecap' onChange='estadoCivilRecap();'>";
edit += "                           <option value='Jefe de familia'>Jefe de familia</option> <option value='Casado'>Casado</option> <option value='Soltero'>Soltero</option> <option value='Viudo'>Viudo</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='casadoRecapDiv' class='hidden'>";
edit += "                       <div>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>3.1 ¿Tiene su certificado de matrimonio?</label></div>";
edit += "                           <select style='width:100%;' id='certificadoMatrimonioRecap' name='certificadoMatrimonioRecap'>";
edit += "                               <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                           </select>";
edit += "                       </div><br>";
edit += "                       <div>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>3.2 ¿Hay ingresos que su esposo/a reportara?</label></div>";
edit += "                           <select style='width:100%;' id='ingresosEsposoRecap' name='ingresosEsposoRecap' onChange='ingresosEsposoRecap();'>";
edit += "                               <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                           </select>";
edit += "                       </div>";
edit += "                       <div id='notaIngresoRecapDiv' class='hidden'><br>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>3.2.1 Nota que quiere compartir sobre ingreso de esposo/a</label></div>";
edit += "                           <textarea style='width:100%;height:15px;' id='notaIngresoRecap' name='notaIngresoRecap'></textarea>";
edit += "                       </div><br>";
edit += "                   </div>";
edit += "                   <div id='agregarDependientesRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.1 ¿Va a agregar dependientes este año?</label></div>";
edit += "                       <select style='width:100%;' id='agregarDependientesRecap' name='agregarDependientesRecap' onChange='agregarRecap();'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option> <option value='No Aplica'>No Aplica</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='agregarRecapDiv' class='hidden'>";
edit += "                       <div>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.1.1 ¿Cuántos dependientes desea agregar?</label></div>";
edit += "                           <input type='number' style='width:100%;' id='cuantosDependientesRecap' name='cuantosDependientesRecap' min='0'>";
edit += "                       </div><br>";
edit += "                       <div>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.1.2 Nombre Completo Dependiente</label></div>";
edit += "                           <textarea style='width:100%;height:15px;' id='nombreDependienteRecap' name='nombreDependienteRecap'></textarea>";
edit += "                       </div><br>";
edit += "                   </div>";
edit += "                   <div id='retirarDependienteRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.2 ¿Va a retirar algún dependiente o alguno de los dependientes que declaró?</label></div>";
edit += "                       <select style='width:100%;' id='retirarDependienteRecap' name='retirarDependienteRecap' onChange='retirarRecap();'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option> <option value='Talvez'>Talvez</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='retirarRecapDiv' class='hidden'>";
edit += "                       <div>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.2.1 Nombre completo del dependiente a retirar</label></div>";
edit += "                           <input style='width:100%;' id='nombreRetirarDependienteRecap' name='nombreRetirarDependienteRecap'>";
edit += "                       </div><br>";
edit += "                       <div>";
edit += "                           <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.2.2 Menciono que retira un dependiente. ¿Me podría compartir el motivo?</label></div>";
edit += "                           <select style='width:100%;' id='motivoRetiraDependienteRecap' name='motivoRetiraDependienteRecap'>";
edit += "                               <option value='Ya es mayor de edad y trabaja'>Ya es mayor de edad y trabaja</option> <option value='Va a declarar por si solo'>Va a declarar por si solo</option> <option value='Ya no vive con el'>Ya no vive con él</option> <option value='Fallecio'>Fallecio</option>";
edit += "                           </select>";
edit += "                       </div><br>";
edit += "                   </div>";
edit += "                   <div id='dependienteTrabajaDependienteRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.3 ¿Alguno de sus dependientes trabaja o trabajo?</label></div>";
edit += "                       <select style='width:100%;' id='dependienteTrabajaDependienteRecap' name='dependienteTrabajaDependienteRecap' onChange='dineroRecap();'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='cantidadDineroRecapDiv' class='hidden'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.3.1 Cantidad de dinero que ha ganado</label></div>";
edit += "                       <input type='number' style='width:100%;' id='cantidadDineroRecap' name='cantidadDineroRecap' min='0'><br><br>";
edit += "                   </div>";
edit += "                   <div id='asistirRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.3.2 ¿Va a asistir con alguien más que necesite realizar una cita? ¿Como hijo, hermana, pareja etc?</label></div>";
edit += "                       <select style='width:100%;' id='asistirRecap' name='asistirRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div>";
edit += "              </div>";
edit += "              <div style='width: 5%;'></div>";
edit += "              <div style='width: 45%;'>";
edit += "                   <div id='cuidadoInfantilRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.4 ¿Pagó cuidado infantil para alguno de sus dependientes?</label></div>";
edit += "                       <select style='width:100%;' id='cuidadoInfantilRecap' name='cuidadoInfantilRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='universidadRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.4.1 ¿Alguno de sus dependientes está en la universidad y usted me enviará alguna 1098 T?</label></div>";
edit += "                       <select style='width:100%;' id='universidadRecap' name='universidadRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='utilesRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.4.2 ¿Gastó en útiles escolares de alguno de sus dependientes (desde kindergarten hasta 12o grado)?</label></div>";
edit += "                       <select style='width:100%;' id='utilesRecap' name='utilesRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='gastosExtraRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>4.4.3 ¿Alguno de sus dependientes tuvo gastos de clases extra curriculares?</label></div>";
edit += "                       <select style='width:100%;' id='gastosExtraRecap' name='gastosExtraRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='documentosRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.1 ¿Ya tiene todos los documentos?</label></div>";
edit += "                       <select style='width:100%;' id='documentosRecap' name='documentosRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='formasW2RecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.2 ¿Ya tiene todas sus formas W2?</label></div>";
edit += "                       <select style='width:100%;' id='formasW2Recap' name='formasW2Recap' onChange='cuantasW2Recap();'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option> <option value='No Aplica'>No Aplica</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='cuantasW2RecapDiv' class='hidden'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.2.1 ¿Cuántas W-2 tiene?</label></div>";
edit += "                       <input type='number' min='0' style='width:100%;' id='cuantasW2Recap' name='cuantasW2Recap' min='0'>";
edit += "                   </div><br>";
edit += "                   <div id='declaraIngresosRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.2.2 ¿Para el año 20xx abrió su propia compañía o declara esos ingresos y gastos de cash o de su compañía en conjunto con sus impuestos personales?</label></div>";
edit += "                       <select style='width:100%;' id='declaraIngresosRecap' name='declaraIngresosRecap' onChange='forma1099Recap();'>";
edit += "                           <option value='1099'>1099</option>";
edit += "                           <option value='Efectivo'>Efectivo</option>";
edit += "                           <option value='Otro tipo de ingreso'>Otro tipo de ingreso</option>";
edit += "                           <option value='Solo W2'>Solo W2</option>";
edit += "                           <option value='Compañia'>Compañia</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='1099BancoRecapDiv' class='hidden'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.2.3 ¿Cuántas 1099 tiene o el reporte de gastos lo tomará de su banco?</label></div>";
edit += "                       <input type='number' style='width:100%;' id='1099BancoRecap' name='1099BancoRecap' min='0'><br><br>";
edit += "                   </div>";
edit += "                   <div id='desempleoRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.3 ¿Recibió Desempleo?</label></div>";
edit += "                       <select style='width:100%;' id='desempleoRecap' name='desempleoRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option> <option value='No Aplica'>No Aplica</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='ingresoJuegoRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.4 ¿Tiene algún tipo de ingreso por juegos del azar como Casino o Loteria?</label></div>";
edit += "                       <select style='width:100%;' id='ingresoJuegoRecap' name='ingresoJuegosRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='otroIngresoRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.5 ¿Tiene algún otro tipo de ingreso o forma que desee reportar en sus ingresos, como pinterest, dividendo, K1, 1099G, desempleo o dinero del gobierno?</label></div>";
edit += "                       <select style='width:100%;' id='otroIngresoRecap' name='otroIngresoRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='formasIngresoRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>5.6 Anotar otro tipo de formas de ingreso cuántas y cuáles</label></div>";
edit += "                       <textarea style='width:100%;height:15px;' id='formasIngresoRecap' name='formasIngresoRecap'></textarea>";
edit += "                   </div><br>";
edit += "                   <div id='documentoPropiedadRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>6 ¿Enviará algún documento para realización de impuestos de la propiedad?</label></div>";
edit += "                       <select style='width:100%;' id='documentoPropiedadRecap' name='documentoPropiedadRecap'>";
edit += "                           <option value='Si'>Si</option> <option value='No'>No</option>";
edit += "                       </select>";
edit += "                   </div><br>";
edit += "                   <div id='notasRecapDiv'>";
edit += "                       <div class='divInputScript' style='height: 4vh;'><label style='display: block; width: 100%; text-align: justify;' class='labelModal'>7 Notas de Entrevistador</label></div>";
edit += "                       <textarea style='width:100%;' id='notasRecap' name='notasRecap'></textarea>";
edit += "                   <div>";
edit += "              </div>";
edit += "           </div>";
edit += "       </div></div>";
edit += "       <div class='divInputScript divTituloModal2'>";
edit += "           <h5>Agreement to Proceed</h5>";
edit += "       </div>";
edit += "       <div class='divScriptRecap' style='padding: 20px 10px 20px 10px;'>";
edit += "           <div class='modalScriptRow'>";
edit += "              <div style='width: 25%;'>";
edit += "                   <div class='divInputScript'><label style='display: block; width: 100%; text-align: center;' class='labelModal'>Datos del Caso</label></div>";
edit += "              </div>";
edit += "              <div style='width: 25%;'>";
edit += "                   <div id='caseNumber' class='divInputScript' style='display: block; width: 100%; text-align: center;'></div>";
edit += "              </div>";
edit += "              <div style='width: 25%;'>";
edit += "                   <div class='divInputScript'><label id='createdDateCase' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
edit += "              </div>";
edit += "              <div style='width: 25%;'>";
edit += "                   <div class='divInputScript'><label id='subjectCase' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
edit += "              </div>";
edit += "           </div>";
edit += "       </div>";
        }
        document.getElementById("recapScriptDiv").innerHTML = recap;
        document.getElementById("editRecapDiv").innerHTML = edit;


        const accountRecapName = document.createElement("input");
        accountRecapName.setAttribute("id", "accountRecapName"); accountRecapName.setAttribute("class", "inputModal");
        accountRecapName.setAttribute("placeholder", "Search...");
        accountRecapName.onkeyup = function() { functions.accountsRecap(this.value); };

        const accountRecap = document.createElement("input");
        accountRecap.setAttribute("id", "accountRecap"); accountRecap.setAttribute("name", "accountRecap"); accountRecap.setAttribute("class", "hidden");

        const accountRecapResultados = document.createElement("div");
        accountRecapResultados.setAttribute("id", "accountRecapResultados");
            
        document.getElementById("accounts2").appendChild(accountRecapName);
        document.getElementById("accounts2").appendChild(accountRecap);
        document.getElementById("accounts2").appendChild(accountRecapResultados);
        
        
        const contactRecapName = document.createElement("input");
        contactRecapName.setAttribute("id", "contactRecapName"); contactRecapName.setAttribute("class", "inputModal");
        contactRecapName.setAttribute("placeholder", "Search...");
        contactRecapName.onkeyup = function() { functions.contactsRecap(this.value); };

        const contactRecap = document.createElement("input");
        contactRecap.setAttribute("id", "contactRecap"); contactRecap.setAttribute("name", "contactRecap"); contactRecap.setAttribute("class", "hidden");

        const contactRecapResultados = document.createElement("div");
        contactRecapResultados.setAttribute("id", "contactRecapResultados");

        document.getElementById("contacts2").appendChild(contactRecapName);
        document.getElementById("contacts2").appendChild(contactRecap);
        document.getElementById("contacts2").appendChild(contactRecapResultados);


        const subjectRecapName = document.createElement("input");
        subjectRecapName.setAttribute("id", "subjectRecapName"); subjectRecapName.setAttribute("class", "inputModal");
        subjectRecapName.setAttribute("placeholder", "Search...")
        subjectRecapName.onkeyup = function() { functions.keywordsRecap(this.value); };

        const subjectRecap = document.createElement("input");
        subjectRecap.setAttribute("id", "subjectRecap"); subjectRecap.setAttribute("name", "subjectRecap"); subjectRecap.setAttribute("class", "hidden");

        const subjectRecapResultados = document.createElement("div");
        subjectRecapResultados.setAttribute("id", "subjectRecapResultados");

        document.getElementById("subjectRecapDiv").appendChild(subjectRecapName);
        document.getElementById("subjectRecapDiv").appendChild(subjectRecap);
        document.getElementById("subjectRecapDiv").appendChild(subjectRecapResultados);

    //7. Closing
        var close = "<div class='divTituloModal'><br><span class='labelModal'>Muchas gracias, le atendió (Nombre Agente), que tenga un excelente día hasta luego.</span><br><br></div>";
        for(var c = 0; c<filtro.length; c++){
close += "       <div style='padding: 20px 10px 20px 10px;'>";
close += "           <div class='modalScriptRow'>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label style='display: block; width: 100%; text-align: center;' class='labelModal'>Se ha creado el siguiente caso</label></div>";
close += "              </div>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label id='caseNumber2' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
close += "              </div>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label id='createdDateCase2' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
close += "              </div>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label id='subjectCase2' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
close += "              </div>";
close += "           </div>";
close += "       </div>";
close += "       <div style='padding: 20px 10px 20px 10px;'>";
close += "           <div class='modalScriptRow'>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label style='display: block; width: 100%; text-align: center;' class='labelModal'>Se ha creado la siguiente oportunidad</label></div>";
close += "              </div>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label id='stageOpp' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
close += "              </div>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label id='createdDateOpp' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
close += "              </div>";
close += "              <div style='width: 25%;'>";
close += "                   <div class='divInputScript'><label id='subjectOpp' style='display: block; width: 100%; text-align: center;' class='labelModal'></label></div>";
close += "              </div>";
close += "           </div>";
close += "       </div>";
        }
        document.getElementById("modalScriptClosing").innerHTML = close;
        
    });
}
function probeNext(){
    var container = document.querySelector('#modalScriptProbeBody');
    var child = container.querySelector('.probe_active');
    console.log(child.id);
    if(child.id === "homeDivProbe"){
        if(!document.getElementById("notasHomeProbe").value.trim()){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar, se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        }else{
            _Lista.homeDivProbe();
            setTimeout(function() { next(child); }, 1000);
            document.getElementById("modalScriptProbePrevious").classList.remove("disabled");
        }
    }
    if(child.id === "taxinfoDivProbe"){
        casadoAuth();
        notaIngresoEsposo();
        if(!document.querySelector('input[name="nombreTaxInfoProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        }else if(!document.querySelector('input[name="seguroTaxInfoProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        }else if(!document.getElementById("notasTaxInfoProbe").value.trim()){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar, se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        }else{
            _Lista.taxinfoDivProbe();
            setTimeout(function() { next(child); }, 1000);
        }
    }
    if(child.id === "filingDivProbe"){
        dependentsDiv();
        agregarDependientesDiv();
        mostrarCantidadDineroDiv();
        if(!document.querySelector('input[name="estadocivilFilingProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione estado civil</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }else if(document.querySelector('input[name="estadocivilFilingProbe"]:checked').value === "Casado"){
            if(!document.querySelector('input[name="certificadoFilingProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }
            if(!document.querySelector('input[name="ingresosFilingProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }
        }
        if(!document.getElementById("notasFilingProbe").value.trim()){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }
        if(true){
            _Lista.filingDivProbe();
            setTimeout(function() { next(child); }, 1000);
        }
    }
    if(child.id === "dependentsDivProbe"){
        mostrarNormasW2Div();
        mostrarW2Div();
        mostrarDeclaraIngresosDiv();
        mostrarRentaDiv();
        mostrar1099Div();
        if(!document.querySelector('input[name="dependienteDependentsProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }else if(document.querySelector('input[name="dependienteDependentsProbe"]:checked').value === "Si"){
            if(!document.querySelector('input[name="changeDependentProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }else if(document.querySelector('input[name="changeDependentProbe"]:checked').value === "Agregar"){
                if(!document.getElementById('agregarChangeProbe').value || document.getElementById('agregarChangeProbe').value === "0"){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 4.1.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }else if(!document.getElementById("nombresAgregarChangeProbe").value.trim()){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca el nombre del dependiente o dependientes a agregar</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }
            }else if(document.querySelector('input[name="changeDependentProbe"]:checked').value === "Retirar"){
                if(!document.getElementById('retirarChangeProbe').value || document.getElementById('retirarChangeProbe').value === "0"){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 4.1.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }else if(!document.getElementById("nombresRetirarChangeProbe").value.trim()){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca el nombre del dependiente o dependientes a retirar</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }else if(!document.querySelector('input[name="motivoRetirarProbe"]:checked')){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.1.5</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }
            }
            if(!document.querySelector('input[name="trabajaIncomeDependentProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }else if(document.querySelector('input[name="trabajaIncomeDependentProbe"]:checked').value === "Si"){
                if(!document.getElementById('cantidadIncomeDependentProbe').value || document.getElementById('cantidadIncomeDependentProbe').value === "0"){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 4.2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                } 
            }
            if(!document.querySelector('input[name="asistirIncomeDependentProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.2.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }
            if(!document.querySelector('input[name="extraDeductionDependentProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }
        }
        if(!document.getElementById("notasDependentsProbe").value.trim()){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }
        if(true){
            _Lista.dependentsDivProbe();
            setTimeout(function() { next(child); }, 1000);
        }
    }
    if(child.id === "incomeDivProbe"){
        mostrarNormasW2Div();
        mostrarW2Div();
        mostrarDeclaraIngresosDiv();
        mostrar1099Div();
        mostrarRentaDiv();
        if(!document.querySelector('input[name="retencionIncomeProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }else if(document.querySelector('input[name="retencionIncomeProbe"]:checked').value === "Si"){
            if(!document.querySelector('input[name="normasIncomeProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.1.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }else if(document.querySelector('input[name="normasIncomeProbe"]:checked').value === "Si"){
                if(!document.getElementById("cuantasW2IncomeProbe").value || document.getElementById("cuantasW2IncomeProbe").value === "0"){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 5.1.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }
            }
        }
        if(!document.querySelector('input[name="pagoIncomeProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }else if(document.querySelector('input[name="pagoIncomeProbe"]:checked').value === "En cash o sin descuentos"){
            if(!document.querySelector('input[name="declaraIncomeProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }else if(document.querySelector('input[name="declaraIncomeProbe"]:checked').value === "1099"){
                if(!document.getElementById("cuantas1099IncomeProbe").value || document.getElementById("cuantas1099IncomeProbe").value === "0"){
                    document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 5.2.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                    return false;
                }
            }
        }
        if(!document.getElementById("detalleIncomeProbe").value){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }
        if(!document.querySelector('input[name="casaIncomeProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.4</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }else if(document.querySelector('input[name="casaIncomeProbe"]:checked').value === "Si"){
            if(!document.querySelector('input[name="crpIncomeProbe"]:checked')){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.4.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }
            if(!document.getElementById("listaIncomeProbe").value){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.4.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
                return false;
            }
        }
        if(!document.getElementById("notasIncomeProbe").value.trim()){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }
        if(true){
            _Lista.incomeDivProbe();
            setTimeout(function() { next(child); }, 1000);
        }
    }
    if(child.id === "crpDivProbe"){
        if(!document.querySelector('input[name="crpProbe"]:checked')){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 6</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }
        if(!document.getElementById("notasCRPProbe").value.trim()){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
            return false;
        }
        if(true){
            _Lista.crpDivProbe();
            setTimeout(function() { 
                next(child);
                document.getElementById("modalScriptProbeNext").classList.add("hidden");
                document.getElementById("modalScriptProbeSave").classList.remove("hidden");
            }, 1000);
        }
    }
}
function next(child){
    let next = child.nextElementSibling;
    if(next){
        next.classList.remove("probe_hidden");
        next.classList.add("probe_active");

        child.classList.remove("probe_active");
        child.classList.add("probe_hidden");
    }
    let next2 = next.nextElementSibling;
    if(!next2){
        document.getElementById("modalScriptProbeNext").classList.add("disabled");
    }
}
function probePrevious(){
  var container = document.querySelector('#modalScriptProbeBody');
  var child = container.querySelector('.probe_active');
    if(child.id !== "crpDivProbe"){
        document.getElementById("modalScriptProbeNext").classList.remove("hidden");
        document.getElementById("modalScriptProbeSave").classList.add("hidden");
    }
  let prev = child.previousElementSibling;
  if(prev){
    prev.classList.remove("probe_hidden");
    prev.classList.add("probe_active");

    child.classList.remove("probe_active");
    child.classList.add("probe_hidden");
  }

  let prev2 = prev.previousElementSibling;
  if(!prev2){
    document.getElementById("modalScriptProbePrevious").classList.add("disabled");
  }

  let next = child.nextElementSibling;
  if(!next){
    document.getElementById("modalScriptProbeNext").classList.remove("disabled");
  }
}
function recapScriptMenu(){
    _Lista.recapUpdate();
    _Lista.scriptUpdate();
    setTimeout(function() {
        _Lista.verRecap(document.getElementById("csList").value);
        _Lista.verScript(document.getElementById("scriptCaseId").value);
        document.getElementById("recapScript").classList.add("menu_active");
        document.getElementById("recapScriptDiv").classList.remove("hidden");

        document.getElementById("editRecap").classList.remove("menu_active");
        document.getElementById("editRecapDiv").classList.add("hidden");
    }, 2000);
}
function editRecapMenu(){
    document.getElementById("editRecap").classList.add("menu_active");
    document.getElementById("editRecapDiv").classList.remove("hidden");

    document.getElementById("recapScript").classList.remove("menu_active");
    document.getElementById("recapScriptDiv").classList.add("hidden");
}

//index
function parentezcoGreet(source){
    var checkboxes = document.getElementsByName('parentezcoTitularGreet[]');
    var checkboxesChecked = [];
    for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    return checkboxesChecked;
}
function mostrarTipoAgenciaDivGreet(){
var checkboxesChecked = parentezcoGreet();
if(checkboxesChecked.length === 0){
    document.getElementById("personaLlamadaDiv").classList.remove("hidden");
    document.getElementById("tipoAgenciaGreetDiv").classList.add("hidden");
}
if(checkboxesChecked.length === 1){
    if(checkboxesChecked.includes("Otro")){
    document.getElementById("tipoAgenciaGreetDiv").classList.remove("hidden");
    document.getElementById("personaLlamadaDiv").classList.add("hidden");
    }else if(checkboxesChecked.includes("All")){
    document.getElementById("tipoAgenciaGreetDiv").classList.add("hidden");
    document.getElementById("personaLlamadaDiv").classList.add("hidden");
    }else{
    document.getElementById("tipoAgenciaGreetDiv").classList.add("hidden");
    document.getElementById("personaLlamadaDiv").classList.remove("hidden");
    }
}
if(checkboxesChecked.length > 1){
    if(checkboxesChecked.includes("Otro")){
    document.getElementById("tipoAgenciaGreetDiv").classList.add("hidden")
    document.getElementById("personaLlamadaDiv").classList.add("hidden");
    }else{
    document.getElementById("tipoAgenciaGreetDiv").classList.add("hidden");
    document.getElementById("personaLlamadaDiv").classList.remove("hidden");
    }
}
}
function casadoAuth(){
    if(document.getElementById('estadocivilFilingProbeCasado').checked) {
        document.getElementById('casadoDiv').classList.remove("hidden");
    }else{
        document.getElementById('casadoDiv').classList.add("hidden");
    }
}
function notaIngresoEsposo(){
    if(document.getElementById('ingresosFilingProbeNo').checked){
        document.getElementById('notaIngresoEsposoDiv').classList.add("hidden");
    }else if(document.getElementById('ingresosFilingProbeSi').checked){
        document.getElementById('notaIngresoEsposoDiv').classList.remove("hidden");
    }
}
function dependentsDiv(){
    if(document.getElementById('dependienteDependentsProbeSi').checked){
        document.getElementById('dependentsDivSi').classList.remove("hidden");
    }else{
        document.getElementById('dependentsDivSi').classList.add("hidden");
    }
}
function agregarDependientesDiv(){
    if(document.getElementById('changeDependentProbeAgregar').checked){
        document.getElementById('agregarDependientesDiv').classList.remove("hidden");
        document.getElementById('retirarDependientesDiv').classList.add("hidden");
    }else if(document.getElementById('changeDependentProbeRetirar').checked){
        document.getElementById('agregarDependientesDiv').classList.add("hidden");
        document.getElementById('retirarDependientesDiv').classList.remove("hidden");
    }
}
function mostrarCantidadDineroDiv(){
    if(document.getElementById('trabajaIncomeDependentProbeSi').checked){
        document.getElementById('cantidadDineroDiv').classList.remove("hidden");
    }else{
        document.getElementById('cantidadDineroDiv').classList.add("hidden");
    }
}
function mostrarNormasW2Div(){
    if(document.getElementById('retencionIncomeProbeSi').checked){
        document.getElementById('normasW2Div').classList.remove("hidden");
    }else{
        document.getElementById('normasW2Div').classList.add("hidden");
    }
}
function mostrarW2Div(){
    if(document.getElementById('normasIncomeProbeSi').checked){
        document.getElementById('cuantasW2Div').classList.remove("hidden");
    }else{
        document.getElementById('cuantasW2Div').classList.add("hidden");
    }
}
function mostrarDeclaraIngresosDiv(){
    if(document.getElementById('pagoIncomeProbeEfectivo').checked){
        document.getElementById('declaraIngresosDiv').classList.remove("hidden");
    }else{
        document.getElementById('declaraIngresosDiv').classList.add("hidden");
    }
}
function mostrar1099Div(){
    if(document.getElementById('declaraIncomeProbe1099').checked){
        document.getElementById('cuantas1099Div').classList.remove("hidden");
    }else{
        document.getElementById('cuantas1099Div').classList.add("hidden");
    }
}
function mostrarRentaDiv(){
    if(document.getElementById('casaIncomeProbeSi').checked){
        document.getElementById('rentaIngresoDiv').classList.remove("hidden");
    }else{
        document.getElementById('rentaIngresoDiv').classList.add("hidden");
    }
}


export { cambiarContactScript, probeNext, probePrevious, recapScriptMenu, editRecapMenu };