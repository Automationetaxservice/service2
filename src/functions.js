import conexionSF from "./connection";
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";

const exports = {};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactosLista = void 0;

var _Lista = require("./salesforceValues");

var csList = function test(){
  _Lista.customerService(function(records){
    var elemento = "<option value=' '>None</option>";
    for(var c = 0; c < records.length; c++){
      elemento += "<option value='"+ records[c].recordId +"'>"+ records[c].idCall +"</option>";
    }
    document.getElementById("csList").innerHTML = elemento;
  });
}
exports.csList = csList;

var accountList = function accountList(account){
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then(async (res) => {
    const cs = await conn.sobject('Customer_Service__c').retrieve(account);
    var id = cs.Account_2__c;
    try{
      const ac = await conn.sobject('Account').retrieve(id);
      var nombre = ac.Name;
      document.getElementById("llamadaAccountName").value = nombre;
      document.getElementById("llamadaAccountGreet").value = id;
      document.getElementById("accountRecapName").value = nombre;
      document.getElementById("accountRecap").value = id;
    }catch(e){}
  });
}
function accounts(account){
  if(document.getElementById("llamadaAccountName").value.length === 0){
    document.getElementById("accountResultados").innerHTML = "";
  }
  document.getElementById("llamadaAccountGreet").value = "";
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
    conn.query("SELECT Id, Name FROM Account WHERE Name LIKE '%"+account+"%' ORDER By Name").then((result) => {
      var elemento = "";
      for(var k = 0; k < result.totalSize; k++){
          elemento += "<div class='labelModal' onclick='selectAccount(`"+result.records[k].Id+"`, `"+result.records[k].Name+"`);'>"+result.records[k].Name+"</div>";
      }
      document.getElementById("accountResultados").innerHTML = elemento;
    });
  });
}
function accountsRecap(account){
  if(document.getElementById("accountRecapName").value.length === 0){
    document.getElementById("accountRecapResultados").innerHTML = "";
  }
  document.getElementById("accountRecap").value = "";
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
    conn.query("SELECT Id, Name FROM Account WHERE Name LIKE '%"+account+"%' ORDER By Name").then((result) => {
      var elemento = "";
      for(var k = 0; k < result.totalSize; k++){
          elemento += "<div class='labelModal' onclick='selectAccountRecap(`"+result.records[k].Id+"`, `"+result.records[k].Name+"`);'>"+result.records[k].Name+"</div>";
      }
      document.getElementById("accountRecapResultados").innerHTML = elemento;
    });
  });
}

var accountUserList = function test(){
  _Lista.accountsUser(function(records){
    var elemento = "";
    for(var c = 0; c < records.length; c++){
        elemento += "<option value='"+ records[c].id +"'>"+ records[c].nombre +"</option>";
    }
    document.getElementById("listaContador").innerHTML = elemento;
  });
}

var contactList = function contactList(contacto){
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then(async (res) => {
    const cs = await conn.sobject('Customer_Service__c').retrieve(contacto);
    var id = cs.Contact_2__c;
    try{
      const con = await conn.sobject('Contact').retrieve(id);
      var nombre = con.Name;
      document.getElementById("llamadaContactName").value = nombre;
      document.getElementById("llamadaContactGreet").value = id;
      document.getElementById("contactRecapName").value = nombre;
      document.getElementById("contactRecap").value = id;
    }catch(e){}
  });
}
function contacts(contact){
  if(document.getElementById("llamadaContactName").value.length === 0){
    document.getElementById("contactResultados").innerHTML = "";
  }
  document.getElementById("llamadaContactGreet").value = "";
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
    conn.query("SELECT Id, Name FROM Contact WHERE Name LIKE '%"+contact+"%' ORDER By Name").then((result) => {
      var elemento = "";
      for(var k = 0; k < result.totalSize; k++){
          elemento += "<div class='labelModal' onclick='selectContact(`"+result.records[k].Id+"`, `"+result.records[k].Name+"`);'>"+result.records[k].Name+"</div>";
      }
      document.getElementById("contactResultados").innerHTML = elemento;
    });
  });
}
function contactsRecap(contact){
  if(document.getElementById("contactRecapName").value.length === 0){
    document.getElementById("contactRecapResultados").innerHTML = "";
  }
  document.getElementById("contactRecap").value = "";
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
    conn.query("SELECT Id, Name FROM Contact WHERE Name LIKE '%"+contact+"%' ORDER By Name").then((result) => {
      var elemento = "";
      for(var k = 0; k < result.totalSize; k++){
          elemento += "<div class='labelModal' onclick='selectContactRecap(`"+result.records[k].Id+"`, `"+result.records[k].Name+"`);'>"+result.records[k].Name+"</div>";
      }
      document.getElementById("contactRecapResultados").innerHTML = elemento;
    });
  });
}

var keywordList = function test(){
  var cs = document.getElementById("csList").value;
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then(async (res) => {
    try{
      const kc = await conn.sobject('Customer_Service__c').retrieve(cs);
      var id = kc.Keywords_Cases__c;
      const con = await conn.sobject('Keywords_Cases__c').retrieve(id);
      var nombre = con.Name;
      document.getElementById("keywordListName").value = nombre;
      document.getElementById("keywordList").value = id;
      document.getElementById("subjectRecapName").value = nombre;
      document.getElementById("subjectRecap").value = id;
    }catch(e){}
  });
}
function keywords(){
  var key = document.getElementById("keywordListName").value;
  document.getElementById("keywordList").value = "";
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
    conn.query("SELECT Id, Name, Case_Resolution__c FROM Keywords_Cases__c WHERE Name LIKE '%"+key+"%' ORDER BY Name").then((result) => {
      var elemento = "";
      for(var k = 0; k < result.totalSize; k++){
        if(result.records[k].Case_Resolution__c){
          elemento += "<div class='labelModal' onclick='selectKeyword(`"+result.records[k].Id+"`, `"+result.records[k].Name+"`);'>"+result.records[k].Name+"</div>";
        }else{
          elemento += "<div class='labelModal' style='color: #ccc'>"+result.records[k].Name+"</div>";
        }
      }
      document.getElementById("keywordListResultados").innerHTML = elemento;
      if(key.length === 0){
        document.getElementById("keywordListResultados").innerHTML = "";
      }
    });
  });
}
function keywordsRecap(){
  var key = document.getElementById("subjectRecapName").value;
  document.getElementById("subjectRecap").value = "";
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
    conn.query("SELECT Id, Name, Case_Resolution__c FROM Keywords_Cases__c WHERE Name LIKE '%"+key+"%' ORDER BY Name").then((result) => {
      var elemento = "";
      for(var k = 0; k < result.totalSize; k++){
        if(result.records[k].Case_Resolution__c){
          elemento += "<div class='labelModal' onclick='selectKeywordRecap(`"+result.records[k].Id+"`, `"+result.records[k].Name+"`);'>"+result.records[k].Name+"</div>";
        }else{
          elemento += "<div class='labelModal' style='color: #ccc'>"+result.records[k].Name+"</div>";
        }
      }
      document.getElementById("subjectRecapResultados").innerHTML = elemento;
      if(key.length === 0){
        document.getElementById("subjectRecapResultados").innerHTML = "";
      }
    });
  });
}


var nextScript = function nextScript(){
  var container = document.querySelector('#modalScriptBody');
  var child = container.querySelector('.active');
  console.log(child.id);
  var idCService = document.getElementById("csList").value;
  var accountId = document.getElementById("idAccount").value;
  var contactId = document.getElementById("idContacto").value;
  if(child.id === "modalScriptGreeting"){
    if(!document.getElementById("ayudaGreet").value.trim()){
        document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Agregue asunto en el punto 1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        return false;
    }
    if(document.getElementById("provieneLlamadaGreet").value === " "){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }else if(document.getElementById("provieneLlamadaGreet").value === "En nombre del cliente de terceros"){
      if(!document.querySelector('input[name="parentezcoTitularGreet[]"]:checked')){
        document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        return false;
      }else if(document.querySelector('input[name="parentezcoTitularGreet[]"]:checked').value === "Otro"){
        if(!document.querySelector('input[name="tipoAgenciaGreet[]"]:checked')){
          document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
          return false;
        }
      }
      var array = []; var checkboxes = document.querySelectorAll('input[name="parentezcoTitularGreet[]"]:checked');
      for (var i = 0; i < checkboxes.length; i++) { array.push(checkboxes[i].value); }
      if(!array.includes("Otro")){
        if(!document.getElementById("llamadaAccountGreet").value.trim()){
          document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una Cuenta en el punto 2.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
          return false;
        }
        if(!document.getElementById("llamadaContactGreet").value.trim()){
          document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione un Contacto en el punto 2.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
          return false;
        }
      }
    }
    if(document.getElementById("tipoClienteGreet").value === " "){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.querySelector('input[name="asistidoImpuestos[]"]:checked')){
        document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        return false;
    }
    if(!document.querySelector('input[name="apoyarImpuestos[]"]:checked')){
        document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        return false;
    }
    if(true){
      next(child);
      _Lista.verAuthentication();
    }
  }
  if(child.id === "modalScriptAuthentication"){
    if(!document.querySelector('input[name="nombreAuth"]:checked')){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.getElementById("firstNameAuth").value.trim() || !document.getElementById("lastNameAuth").value.trim()){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduce nombre y apellido</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.querySelector('input[name="telefonoAuth"]:checked')){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.getElementById("phoneNumberAuth").value.trim()){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduce número telefónico</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.querySelector('input[name="correoAuth"]:checked')){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.getElementById("emailAuth").value.trim()){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduce correo electrónico</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.querySelector('input[name="seguroAuth"]:checked')){
        document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
        return false;
    }
    if(!document.getElementById("ssnAuth").value.trim()){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduce número de seguro social</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.querySelector('input[name="direccionAuth"]:checked')){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.getElementById("streetAuth").value.trim() || !document.getElementById("cityAuth").value.trim() || !document.getElementById("stateAuth").value.trim() || !document.getElementById("countryAuth").value.trim() || !document.getElementById("postalCodeAuth").value.trim()){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduce dirección completa</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.querySelector('input[name="fechaAuth"]:checked')){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 6</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(!document.getElementById("dobAuth").value.trim()){
      document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduce fecha de nacimiento</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
      return false;
    }
    if(true){
      next(child);
      var conn = new conexionSF();
      conn.login('doc@francistaxservice.com', 'Server2024..').then((res) => {
        conn.query("SELECT Id FROM Case WHERE Customer_Support__c ='"+idCService+"' and AccountId='"+accountId+"' and ContactId='"+contactId+"' ").then((result) => {
          if(result.totalSize === 0){
            document.getElementById("modalScriptNext").style.display = "none";
            document.getElementById("newCaseAuth").innerHTML = "New Case";
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para Avanzar: Se requiere crear un caso</span>";
            document.getElementById("messageWarning").classList.remove("hidden");
          }else{
            document.getElementById("modalScriptNext").style.display = "block";
            document.getElementById("newCaseAuth").innerHTML = "Update Case";
            document.getElementById("messageWarning").classList.add("hidden");
          }
        });
      });
    }
    keywordList();
  }else{
    document.getElementById("modalScriptNext").style.display = "block";
  }
  if(child.id === "modalScriptProblem"){
    _Lista.scriptCase(idCService, accountId, contactId);
    next(child);
  }
  if(child.id === "modalScriptProbe"){
    document.getElementById("modalScriptAgreementChild").classList.remove("hidden");
    accountUserList();
    calendario();
    next(child);
  }
  if(child.id === "modalScriptAgreement"){
    var ayuda = document.getElementById("ayudaGreet").value;
    var provieneLlamada = document.getElementById("provieneLlamadaGreet").value;

    var checkParentezco = ""; var count = 0;
    var parentezcoTitularGreet = document.getElementsByName('parentezcoTitularGreet[]');
    var total = document.querySelectorAll("input[name='parentezcoTitularGreet[]']:checked").length;
    if(total === 7){total = total - 1;}
    for (var p=0; p<parentezcoTitularGreet.length; p++) { if(parentezcoTitularGreet[p].checked && parentezcoTitularGreet[p].value !== "All") { count++; if(count === total){ checkParentezco += parentezcoTitularGreet[p].value;  }else{ checkParentezco += parentezcoTitularGreet[p].value+';'; } } }
    
    var checktipoAgencia = ""; var count2 = 0;
    var tipoAgenciaGreet = document.getElementsByName('tipoAgenciaGreet[]');
    var total2 = document.querySelectorAll("input[name='tipoAgenciaGreet[]']:checked").length;
    if(total2 === 6){ total2 = total2 - 1; }
    for (var j=0; j<tipoAgenciaGreet.length; j++) { if(tipoAgenciaGreet[j].checked && tipoAgenciaGreet[j].value !== "All") { count2++; if(count2 === total2){ checktipoAgencia += tipoAgenciaGreet[j].value; }else{ checktipoAgencia += tipoAgenciaGreet[j].value+';'; } } }

    var llamadaAccount = document.getElementById("llamadaAccountGreet").value;
    var llamadaContact = document.getElementById("llamadaContactGreet").value;
    var tipoCliente = document.getElementById("tipoClienteGreet").value;

    var checkAsistidoImpuestos = ""; var count3 = 0;
    var asistidoImpuestos = document.getElementsByName('asistidoImpuestos[]');
    var total3 = document.querySelectorAll("input[name='asistidoImpuestos[]']:checked").length;
    if(total3 === 13){ total3 = total3 - 1; }
    for (var a=0; a<asistidoImpuestos.length; a++) { if(asistidoImpuestos[a].checked && asistidoImpuestos[a].value !== "All") {  count3++; if(count3 === total3){ checkAsistidoImpuestos += asistidoImpuestos[a].value; }else{ checkAsistidoImpuestos += asistidoImpuestos[a].value + ';'; } } }

    var checkapoyarImpuestos = ""; var count4 = 0;
    var apoyarImpuestos = document.getElementsByName('apoyarImpuestos[]');
    var total4 = document.querySelectorAll("input[name='apoyarImpuestos[]']:checked").length;
    if(total4 === 16){ total4 = total4 - 1; }
    for (var ap=0; ap<apoyarImpuestos.length; ap++) { if(apoyarImpuestos[ap].checked && apoyarImpuestos[ap].value !== "All") { count4++; if(count4 === total4){ checkapoyarImpuestos += apoyarImpuestos[ap].value; }else{ checkapoyarImpuestos += apoyarImpuestos[ap].value + ';'; } } }
    _Lista.greetingUpdate(idCService, ayuda, provieneLlamada, checkParentezco, checktipoAgencia, llamadaAccount, llamadaContact, tipoCliente, checkAsistidoImpuestos, checkapoyarImpuestos);

    var idContact = document.getElementById("idContacto").value; var firstName = document.getElementById("firstNameAuth").value; var lastName = document.getElementById("lastNameAuth").value; 
    var phone = document.getElementById("phoneNumberAuth").value; var phoneNotes = document.getElementById("phoneNotesAuth").value; var email = document.getElementById("emailAuth").value; 
    var ssn = document.getElementById("ssnAuth").value; var street = document.getElementById("streetAuth").value; var city = document.getElementById("cityAuth").value; var state = document.getElementById("stateAuth").value; var country = document.getElementById("countryAuth").value; var postal_code = document.getElementById("postalCodeAuth").value; var dob = document.getElementById("dobAuth").value;
    _Lista.authenticationUpdate(idContact, firstName, lastName, phone, phoneNotes, email, ssn, street, city, state, country, postal_code, dob);
    
    var scriptCaseId = document.getElementById("scriptCaseId").value;
    if(scriptCaseId){
      _Lista.verScript(scriptCaseId);
    }
    _Lista.verCaso(idCService, idContact, document.getElementById("idAccount").value);
    

    setTimeout(function() {
      next(child);
      _Lista.verRecap(idCService);
      estadoCivilRecap();
      ingresosEsposoRecap();
      agregarRecap();
      retirarRecap();
      dineroRecap();
      cuantasW2Recap();
      forma1099Recap();
    }, 1000);
    
  }
  if(child.id === "modalScriptRecap"){
    if(!document.getElementById("nombreClienteRecap").value.trim()){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Escriba Nombre del Cliente</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("quienLlamadaRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione de quién proviene la llamada</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("accountRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Selecciona una Cuenta</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("contactRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Selecciona un Contacto</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.querySelector('input[name="parentezcoTitularRecap[]"]:checked')){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione Tipo de Parentezco</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.querySelector('input[name="asistidoRecap[]"]:checked')){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione Año de Impuestos</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.querySelector('input[name="tipoAgenciaRecap[]"]:checked')){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione Tipo de Agencia</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("subjectRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione Subject</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("solicitudRecap").value.trim()){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Escriba Solicitud del Cliente</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("entrevistaRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("horarioRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 1.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("actualizarEstadoRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("cambioNombreRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("cambioSeguroRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 2.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("estadoCivilRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(document.getElementById("estadoCivilRecap").value === "Casado"){
      if(!document.getElementById("certificadoMatrimonioRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
      if(!document.getElementById("ingresosEsposoRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 3.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }      
    }
    
    if(!document.getElementById("agregarDependientesRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(document.getElementById("agregarDependientesRecap").value === "Si"){
      if(!document.getElementById("cuantosDependientesRecap").value.trim() || document.getElementById("cuantosDependientesRecap").value === "0"){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 4.1.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
      if(!document.getElementById("nombreDependienteRecap").value.trim()){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Escriba Nombre Completo del Dependiente en el punto 4.1.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    }
    if(!document.getElementById("retirarDependienteRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(document.getElementById("retirarDependienteRecap").value && document.getElementById("retirarDependienteRecap").value !== "No"){
      if(!document.getElementById("nombreRetirarDependienteRecap").value.trim()){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Escriba Nombre Completo del Dependiente en el punto 4.2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
      if(!document.getElementById("motivoRetiraDependienteRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.2.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    }
    if(!document.getElementById("dependienteTrabajaDependienteRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(document.getElementById("dependienteTrabajaDependienteRecap").value === "Si"){
      if(!document.getElementById("cantidadDineroRecap").value.trim() || document.getElementById("cantidadDineroRecap").value === "0"){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 4.3.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    }
    if(!document.getElementById("asistirRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.3.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("cuidadoInfantilRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.4</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("universidadRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.4.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("utilesRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.4.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("gastosExtraRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 4.4.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("documentosRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("formasW2Recap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(document.getElementById("formasW2Recap").value === "Si"){
      if(!document.getElementById("cuantasW2Recap").value.trim() || document.getElementById("cuantasW2Recap").value === "0"){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 5.2.1</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    }
    if(!document.getElementById("declaraIngresosRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.2.2</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(document.getElementById("declaraIngresosRecap").value === "1099"){
      if(!document.getElementById("1099BancoRecap").value.trim() || document.getElementById("1099BancoRecap").value === "0"){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Introduzca un valor mayor a 0 en el punto 5.2.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    }

    
    if(!document.getElementById("desempleoRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.3</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("ingresoJuegoRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.4</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("otroIngresoRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 5.5</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("formasIngresoRecap").value.trim()){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Escriba Otro Tipo de Formas en el punto 5.6</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(!document.getElementById("documentoPropiedadRecap").value){ document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Seleccione una opción en el punto 6</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000); return false; }
    if(true){
      _Lista.recapUpdate();
      _Lista.scriptUpdate();
      next(child);
    }
  }
}
exports.nextScript = nextScript;
function next(child){
  let next = child.nextElementSibling;
  if(next){
    next.classList.remove("hidden");
    next.classList.add("active");

    child.classList.remove("active");
    child.classList.add("hidden");
  }

  let next2 = next.nextElementSibling;
  if(!next2){
    document.getElementById("modalScriptNext").classList.add("disabled");
  }

  let prev = child.previousElementSibling;
  if(!prev){
    document.getElementById("modalScriptPrevious").classList.remove("disabled");
  }
}

var previousScript = function previousScript(){
  var container = document.querySelector('#modalScriptBody');
  var child = container.querySelector('.active');
  if(child.id !== "modalScriptAuthentication"){
    document.getElementById("modalScriptNext").style.display = "block";
    document.getElementById("messageWarning").classList.add("hidden");
  }
  let prev = child.previousElementSibling;
  if(prev){
    prev.classList.remove("hidden");
    prev.classList.add("active");

    child.classList.remove("active");
    child.classList.add("hidden");
  }
  
  let prev2 = prev.previousElementSibling;
  if(!prev2){
    document.getElementById("modalScriptPrevious").classList.add("disabled");
  }

  let next = child.nextElementSibling;
  if(!next){
    document.getElementById("modalScriptNext").classList.remove("disabled");
  }
}
exports.previousScript = previousScript;


function newCase(){
  var idCS = document.getElementById("csList").value;
  var accountId = document.getElementById("idAccount").value;
  var contactId = document.getElementById("idContacto").value;
  var fecha = new Date();

  var keyword = document.getElementById("keywordList");
  var name = document.getElementById("keywordListName").value;

  var checkapoyarImpuestos = ""; var count4 = 0; var apoyarImpuestos = document.getElementsByName('apoyarImpuestos[]'); 
  var total4 = document.querySelectorAll("input[name='apoyarImpuestos[]']:checked").length; if(total4 === 16){ total4 = total4 - 1; }
  for (var j=0; j<apoyarImpuestos.length; j++) { 
    if(apoyarImpuestos[j].checked && apoyarImpuestos[j].value !== "All") { 
      count4++; if(count4 === total4){ checkapoyarImpuestos += apoyarImpuestos[j].value; }else{ checkapoyarImpuestos += apoyarImpuestos[j].value + ';'; }
    } 
  }
  
  var conn = new conexionSF();
  conn.login('doc@francistaxservice.com', 'Server2024..').then(async (res) => {
    conn.query("SELECT Id FROM Case WHERE Customer_Support__c ='"+idCS+"' and AccountId='"+accountId+"' and ContactId='"+contactId+"' ").then(async (result) => {
      
      if(result.totalSize === 0){
        //Crear Caso
        
          //Obtener nombre del Contacto
          const con = await conn.sobject('Contact').retrieve(contactId);
          var contactName = con.Name;
          
          //Obtener Id de Case Resolution relacionado con la Keyword Id del Customer Service
          const key = await conn.sobject('Keywords_Cases__c').retrieve(keyword.value);
          var caseResolution = key.Case_Resolution__c;
          
          //Obtener información del Case Resolution Relacionado a Keyword
          try{
            const caseRes = await conn.sobject('Case_Resolution__c').retrieve(caseResolution);
            if(caseRes){
              
              //Crear Caso con resultados de Case Resolution
              await conn.sobject("Case").create(
                {
                  AccountId: accountId,
                  ContactId: contactId,
                  Description: document.getElementById("ayudaGreet").value,
                  Customer_Support__c: idCS,
                  Priority: caseRes.Priority__c,
                  Project_Name__c: caseRes.Project_Name__c,
                  Client_Type__c: caseRes.Client_Type__c,
                  Activity_Type__c: caseRes.Activity_Type__c,
                  Product_Service_Name__c: caseRes.Product_Service_Name__c,
                  Type_Of_Job__c: caseRes.Type_Of_Job__c,
                  Tax_Year__c: checkapoyarImpuestos,
                  Default_Team_Department_Unit__c: caseRes.Default_Team_Department_Unit__c,
                  Default_Agent_Level__c: caseRes.Default_Agent_Level__c,
                  Request_Type__c: caseRes.Request_Type__c,
                  Work_Types__c: caseRes.Work_Types__c,
                  Segments__c: caseRes.Segments__c,
                  Package__c: caseRes.Package__c,
                  Section__c: caseRes.Section__c,
                  Service_Frequency__c: caseRes.Service_Frequency__c,
                  Channel_Preference__c: caseRes.Channel_Preference__c,
                  Lenguage__c: caseRes.Languaje__c,
                  Case_Type__c: caseRes.Case_Type__c,
                  Ocurance_Type__c: caseRes.Ocurance_Type__c,
                  Current_Stage_Solution__c: caseRes.Current_Stage_Solution__c,
                  Client_Main_Characteristics__c: caseRes.Client_Main_Characteristics__c,
                  Origin: caseRes.Case_Origin__c,
                  TaxesUnique__c: "taxes",
                  Year__c: checkapoyarImpuestos.split(";").pop(),
                  Subject: name+', '+checkapoyarImpuestos.split(";").pop()+', '+contactName
                }
              );
              
              //Crear Oportunidad
              await conn.sobject("Opportunity").create({
                Name: name+', '+checkapoyarImpuestos.split(";").pop()+', '+contactName,
                AccountId: accountId,
                Tax_Year__c: checkapoyarImpuestos.split(";").pop(),
                CloseDate: fecha.setHours(0, 0, 0, 0),
                StageName: "Qualification",
                Customer_Support__c: idCS,
                Description: document.getElementById("ayudaGreet").value,
                TaxesUnique__c: "taxes",
                Contact__c: contactId
              });
              
              //Crear Script Case
              await conn.sobject("Script_Case__c").create(
                {
                  Account__c: accountId,
                  Contact__c: contactId,
                  Customer_Support__c: idCS,
                  Keywords_Cases__c: keyword.value
                }
              );
              
              //Actualizar Keyword de Customer Service
              await conn.sobject("Customer_Service__c").update({
                  Id: document.getElementById("csList").value,
                  Keywords_Cases__c: keyword.value
              });
              
              document.getElementById("modalScriptNext").style.display = "block";
              document.getElementById("newCaseAuth").innerHTML = "Update Case";

              document.getElementById("messageWarning").classList.add("hidden");
              document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Caso y Oportunidad creados exitosamente</span>";
              document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 5000);
              
            }
          }catch(err){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>No hay Resolución de Caso para esta Keyword</span>";
            document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 5000);
          }
        
        
      }else{
        
        //Actualizar Keyword del Caso
          //Obtener nombre del Contacto
          const con = await conn.sobject('Contact').retrieve(contactId);
          var nombreContacto = con.Name;

          //De Keyword seleccionada, obtener Id de su Case Resolution
          const key = await conn.sobject('Keywords_Cases__c').retrieve(keyword.value);
          var caseResolucion = key.Case_Resolution__c;
          //Obtener información de Case Resolution
          try{
            await conn.sobject('Case_Resolution__c').retrieve(caseResolucion);
          }catch(err){
            document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>No hay Resolución de Caso para esta Keyword</span>";
            document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 5000);
          }

          const caseRes = await conn.sobject('Case_Resolution__c').retrieve(caseResolucion);
          if(caseRes){
            //Actualizar Keyword de Customer Service
            await conn.sobject("Customer_Service__c").update({
                Id: idCS,
                Keywords_Cases__c: keyword.value
            });
            
            //Actualizar Keyword de Script Case
            conn.query("SELECT Id FROM Script_Case__c WHERE Account__c='"+accountId+"' and Contact__c='"+contactId+"' and Customer_Support__c='"+idCS+"' ").then(async (result) => {
              await conn.sobject("Script_Case__c").update({
                  Id: result.records[0].Id,
                  Keywords_Cases__c: keyword.value
              });
            });

            //Buscar Id del Caso con el mismo Contact, Account y Customer Service
            conn.query("SELECT Id FROM Case WHERE AccountId='"+accountId+"' and ContactId='"+contactId+"' and Customer_Support__c='"+idCS+"' ").then(async (result) => {
              //Actualizar Caso con resultados de Case Resolution
              const caso = await conn.sobject("Case").update(
                {
                  Id: result.records[0].Id,
                  Priority: caseRes.Priority__c,
                  Project_Name__c: caseRes.Project_Name__c,
                  Client_Type__c: caseRes.Client_Type__c,
                  Activity_Type__c: caseRes.Activity_Type__c,
                  Product_Service_Name__c: caseRes.Product_Service_Name__c,
                  Type_Of_Job__c: caseRes.Type_Of_Job__c,
                  Default_Team_Department_Unit__c: caseRes.Default_Team_Department_Unit__c,
                  Default_Agent_Level__c: caseRes.Default_Agent_Level__c,
                  Request_Type__c: caseRes.Request_Type__c,
                  Work_Types__c: caseRes.Work_Types__c,
                  Segments__c: caseRes.Segments__c,
                  Package__c: caseRes.Package__c,
                  Section__c: caseRes.Section__c,
                  Service_Frequency__c: caseRes.Service_Frequency__c,
                  Channel_Preference__c: caseRes.Channel_Preference__c,
                  Lenguage__c: caseRes.Languaje__c,
                  Case_Type__c: caseRes.Case_Type__c,
                  Ocurance_Type__c: caseRes.Ocurance_Type__c,
                  Current_Stage_Solution__c: caseRes.Current_Stage_Solution__c,
                  Client_Main_Characteristics__c: caseRes.Client_Main_Characteristics__c,
                  Origin: caseRes.Case_Origin__c,
                  Subject: name+', '+checkapoyarImpuestos.split(";").pop()+', '+nombreContacto
                }
              );
              document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Caso y Oportunidad actualizados exitosamente</span>";
              if (caso.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 5000); }
            });
            //Actualizar nombre de Oportunidad con nueva Keyword
            conn.query("SELECT Id FROM Opportunity WHERE AccountId='"+accountId+"' and Contact__c='"+contactId+"' and Customer_Support__c='"+idCS+"' ").then(async (result) => {
              await conn.sobject("Opportunity").update(
                {
                  Id: result.records[0].Id,
                  Name: name+', '+checkapoyarImpuestos.split(";").pop()+', '+nombreContacto
                }
              );
            });
          }
        
      }
      
    });
  });
}
function calendario(){
    var contador = document.getElementById("listaContador").value;
    var prioridad = document.getElementById("listaPrioridad").value;
    let filterEvents, eventos, businessHrs;
    if(contador === "0053k00000AvrPvAAJ"){ //Contadora Daniela
      if(prioridad === "Mid-High"){
        eventos = [
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [1, 5, 6],
            startTime: '10:00:00',
            endTime: '11:00:00',
            className: 'yellowEvent',
            display: 'background'
          },  
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [5, 6],
            startTime: '12:00:00',
            endTime: '13:00:00',
            className: 'yellowEvent',
            display: 'background'
          },  
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [5, 6],
            startTime: '14:30:00',
            endTime: '15:30:00',
            className: 'yellowEvent',
            display: 'background'
          },  
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [1],
            startTime: '15:30:00',
            endTime: '16:30:00',
            className: 'yellowEvent',
            display: 'background'
          },
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [6],
            startTime: '16:00:00',
            endTime: '17:00:00',
            className: 'yellowEvent',
            display: 'background'
          },
        ];
        businessHrs = [
          { daysOfWeek: [1], startTime: '10:00', endTime: '11:00' }, 
          { daysOfWeek: [1], startTime: '15:30', endTime: '16:30' }, 
          { daysOfWeek: [5], startTime: '10:00', endTime: '11:00' }, 
          { daysOfWeek: [5], startTime: '12:00', endTime: '13:00' }, 
          { daysOfWeek: [5], startTime: '14:30', endTime: '15:30' }, 
          { daysOfWeek: [6], startTime: '10:00', endTime: '11:00' }, 
          { daysOfWeek: [6], startTime: '12:00', endTime: '13:00' }, 
          { daysOfWeek: [6], startTime: '14:30', endTime: '15:30' }, 
          { daysOfWeek: [6], startTime: '16:00', endTime: '17:00' }, 
        ];
      }
      if(prioridad === "Clients-Support"){
        eventos = [
          {
            title: 'Test',
            start: '1997-04-09T10:00:00',
            end: '1997-04-09T11:00:00',
            display: 'background'
          }
        ];
        businessHrs = [
          { daysOfWeek: [7], startTime: '12:00', endTime: '13:30' }, 
        ];
      }
      if(prioridad === "Monthly-Clients"){
        eventos = [
          {
            title: 'Monthly Clients',
            daysOfWeek: [1, 5, 6],
            startTime: '11:00:00',
            endTime: '12:00:00',
            className: 'redEvent',
            display: 'background'
          }, 
          {
            title: 'Monthly Clients',
            daysOfWeek: [1],
            startTime: '14:30:00',
            endTime: '15:30:00',
            className: 'redEvent',
            display: 'background'
          },  
          {
            title: 'Monthly Clients',
            daysOfWeek: [5],
            startTime: '17:30:00',
            endTime: '18:00:00',
            className: 'redEvent',
            display: 'background'
          },
          {
            title: 'Virtual Monthly Clients',
            daysOfWeek: [1],
            startTime: '17:00:00',
            endTime: '18:00:00',
            className: 'purpleEvent',
            display: 'background'
          },
          {
            title: 'Virtual Monthly Clients',
            daysOfWeek: [4],
            startTime: '10:00:00',
            endTime: '13:30:00',
            className: 'purpleEvent',
            display: 'background'
          },
          {
            title: 'Virtual Monthly Clients',
            daysOfWeek: [4],
            startTime: '15:30:00',
            endTime: '18:00:00',
            className: 'purpleEvent',
            display: 'background'
          },
        ];
        businessHrs = [
          { daysOfWeek: [1], startTime: '11:00', endTime: '12:00' }, 
          { daysOfWeek: [1], startTime: '14:30', endTime: '15:30' }, 
          { daysOfWeek: [1], startTime: '17:00', endTime: '18:00' }, 
          { daysOfWeek: [4], startTime: '10:00', endTime: '13:30' }, 
          { daysOfWeek: [4], startTime: '15:30', endTime: '18:00' }, 
          { daysOfWeek: [5], startTime: '11:00', endTime: '12:00' }, 
          { daysOfWeek: [5], startTime: '17:30', endTime: '18:00' }, 
          { daysOfWeek: [6], startTime: '11:00', endTime: '12:00' }, 
        ];
      }
      if(prioridad === "Low-Mid"){
        eventos = [
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [1],
            startTime: '12:00:00',
            endTime: '13:30:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [5, 6],
            startTime: '13:00:00',
            endTime: '13:30:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [5],
            startTime: '15:30:00',
            endTime: '17:30:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [6],
            startTime: '15:30:00',
            endTime: '16:00:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [6],
            startTime: '17:00:00',
            endTime: '18:00:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Virtual Low to Mid Level Return',
            daysOfWeek: [1],
            startTime: '16:30:00',
            endTime: '17:00:00',
            className: 'purpleEvent',
            display: 'background'
          },
        ];
        businessHrs = [
          { daysOfWeek: [1], startTime: '12:00', endTime: '13:30' }, 
          { daysOfWeek: [1], startTime: '16:30', endTime: '17:00' }, 
          { daysOfWeek: [5], startTime: '13:00', endTime: '13:30' }, 
          { daysOfWeek: [5], startTime: '15:30', endTime: '17:30' }, 
          { daysOfWeek: [6], startTime: '13:00', endTime: '13:30' }, 
          { daysOfWeek: [6], startTime: '15:30', endTime: '16:00' }, 
          { daysOfWeek: [6], startTime: '17:00', endTime: '18:00' }, 
        ];
      }
    }else 
    if(contador === "0053k00000AvsM4AAJ"){ //Contadora Francis
      if(prioridad === "Mid-High"){
        eventos = [
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [1, 5, 6],
            startTime: '10:00:00',
            endTime: '11:00:00',
            className: 'yellowEvent',
            display: 'background'
          },
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [1, 5, 6],
            startTime: '14:30:00',
            endTime: '15:30:00',
            className: 'yellowEvent',
            display: 'background'
          },
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [1],
            startTime: '15:30:00',
            endTime: '16:30:00',
            className: 'yellowEvent',
            display: 'background'
          },
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [1],
            startTime: '17:00:00',
            endTime: '18:00:00',
            className: 'yellowEvent',
            display: 'background'
          },
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [5, 6],
            startTime: '12:00:00',
            endTime: '13:00:00',
            className: 'yellowEvent',
            display: 'background'
          },
          {
            title: 'Tax Return Level Mid to High Level Return',
            daysOfWeek: [6], 
            startTime: '16:00:00',
            endTime: '17:00:00',
            className: 'yellowEvent',
            display: 'background'
          },
        ];
        businessHrs = [
          { daysOfWeek: [1], startTime: '10:00', endTime: '11:00' }, 
          { daysOfWeek: [1], startTime: '14:30', endTime: '16:30' }, 
          { daysOfWeek: [1], startTime: '17:00', endTime: '18:00' }, 
          { daysOfWeek: [5], startTime: '10:00', endTime: '11:00' }, 
          { daysOfWeek: [5], startTime: '12:00', endTime: '13:00' }, 
          { daysOfWeek: [5], startTime: '14:30', endTime: '15:30' },
          { daysOfWeek: [6], startTime: '10:00', endTime: '11:00' }, 
          { daysOfWeek: [6], startTime: '12:00', endTime: '13:00' }, 
          { daysOfWeek: [6], startTime: '14:30', endTime: '15:30' },
          { daysOfWeek: [6], startTime: '16:00', endTime: '17:00' },
        ];
      }
      if(prioridad === "Clients-Support"){
        eventos = [
          {
            title: 'Client Support',
            daysOfWeek: [4], 
            startTime: '10:00:00',
            endTime: '13:30:00',
            className: 'grisEvent',
            display: 'background'
          },
          {
            title: 'Client Support',
            daysOfWeek: [4], 
            startTime: '14:30:00',
            endTime: '18:00:00',
            className: 'grisEvent',
            display: 'background',
          },
        ];
        businessHrs = [
          { daysOfWeek: [4], startTime: '10:00', endTime: '13:30' }, 
          { daysOfWeek: [4], startTime: '14:30', endTime: '18:00' }, 
        ];
      }
      if(prioridad === "Low-Mid"){
        eventos = [
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [1], 
            startTime: '12:00:00',
            endTime: '13:30:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [1], 
            startTime: '16:30:00',
            endTime: '17:00:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [5, 6], 
            startTime: '11:00:00',
            endTime: '12:00:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [5, 6], 
            startTime: '13:00:00',
            endTime: '13:30:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [5], 
            startTime: '15:30:00',
            endTime: '18:00:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [6], 
            startTime: '15:30:00',
            endTime: '16:00:00',
            className: 'greenEvent',
            display: 'background'
          },
          {
            title: 'Low to Mid Level Return',
            daysOfWeek: [6], 
            startTime: '17:00:00',
            endTime: '18:00:00',
            className: 'greenEvent',
            display: 'background'
          },
        ];
        businessHrs = [
          { daysOfWeek: [1], startTime: '12:00', endTime: '13:30' }, 
          { daysOfWeek: [1], startTime: '16:30', endTime: '17:00' }, 
          { daysOfWeek: [5], startTime: '11:00', endTime: '12:00' }, 
          { daysOfWeek: [5], startTime: '13:00', endTime: '13:30' }, 
          { daysOfWeek: [5], startTime: '15:30', endTime: '18:00' },
          { daysOfWeek: [6], startTime: '11:00', endTime: '12:00' }, 
          { daysOfWeek: [6], startTime: '13:00', endTime: '13:30' }, 
          { daysOfWeek: [6], startTime: '15:30', endTime: '16:00' },
          { daysOfWeek: [6], startTime: '17:00', endTime: '18:00' },
        ];
      }
      if(prioridad === "Monthly-Clients"){
        eventos = [
          {
            title: 'Test',
            start: '1997-04-09T10:00:00',
            end: '1997-04-09T11:00:00',
            display: 'background'
          }
        ];
        businessHrs = [
          { daysOfWeek: [7], startTime: '12:00', endTime: '13:30' }, 
        ];
      }
    }
    
      
    _Lista.calendarEvents(function(eventsSF){
      if(contador === "0053k00000AvrPvAAJ"){ //Contadora Daniela
        //Mostrar eventos de prioridad baja sin los que coincidan con horas virtuales
        var virtualEvents;
        if(prioridad === "Low-Mid"){ 
          var lowEvents = eventsSF.filter(obj => { return obj.color === "#92DB32" && obj.extendedProps.dayHour !== '1-16:30' });
          virtualEvents = eventsSF.filter(obj => { return obj.extendedProps.tipo2 === "Low-Mid_Virtual" });
          filterEvents = lowEvents.concat(virtualEvents);
        }
        //Mostrar eventos Monthly y los que sean virtuales
        if(prioridad === "Monthly-Clients"){ 
          var monthlyEvents = eventsSF.filter(obj => { return obj.color === "#F26252" }); 
          virtualEvents = eventsSF.filter(obj => { return obj.extendedProps.tipo2 === "Monthly-Clients_Virtual" });
          filterEvents = monthlyEvents.concat(virtualEvents);
        }
      }else{
        //Si no es contadora Daniela, mostrar todos los eventos de prioridad baja y monthly
        if(prioridad === "Low-Mid"){ filterEvents = eventsSF.filter(obj => { return obj.color === "#92DB32" }); }
        if(prioridad === "Monthly-Clients"){ filterEvents = eventsSF.filter(obj => { return obj.color === "#F26252" }); }
      }
      
      if(prioridad === "Mid-High"){ filterEvents = eventsSF.filter(obj => { return obj.color === "#F0BA4F" }); }
      if(prioridad === "Clients-Support"){ filterEvents = eventsSF.filter(obj => { return obj.color === "#E9E9E9" }); }
      var results = filterEvents.concat(eventos);
      let calendarEl = document.getElementById('calendar');
      if (calendarEl != null) {
        let calendar = new Calendar(calendarEl, {
          plugins: [ timeGridPlugin, interactionPlugin ],
          select: function(info) {
            var modal = '<div class="flex"> <button onClick="closeModal();" class="btn-close">⨉</button> </div>';
            modal +='    <div style="padding: 20px;">';
            modal +='        <h3 style="text-align: center;">Agregar Evento</h3><br>';
            modal +='        <div class="modalScriptRow">';
            modal +='            <div class="divInputScript"> <label class="labelModal">Descripción:</label><br> <input id="descripcionEvento"> </div>';
            modal +='            <div class="divInputScript"> <label class="labelModal">Fecha:</label><br> <input id="fechaEvento" type="date"> </div>';
            modal +='        </div>';
            modal +='        <div class="modalScriptRow">';
            modal +='            <div class="divInputScript"> <label class="labelModal">Inicio:</label><br> <input id="inicioEvento" type="time"> </div>';
            modal +='            <div class="divInputScript"> <label class="labelModal">Fin:</label><br> <input id="finEvento" type="time"> </div>';
            modal +='        </div>';
            modal +='        <div class="modalScriptRow hidden">';
            modal +='            <div class="divInputScript"> <label class="labelModal">Tipo de Cita:</label><br> <select id="tipoEvento"> <option value="Presencial">Presencial</option> <option value="Virtual">Virtual</option> </select> </div>';
            modal +='        </div>';
            modal +='    </div>';
            document.getElementById("modalChild").innerHTML = modal;
            document.getElementById("enviarEvento").classList.remove("hidden");
            document.getElementById("updateEvento").classList.add("hidden");
            document.getElementById("eventoModal").classList.remove("hidden");
            document.querySelector(".overlay").classList.remove("hidden");

            var tiempo1 = new Date(info.startStr);
            document.getElementById("inicioEvento").value = tiempo1.toTimeString().substring(0,5);
            var tiempo2 = (new Date(tiempo1.getTime()+ 1800000)).toTimeString().substring(0,5);
            document.getElementById("finEvento").value = tiempo2;
            document.getElementById("fechaEvento").valueAsDate = tiempo1;
            //Detectar Horas Virtuales
            var dia = tiempo1.getDay();
            var hora = tiempo1.toTimeString().substring(0,5); //Obtener Dia de la semana y hora seleccionada Inicio
            var contador =document.getElementById("listaContador").value;
            if( (dia === 1 && hora === "16:30" && contador === "0053k00000AvrPvAAJ") || (dia === 4 && contador === "0053k00000AvrPvAAJ") || (dia === 1 && hora === "17:00" && contador === "0053k00000AvrPvAAJ") || (dia === 1 && hora === "17:30" && contador === "0053k00000AvrPvAAJ") ){
              document.getElementById("tipoEvento").value = "Virtual";
            }
          },
          selectable: true,
          initialView: "timeGridWeek",
          scrollTime :  "10:00:00",
          weekends: true,
          allDaySlot: false,
          navLinks: true,
          firstDay: 1,
          hiddenDays: [0],
          businessHours: businessHrs,
          selectConstraint: "businessHours",
          //headerToolbar: { center: 'dayGridMonth,timeGridWeek' },
          events: results,
          eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'short'
          },/*
          eventClick: function(info) {
            var eventObj = info.event;
            var modal = '<div class="flex"> <button onClick="closeModal();" class="btn-close">⨉</button> </div>';
    modal +='    <div style="padding: 20px;">';
    modal +='        <h3 id="tituloEvento" style="text-align: center;"></h3><br>';
    modal +='        <div class="modalScriptRow">';
    modal +='            <input id="idEvento" class="hidden">';
    modal +='            <div class="divInputScript"> <label class="labelModal">Descripción:</label><br> <input id="descripcionEvento"> </div>';
    modal +='            <div class="divInputScript"> <label class="labelModal">Fecha:</label><br> <input id="fechaEvento" type="date" disabled> </div>';
    modal +='        </div>';
    modal +='        <div class="modalScriptRow">';
    modal +='            <div class="divInputScript"> <label class="labelModal">Inicio:</label><br> <input id="inicioEvento" type="time" disabled> </div>';
    modal +='            <div class="divInputScript"> <label class="labelModal">Fin:</label><br> <input id="finEvento" type="time" disabled> </div>';
    modal +='        </div>';
    modal +='        <div class="modalScriptRow" class="hidden">';
    modal +='            <div class="divInputScript"> <label class="labelModal">Tipo de Cita:</label><br> <select id="tipoEvento" disabled> <option value="Presencial">Presencial</option> <option value="Virtual">Virtual</option> </select> </div>';
    modal +='        </div>';
    modal +='    </div>';
            document.getElementById("modalChild").innerHTML = modal;

            document.getElementById("tituloEvento").innerHTML = info.event.title;
            document.getElementById("idEvento").value = info.event.id;
            document.getElementById("descripcionEvento").value = info.event.extendedProps.descripcion;
            document.getElementById("fechaEvento").valueAsDate = info.event.start;
            document.getElementById("inicioEvento").value = (info.event.start).toTimeString().substring(0,5);
            document.getElementById("finEvento").value = (info.event.end).toTimeString().substring(0,5);
            document.getElementById("tipoEvento").value = info.event.extendedProps.tipo;
            document.getElementById("enviarEvento").classList.add("hidden");
            document.getElementById("updateEvento").classList.remove("hidden");
            document.getElementById("eventoModal").classList.remove("hidden");
            document.querySelector(".overlay").classList.remove("hidden");
          },*/
        });
        calendar.render();
      }
    });
  
}


//index
function estadoCivilRecap(){
  if(document.getElementById("estadoCivilRecap").value === "Casado"){
    document.getElementById("casadoRecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("casadoRecapDiv").classList.add("hidden");
  }
}
function ingresosEsposoRecap(){
  if(document.getElementById("ingresosEsposoRecap").value === "Si"){
    document.getElementById("notaIngresoRecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("notaIngresoRecapDiv").classList.add("hidden");
  }
}
function agregarRecap(){
  if(document.getElementById("agregarDependientesRecap").value === "Si"){
    document.getElementById("agregarRecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("agregarRecapDiv").classList.add("hidden");
  }
}
function retirarRecap(){
  if(document.getElementById("retirarDependienteRecap").value && document.getElementById("retirarDependienteRecap").value !== "No"){
    document.getElementById("retirarRecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("retirarRecapDiv").classList.add("hidden");
  }
}
function dineroRecap(){
  if(document.getElementById("dependienteTrabajaDependienteRecap").value === "Si"){
    document.getElementById("cantidadDineroRecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("cantidadDineroRecapDiv").classList.add("hidden");
  }
}
function cuantasW2Recap(){
  if(document.getElementById("formasW2Recap").value === "Si"){
    document.getElementById("cuantasW2RecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("cuantasW2RecapDiv").classList.add("hidden");
  }
}
function forma1099Recap(){
  if(document.getElementById("declaraIngresosRecap").value === "1099"){
    document.getElementById("1099BancoRecapDiv").classList.remove("hidden");
  }else{
    document.getElementById("1099BancoRecapDiv").classList.add("hidden");
  }
}


export { nextScript, previousScript, csList, accountList, accountUserList, contactList, keywordList, newCase, calendario, accounts, contacts, accountsRecap, contactsRecap, keywords, keywordsRecap };