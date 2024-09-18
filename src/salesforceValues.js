import conexionSF from './connection';
var functions = require("./functions");

function accountsUser(success){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Owner_User__c FROM Account GROUP BY Owner_User__c").then(async (result) => {
            var accounts = [];
            var accountArray;
            for(var k = 0; k < result.totalSize; k++){
                if(result.records[k].Owner_User__c){
                    const con = await conn.sobject('User').retrieve(result.records[k].Owner_User__c);
                    var userName = con.Name;
                    accountArray = {id:result.records[k].Owner_User__c, nombre: userName};
                    accounts.push(accountArray);
                }
            }
            success(accounts);
        });
    });
}

function customerService(success){
    var conn = new conexionSF();
    var url = new URL(window.location.href);
    var urlId = url.searchParams.get("Id");
    if(urlId){
        conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
            conn.query("SELECT X6_En_que_a_os_le_vamos_a_apoyar__c, Account__c, Account_2__c, CallType__c, Keywords_Cases__c, City__c, Communication_channel__c, Contact__c, Contact_2__c, Country__c, CreatedById, CreatedDate, Cual_es_tu_parentesco_con_el_titular_de__c, Cual_fue_el_ultimo_ano_que_le_ayudamos_c__c, Tipo_de_Llamada__c, Call_Type__c, Hola_buen_dia_se_comunica_a_Francis_Tax__c, Name, Online_Script__c, OwnerId, Parentezco_del_cliente__c, ParentezcoDelCliente__c, PostalCode__c, Priority__c, Que_ano_le_ayudamos_con_impuestos__c, Id, Fast_Note__c, State__c, Street__c, Tipo_de_Agencia__c, Tipo_de_Parentezco__c, TipoCliente__c, TipoHumor_Cliente__c, Type__c, UltimoAnioDeAyuda__c, User__c, Users__c FROM Customer_Service__c WHERE Contact__c='"+urlId+"' ").then((result) => {
                var customer = [];
                var lista;
                for(var k = 0; k < result.totalSize; k++){
                    var cs =result.records[k];
                    lista = {
                        apoyo: cs.X6_En_que_a_os_le_vamos_a_apoyar__c, 
                        account: cs.Account__c,
                        account2: cs.Account_2__c,
                        callType: cs.CallType__c,
                        casesTypeSearch: cs.Keywords_Cases__c,
                        city: cs.City__c,
                        communicationChannel: cs.Communication_channel__c,
                        contact: cs.Contact__c,
                        contact2: cs.Contact_2__c,
                        country: cs.Country__c,
                        createdById: cs.CreatedById,
                        createdDate: cs.CreatedDate,
                        parentezcoTitular: cs.Cual_es_tu_parentesco_con_el_titular_de__c,
                        ultimoApoyo: cs.Cual_fue_el_ultimo_ano_que_le_ayudamos_c__c,
                        dequienLlamada: cs.Tipo_de_Llamada__c,
                        dequienLlamada2: cs.Call_Type__c,
                        buendiaFrancisTax: cs.Hola_buen_dia_se_comunica_a_Francis_Tax__c,
                        idCall: cs.Name,
                        onlineScript: cs.Online_Script__c,
                        ownerId: cs.OwnerId,
                        parentezcoCliente: cs.Parentezco_del_cliente__c,
                        parentezcoCliente2: cs.ParentezcoDelCliente__c,
                        postalCode: cs.PostalCode__c,
                        priority: cs.Priority__c,
                        anioImpuestos: cs.Que_ano_le_ayudamos_con_impuestos__c,
                        recordId: cs.Id,
                        solicitudCliente: cs.Fast_Note__c,
                        state: cs.State__c,
                        street: cs.Street__c,
                        tipoAgencia: cs.Tipo_de_Agencia__c,
                        tipoParentezco: cs.Tipo_de_Parentezco__c,
                        tipoCliente: cs.TipoCliente__c,
                        tipoHumor: cs.TipoHumor_Cliente__c,
                        type: cs.Type__c,
                        ultimaAyuda: cs.UltimoAnioDeAyuda__c,
                        user: cs.User__c,
                        users: cs.Users__c
                    };
                    customer.push(lista);
                }
                success(customer);
            });
        });
    }
}

function scriptCase(idCService, accountId, contactId){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Usted_trabaja_para_una_compa_a_donde_t__c, X1_En_apoyo_a_su_servicio_de_declaraci__c, X10_Compro_casa__c, X11_Ya_tiene_todos_los_documentos__c, X12_Ya_tiene_sus_formas_w2__c, X12_Ya_tiene_sus_formas_w2new__c, X12_1_Ademas_de_sus_formas_W2multi__c, X12_1_Ademas_de_sus_formas_W2_usted_o_su__c, X12_2_Para_una_compania__c, X12_3_Cuantas_W_2_tiene__c, X12_4_En_caso_de_tener_esposa_aplica_la__c, X12_5_Cuantas_1099_tiene_o_el_reporte_de__c, X12_6_O_tomara_nuestro_servicio_de_repor__c, X12_7_Recibio_Desempleo__c, X12_8_Tiene_algun_otro_tipo_de_ingreso__c, X12_9_Anotar_otro_tipo_de_formas_de_ingr__c, X13_Cuantas_formas_recibio_o_recibieron__c, X14_Si_menciona_cash_o_Deposito_Directo__c, X15_Tomara_nuestro_servicio_de_reporte_d__c, X16_Usted_cree_que_recibio_mas_ingresos__c, X17_Tiene_algun_otro_tipo_de_ingreso_o_f__c, X18_Cantidad_de_Formas_que_desea_agrega__c, X19_Tiene_algun_tipo_de_ingreso_por_jueg__c, X2_Cu_l_ser_a_el_mejor_horario_para_comu__c, X20_Cantidad_de_formas_que_desea_agregar__c, X21_Cambio_de_seguro_social__c, X21_1_Ya_envio_documentos__c, X22_Quiere_realizar_alguna_actualizacion__c, X23_Pago_cuidado_infantil_para_alguno_de__c, X24_Alguno_de_sus_dependientes_esta_en_l__c, X24_1_Cuantas__c, X24_2_Nombre_de_dependes__c, X25_Gasto_en_utiles_escolares_de_alguno__c, X26_Como_enviara_esta_informacion_a_tra__c, X26_1_Cantidad__c, X27_Se_necesitara_el_monto_por_cada_depe__c, X28_Ademas_de_sus_formas_W2_usted_o_su_p__c, X28_Alguno_de_sus_dependientes_tuvo_gast__c, X29_De_ser_asi_se_solicita_el_nombre_de__c, X3_Quiere_realizar_alguna_actualizaci_n__c, Hay_ingresos_que_su_esposo_a_reportara__c, X3_2_1_Nota_que_quiere_compartir_sobre_i__c, X30_Enviara_algun_documento_para_realiza__c, X31_Notas_Entrevistador__c, X4_Cambio_sus_nombres_legalmente_en_el_a__c, X4_1_Va_a_agregar_o_retirar_algun_depen__c, X5_Hasta_el_ultimo_dia_del_ano_2022_uste__c, X5_0_Estado_Civil__c, X6_Tiene_su_certificado_de_matrimonio__c, X7_Tiene_dependes_que_declara_en_sus_imp__c, X7_Tiene_dependes_que_declara_en_sus_new__c, X8_Va_a_agregar_dependes__c, X8_1_Si_desea_agregar_un_depende__c, X8_2_Menciono_que_tiene_un_depend_month__c, X8_2_Menciono_que_tuvo_un_dependiente_qu__c, X8_3_Alguno_de_sus_dependientes_trabaja__c, X8_4_Preguntarias_Nombre__c, X8_5_Cantidad_de_dinero__c, X8_6_Va_a_retirar_algun_dependiente_o_al__c, X8_6_Va_a_retirar_algun_dependiente_new__c, X8_7_Menciono_que_retira_un_dependiente__c, X8_7_Nombre_Completo_Depende_a_Retirar__c, X9_Va_a_asistir_con_alguien_mas_que_nece__c, Account__c, Cantidad_de_Formas_que_desea_agregar__c, Category__c, Contact__c, CreatedDate, Customer_Support__c, Name, Keywords_Cases__c, Necesita_que_hagamos_sus_CRP_para_sus_in__c, Nombres_Dependes__c, Nombres_Dependes_Retirar__c, Notas1__c, Notas2__c, Notas3__c, Notas4__c, Notas5__c, Notas6__c, Para_el_ano_20xx_abrio_su_propia_compa__c, recibe_su_pago_en_efectivo_o_cheques_per__c, Id, Total_retirar_dependes__c, Usted_tiene_casa_por_renta_como_un_ingre__c, Va_a_declarar_dependes__c, Ya_tiene_su_lista_de_gastos_e_ingresos_r__c, Ya_tiene_todos_los_documentos_de_ingreso__c, Ya_tiene_todos_los_documentos__c FROM Script_Case__c WHERE Customer_Support__c='"+idCService+"' and Account__c='"+accountId+"' and Contact__c='"+contactId+"' LIMIT 1").then((result) => {
            for(var k = 0; k < result.totalSize; k++){
                var prob = result.records[k];
                document.getElementById("scriptCaseId").value = prob.Id;
                document.getElementById("notasHomeProbe").innerHTML = prob.Notas1__c;
                if(prob.X4_Cambio_sus_nombres_legalmente_en_el_a__c && prob.X4_Cambio_sus_nombres_legalmente_en_el_a__c === "Si"){ document.getElementById("nombreTaxInfoProbeSi").checked = true; }else{ document.getElementById("nombreTaxInfoProbeSi").checked = false; }
                if(prob.X4_Cambio_sus_nombres_legalmente_en_el_a__c && prob.X4_Cambio_sus_nombres_legalmente_en_el_a__c === "No"){ document.getElementById("nombreTaxInfoProbeNo").checked = true; }else{ document.getElementById("nombreTaxInfoProbeNo").checked = false; }
                
                if(prob.X21_Cambio_de_seguro_social__c && prob.X21_Cambio_de_seguro_social__c === "Si"){ document.getElementById("seguroTaxInfoProbeSi").checked = true; }else{ document.getElementById("seguroTaxInfoProbeSi").checked = false; }
                if(prob.X21_Cambio_de_seguro_social__c && prob.X21_Cambio_de_seguro_social__c === "No"){ document.getElementById('seguroTaxInfoProbeNo').checked = true; }else{ document.getElementById('seguroTaxInfoProbeNo').checked = false; }
                document.getElementById("notasTaxInfoProbe").innerHTML = prob.Notas2__c;
                
                if(prob.X5_0_Estado_Civil__c && prob.X5_0_Estado_Civil__c === "Jefe de familia"){ document.getElementById("estadocivilFilingProbeJefe").checked = true; }else{ document.getElementById("estadocivilFilingProbeJefe").checked = false; }
                if(prob.X5_0_Estado_Civil__c && prob.X5_0_Estado_Civil__c === "Casado"){ document.getElementById("estadocivilFilingProbeCasado").checked = true; }else{ document.getElementById("estadocivilFilingProbeCasado").checked = false; }
                if(prob.X5_0_Estado_Civil__c && prob.X5_0_Estado_Civil__c === "Soltero"){ document.getElementById("estadocivilFilingProbeSoltero").checked = true; }else{ document.getElementById("estadocivilFilingProbeSoltero").checked = false; }
                if(prob.X5_0_Estado_Civil__c && prob.X5_0_Estado_Civil__c === "Viudo"){ document.getElementById("estadocivilFilingProbeViudo").checked = true; }else{ document.getElementById("estadocivilFilingProbeViudo").checked = false; }

                if(prob.X6_Tiene_su_certificado_de_matrimonio__c && prob.X6_Tiene_su_certificado_de_matrimonio__c === "Si"){ document.getElementById("certificadoFilingProbeSi").checked = true; }else{ document.getElementById("certificadoFilingProbeSi").checked = false; }
                if(prob.X6_Tiene_su_certificado_de_matrimonio__c && prob.X6_Tiene_su_certificado_de_matrimonio__c === "No"){ document.getElementById("certificadoFilingProbeNo").checked = true; }else{ document.getElementById("certificadoFilingProbeNo").checked = false; }

                if(prob.Hay_ingresos_que_su_esposo_a_reportara__c && prob.Hay_ingresos_que_su_esposo_a_reportara__c === "Si"){ document.getElementById("ingresosFilingProbeSi").checked = true; }else{ document.getElementById("ingresosFilingProbeSi").checked = false; }
                if(prob.Hay_ingresos_que_su_esposo_a_reportara__c && prob.Hay_ingresos_que_su_esposo_a_reportara__c === "No"){ document.getElementById("ingresosFilingProbeNo").checked = true; }else{ document.getElementById("ingresosFilingProbeNo").checked = false; }
                document.getElementById("notaIngresoEsposo").innerHTML = prob.X3_2_1_Nota_que_quiere_compartir_sobre_i__c;
                document.getElementById("notasFilingProbe").innerHTML = prob.Notas3__c;

                if(prob.Va_a_declarar_dependes__c && prob.Va_a_declarar_dependes__c === "Si"){ document.getElementById("dependienteDependentsProbeSi").checked = true; }else{ document.getElementById("dependienteDependentsProbeSi").checked = false; }
                if(prob.Va_a_declarar_dependes__c && prob.Va_a_declarar_dependes__c === "No"){ document.getElementById("dependienteDependentsProbeNo").checked = true; }else{ document.getElementById("dependienteDependentsProbeNo").checked = false; }

                if(prob.X4_1_Va_a_agregar_o_retirar_algun_depen__c && prob.X4_1_Va_a_agregar_o_retirar_algun_depen__c === "Agregar"){ document.getElementById("changeDependentProbeAgregar").checked = true; }else{ document.getElementById("changeDependentProbeAgregar").checked = false; }
                if(prob.X4_1_Va_a_agregar_o_retirar_algun_depen__c && prob.X4_1_Va_a_agregar_o_retirar_algun_depen__c === "Retirar"){ document.getElementById("changeDependentProbeRetirar").checked = true; }else{ document.getElementById("changeDependentProbeRetirar").checked = false; }

                document.getElementById("agregarChangeProbe").value = prob.X8_Va_a_agregar_dependes__c;
                document.getElementById("nombresAgregarChangeProbe").innerHTML = prob.Nombres_Dependes__c;
                document.getElementById("retirarChangeProbe").value = prob.Total_retirar_dependes__c;
                document.getElementById("nombresRetirarChangeProbe").innerHTML = prob.Nombres_Dependes_Retirar__c;

                if(prob.X8_7_Menciono_que_retira_un_dependiente__c && prob.X8_7_Menciono_que_retira_un_dependiente__c === "Ya es mayor de edad y trabaja"){ document.getElementById("motivoRetirarProbeEdad").checked = true; }else{ document.getElementById("motivoRetirarProbeEdad").checked = false; }
                if(prob.X8_7_Menciono_que_retira_un_dependiente__c && prob.X8_7_Menciono_que_retira_un_dependiente__c === "Va a declarar por si solo"){ document.getElementById("motivoRetirarProbeSolo").checked = true; }else{ document.getElementById("motivoRetirarProbeSolo").checked = false; }
                if(prob.X8_7_Menciono_que_retira_un_dependiente__c && prob.X8_7_Menciono_que_retira_un_dependiente__c === "Ya no vive con el"){ document.getElementById("motivoRetirarProbeVive").checked = true; }else{ document.getElementById("motivoRetirarProbeVive").checked = false; }
                if(prob.X8_7_Menciono_que_retira_un_dependiente__c && prob.X8_7_Menciono_que_retira_un_dependiente__c === "Fallecio"){ document.getElementById("motivoRetirarProbeFallecio").checked = true; }else{ document.getElementById("motivoRetirarProbeFallecio").checked = false; }

                if(prob.X8_3_Alguno_de_sus_dependientes_trabaja__c && prob.X8_3_Alguno_de_sus_dependientes_trabaja__c === "Si"){ document.getElementById("trabajaIncomeDependentProbeSi").checked = true; }else{ document.getElementById("trabajaIncomeDependentProbeSi").checked = false; }
                if(prob.X8_3_Alguno_de_sus_dependientes_trabaja__c && prob.X8_3_Alguno_de_sus_dependientes_trabaja__c === "No"){ document.getElementById("trabajaIncomeDependentProbeNo").checked = true; }else{ document.getElementById("trabajaIncomeDependentProbeNo").checked = false; }

                document.getElementById("cantidadIncomeDependentProbe").value = prob.X8_5_Cantidad_de_dinero__c;

                if(prob.X9_Va_a_asistir_con_alguien_mas_que_nece__c && prob.X9_Va_a_asistir_con_alguien_mas_que_nece__c === "Si"){ document.getElementById("asistirIncomeDependentProbeSi").checked = true; }else{ document.getElementById("asistirIncomeDependentProbeSi").checked = false; }
                if(prob.X9_Va_a_asistir_con_alguien_mas_que_nece__c && prob.X9_Va_a_asistir_con_alguien_mas_que_nece__c === "No"){ document.getElementById("asistirIncomeDependentProbeNo").checked = true; }else{ document.getElementById("asistirIncomeDependentProbeNo").checked = false; }

                if(prob.X28_Alguno_de_sus_dependientes_tuvo_gast__c && prob.X28_Alguno_de_sus_dependientes_tuvo_gast__c === "Si"){ document.getElementById("extraDeductionDependentProbeSi").checked = true; }else{ document.getElementById("extraDeductionDependentProbeSi").checked = false; }
                if(prob.X28_Alguno_de_sus_dependientes_tuvo_gast__c && prob.X28_Alguno_de_sus_dependientes_tuvo_gast__c === "No"){ document.getElementById("extraDeductionDependentProbeNo").checked = true; }else{ document.getElementById("extraDeductionDependentProbeNo").checked = false; }

                document.getElementById("notasDependentsProbe").innerHTML = prob.Notas4__c;

                if(prob.Usted_trabaja_para_una_compa_a_donde_t__c && prob.Usted_trabaja_para_una_compa_a_donde_t__c === "Si"){ document.getElementById("retencionIncomeProbeSi").checked = true; }else{ document.getElementById("retencionIncomeProbeSi").checked = false; }
                if(prob.Usted_trabaja_para_una_compa_a_donde_t__c && prob.Usted_trabaja_para_una_compa_a_donde_t__c === "No"){ document.getElementById("retencionIncomeProbeNo").checked = true; }else{ document.getElementById("retencionIncomeProbeNo").checked = false; }

                if(prob.X12_Ya_tiene_sus_formas_w2new__c && prob.X12_Ya_tiene_sus_formas_w2new__c === "Si"){ document.getElementById("normasIncomeProbeSi").checked = true; }else{ document.getElementById("normasIncomeProbeSi").checked = false; }
                if(prob.X12_Ya_tiene_sus_formas_w2new__c && prob.X12_Ya_tiene_sus_formas_w2new__c === "No"){ document.getElementById("normasIncomeProbeNo").checked = true; }else{ document.getElementById("normasIncomeProbeNo").checked = false; }
                if(prob.X12_Ya_tiene_sus_formas_w2new__c && prob.X12_Ya_tiene_sus_formas_w2new__c === "No Aplica"){ document.getElementById("normasIncomeProbeNoAplica").checked = true; }else{ document.getElementById("normasIncomeProbeNoAplica").checked = false; }

                document.getElementById("cuantasW2IncomeProbe").value = prob.X12_3_Cuantas_W_2_tiene__c;

                if(prob.recibe_su_pago_en_efectivo_o_cheques_per__c && prob.recibe_su_pago_en_efectivo_o_cheques_per__c === "Compañia"){ document.getElementById("pagoIncomeProbeCompania").checked = true; }else{ document.getElementById("pagoIncomeProbeCompania").checked = false; }
                if(prob.recibe_su_pago_en_efectivo_o_cheques_per__c && prob.recibe_su_pago_en_efectivo_o_cheques_per__c === "En cash o sin descuentos"){ document.getElementById("pagoIncomeProbeEfectivo").checked = true; }else{ document.getElementById("pagoIncomeProbeEfectivo").checked = false; }
                
                if(prob.Para_el_ano_20xx_abrio_su_propia_compa__c && prob.Para_el_ano_20xx_abrio_su_propia_compa__c === "1099"){ document.getElementById("declaraIncomeProbe1099").checked = true; }else{ document.getElementById("declaraIncomeProbe1099").checked = false; }
                if(prob.Para_el_ano_20xx_abrio_su_propia_compa__c && prob.Para_el_ano_20xx_abrio_su_propia_compa__c === "Compañia"){ document.getElementById("declaraIncomeProbeCompania").checked = true; }else{ document.getElementById("declaraIncomeProbeCompania").checked = false; }
                if(prob.Para_el_ano_20xx_abrio_su_propia_compa__c && prob.Para_el_ano_20xx_abrio_su_propia_compa__c === "Efectivo"){ document.getElementById("declaraIncomeProbeEfectivo").checked = true; }else{ document.getElementById("declaraIncomeProbeEfectivo").checked = false; }
                if(prob.Para_el_ano_20xx_abrio_su_propia_compa__c && prob.Para_el_ano_20xx_abrio_su_propia_compa__c === "Solo W2"){ document.getElementById("declaraIncomeProbeW2").checked = true; }else{ document.getElementById("declaraIncomeProbeW2").checked = false; }
                if(prob.Para_el_ano_20xx_abrio_su_propia_compa__c && prob.Para_el_ano_20xx_abrio_su_propia_compa__c === "Otro tipo de ingreso"){ document.getElementById("declaraIncomeProbeOtro").checked = true; }else{ document.getElementById("declaraIncomeProbeOtro").checked = false; }

                document.getElementById("cuantas1099IncomeProbe").value = prob.X12_5_Cuantas_1099_tiene_o_el_reporte_de__c;
                document.getElementById("detalleIncomeProbe").value = prob.Ya_tiene_todos_los_documentos__c;

                if(prob.Usted_tiene_casa_por_renta_como_un_ingre__c && prob.Usted_tiene_casa_por_renta_como_un_ingre__c === "Si"){ document.getElementById("casaIncomeProbeSi").checked = true; }else{ document.getElementById("casaIncomeProbeSi").checked = false; }
                if(prob.Usted_tiene_casa_por_renta_como_un_ingre__c && prob.Usted_tiene_casa_por_renta_como_un_ingre__c === "No"){ document.getElementById("casaIncomeProbeNo").checked = true; }else{ document.getElementById("casaIncomeProbeNo").checked = false; }

                if(prob.Necesita_que_hagamos_sus_CRP_para_sus_in__c && prob.Necesita_que_hagamos_sus_CRP_para_sus_in__c === "Si"){ document.getElementById("crpIncomeProbeSi").checked = true; }else{ document.getElementById("crpIncomeProbeSi").checked = false;}
                if(prob.Necesita_que_hagamos_sus_CRP_para_sus_in__c && prob.Necesita_que_hagamos_sus_CRP_para_sus_in__c === "No"){ document.getElementById("crpIncomeProbeNo").checked = true; }else{ document.getElementById("crpIncomeProbeNo").checked = false; }

                document.getElementById("listaIncomeProbe").value = prob.Ya_tiene_su_lista_de_gastos_e_ingresos_r__c;
                document.getElementById("notasIncomeProbe").innerHTML = prob.Notas5__c;

                if(prob.X30_Enviara_algun_documento_para_realiza__c && prob.X30_Enviara_algun_documento_para_realiza__c === "Si"){ document.getElementById("crpProbeSi").checked = true; }else{ document.getElementById("crpProbeSi").checked = false; }
                if(prob.X30_Enviara_algun_documento_para_realiza__c && prob.X30_Enviara_algun_documento_para_realiza__c === "No"){ document.getElementById("crpProbeNo").checked = true; }else{ document.getElementById("crpProbeNo").checked = false; }

                document.getElementById("notasCRPProbe").innerHTML = prob.Notas6__c;

                document.getElementById("notesHome").innerHTML = prob.Notas1__c;
                document.getElementById("notesTaxpayer").innerHTML = prob.Notas2__c;
                document.getElementById("notesFiling").innerHTML = prob.Notas3__c;
                document.getElementById("notesDependents").innerHTML = prob.Notas4__c;
                document.getElementById("notesIncome").innerHTML = prob.Notas5__c;
                document.getElementById("notesCRP").innerHTML = prob.Notas6__c;

            }
        });
    });
}

function keywords(success){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Id, Name, Case_Resolution__c FROM Keywords_Cases__c ORDER BY Name").then((result) => {
            var keywords = [];
            var keyArray;
            for(var k = 0; k < result.totalSize; k++){
                keyArray = {id: result.records[k].Id, nombre: result.records[k].Name, caseResolution: result.records[k].Case_Resolution__c};
                keywords.push(keyArray);
            }
            success(keywords);
        });
    });
}
function verRecap(id){
    var cs = document.getElementById("csList").value;
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Id, Hola_buen_dia_se_comunica_a_Francis_Tax__c, Account_2__c, Tipo_de_Llamada__c, Contact_2__c, Cual_fue_el_ultimo_ano_que_le_ayudamos_c__c, Tipo_de_Parentezco__c, Que_ano_le_ayudamos_con_impuestos__c, Tipo_de_Agencia__c, Fast_Note__c FROM Customer_Service__c WHERE Id='"+id+"'").then(async (result) => {
            for(var k = 0; k < result.totalSize; k++){
                //Recap Textos
                if(!result.records[k].Hola_buen_dia_se_comunica_a_Francis_Ta__c){
                    document.getElementById("recapDiv1").style.display = "none";
                    document.getElementById("recapGreet1").style.display = "none";
                }else{
                    document.getElementById("recapDiv1").style.display = "block";
                    document.getElementById("recapGreet1").style.display = "block";
                    document.getElementById("textRecap1").innerHTML = result.records[k].Hola_buen_dia_se_comunica_a_Francis_Tax__c;
                    document.getElementById("textGreet1").innerHTML = result.records[k].Hola_buen_dia_se_comunica_a_Francis_Tax__c;
                }
                if(result.records[k].Tipo_de_Parentezco__c){
                    document.getElementById("textRecap2").innerHTML = result.records[k].Tipo_de_Parentezco__c;
                    document.getElementById("recapDiv2").style.display = "block";
                }else{
                    document.getElementById("recapDiv2").style.display = "none";
                }
                document.getElementById("textRecap11").innerHTML = result.records[k].Hola_buen_dia_se_comunica_a_Francis_Tax__c;
                document.getElementById("textRecap12").innerHTML = result.records[k].Hola_buen_dia_se_comunica_a_Francis_Tax__c;
                document.getElementById("textRecap13").innerHTML = result.records[k].Hola_buen_dia_se_comunica_a_Francis_Tax__c;
                document.getElementById("textGreet2").innerHTML = result.records[k].Tipo_de_Parentezco__c;
                if(!result.records[k].Account_2__c){
                    document.getElementById("recapGreet3").style.display = "none";
                }else{
                    const acc = await conn.sobject('Account').retrieve(result.records[k].Account_2__c);
                    document.getElementById("textGreet3").innerHTML = acc.Name;
                    document.getElementById("recapGreet3").style.display = "block";
                }
                if(!result.records[k].Contact_2__c){
                    document.getElementById("recapGreet4").style.display = "none";
                }else{
                    const cont = await conn.sobject('Contact').retrieve(result.records[k].Contact_2__c);
                    document.getElementById("textGreet4").innerHTML = cont.Name;
                    document.getElementById("recapGreet4").style.display = "block";
                }
                if(!result.records[k].Cual_fue_el_ultimo_ano_que_le_ayudamos_c__c){
                    document.getElementById("recapGreet5").style.display = "none";
                }else{
                    document.getElementById("recapGreet5").style.display = "block";
                    document.getElementById("textGreet5").innerHTML = result.records[k].Cual_fue_el_ultimo_ano_que_le_ayudamos_c__c;
                }
                document.getElementById("textGreet6").innerHTML = result.records[k].Que_ano_le_ayudamos_con_impuestos__c;
                if(!result.records[k].Tipo_de_Agencia__c){
                    document.getElementById("recapGreet7").style.display = "none";
                }else{
                    document.getElementById("recapGreet7").style.display = "block";
                    document.getElementById("textGreet7").innerHTML = result.records[k].Tipo_de_Agencia__c;
                }

                document.getElementById("nombreClienteRecap").value = result.records[k].Hola_buen_dia_se_comunica_a_Francis_Tax__c;
                document.getElementById("quienLlamadaRecap").value = result.records[k].Tipo_de_Llamada__c

                if( (result.records[k].Tipo_de_Parentezco__c) === "Amigo;Esposo;Familiar;Hijos;Padres;Otro"  ){ document.getElementById("parentezcoTitularRecapAll").checked = true; }
                if( (result.records[k].Tipo_de_Parentezco__c).includes("Amigo")  ){ document.getElementById("parentezcoTitularRecapAmigo").checked = true; }
                if( (result.records[k].Tipo_de_Parentezco__c).includes("Esposo")  ){ document.getElementById("parentezcoTitularRecapEsposo").checked = true; }
                if( (result.records[k].Tipo_de_Parentezco__c).includes("Familiar")  ){ document.getElementById("parentezcoTitularRecapFamiliar").checked = true; }
                if( (result.records[k].Tipo_de_Parentezco__c).includes("Hijos")  ){ document.getElementById("parentezcoTitularRecapHijos").checked = true; }
                if( (result.records[k].Tipo_de_Parentezco__c).includes("Padres")  ){ document.getElementById("parentezcoTitularRecapPadres").checked = true; }
                if( (result.records[k].Tipo_de_Parentezco__c).includes("Otro")  ){ document.getElementById("parentezcoTitularRecapOtro").checked = true; }
                
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c) === "2024;2023;2022;2021;2020;2019;2018;2017;2016;2025;2026;2027"  ){ document.getElementById("asistidoRecapAll").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2027")  ){ document.getElementById("asistidoRecap2027").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2026")  ){ document.getElementById("asistidoRecap2026").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2025")  ){ document.getElementById("asistidoRecap2025").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2024")  ){ document.getElementById("asistidoRecap2024").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2023")  ){ document.getElementById("asistidoRecap2023").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2022")  ){ document.getElementById("asistidoRecap2022").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2021")  ){ document.getElementById("asistidoRecap2021").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2020")  ){ document.getElementById("asistidoRecap2020").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2019")  ){ document.getElementById("asistidoRecap2019").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2018")  ){ document.getElementById("asistidoRecap2018").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2017")  ){ document.getElementById("asistidoRecap2017").checked = true; }
                if( (result.records[k].Que_ano_le_ayudamos_con_impuestos__c).includes("2016")  ){ document.getElementById("asistidoRecap2016").checked = true; }

                if( (result.records[k].Tipo_de_Agencia__c) === "Abogado;Agencia de gobierno;Agente de bienes y raices;Contador;Empleadores"  ){ document.getElementById("tipoAgenciaRecapAll").checked = true; }
                if( (result.records[k].Tipo_de_Agencia__c).includes("Abogado")  ){ document.getElementById("tipoAgenciaRecapAbogado").checked = true; }
                if( (result.records[k].Tipo_de_Agencia__c).includes("Agencia de gobierno")  ){ document.getElementById("tipoAgenciaRecapGobierno").checked = true; }
                if( (result.records[k].Tipo_de_Agencia__c).includes("Agente de bienes y raices")  ){ document.getElementById("tipoAgenciaRecapAgente").checked = true; }
                if( (result.records[k].Tipo_de_Agencia__c).includes("Contador")  ){ document.getElementById("tipoAgenciaRecapContador").checked = true; }
                if( (result.records[k].Tipo_de_Agencia__c).includes("Empleadores")  ){ document.getElementById("tipoAgenciaRecapEmpleadores").checked = true; }
                
                document.getElementById("solicitudRecap").value = result.records[k].Fast_Note__c;
            }
        });

        conn.query("SELECT StartTime__c FROM Calendar__c WHERE CustomerService__c='"+cs+"' ORDER BY CreatedDate DESC LIMIT 1", function(err, resultado) {
            for(var j = 0; j < resultado.totalSize; j++){
                document.getElementById("textRecap3").innerHTML = new Date(resultado.records[j].StartTime__c).toLocaleString();
                document.getElementById("textGreet8").innerHTML = new Date(resultado.records[j].StartTime__c).toLocaleString();
            }
        });
    });
}

function recapUpdate(){
    var checkParentezco = ""; var count = 0;
    var parentezcoTitularGreet = document.getElementsByName('parentezcoTitularRecap[]');
    var total = document.querySelectorAll("input[name='parentezcoTitularRecap[]']:checked").length;
    if(total === 7){total = total - 1;}
    for (var i=0; i<parentezcoTitularGreet.length; i++) { if(parentezcoTitularGreet[i].checked && parentezcoTitularGreet[i].value !== "All") { count++; if(count === total){ checkParentezco += parentezcoTitularGreet[i].value; }else{ checkParentezco += parentezcoTitularGreet[i].value+';'; } } }

    var checktipoAgencia = ""; var count2 = 0;
    var tipoAgenciaGreet = document.getElementsByName('tipoAgenciaRecap[]');
    var total2 = document.querySelectorAll("input[name='tipoAgenciaRecap[]']:checked").length;
    if(total2 === 6){ total2 = total2 - 1; }
    for (var j=0; j<tipoAgenciaGreet.length; j++) { if(tipoAgenciaGreet[j].checked && tipoAgenciaGreet[j].value !== "All") { count2++; if(count2 === total2){ checktipoAgencia += tipoAgenciaGreet[j].value; }else{ checktipoAgencia += tipoAgenciaGreet[j].value+';'; } } }

    var checkAsistidoImpuestos = ""; var count3 = 0;
    var asistidoImpuestos = document.getElementsByName('asistidoRecap[]');
    var total3 = document.querySelectorAll("input[name='asistidoRecap[]']:checked").length;
    if(total3 === 13){ total3 = total3 - 1; }
    for (var a=0; a<asistidoImpuestos.length; a++) { if(asistidoImpuestos[a].checked && asistidoImpuestos[a].value !== "All") { count3++; if(count3 === total3){ checkAsistidoImpuestos += asistidoImpuestos[a].value; }else{ checkAsistidoImpuestos += asistidoImpuestos[a].value + ';'; } } }

    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Customer_Service__c").update({
            Id: document.getElementById("csList").value,
            Hola_buen_dia_se_comunica_a_Francis_Tax__c: document.getElementById("nombreClienteRecap").value,
            Account_2__c: document.getElementById("accountRecap").value,
            Tipo_de_Llamada__c: document.getElementById("quienLlamadaRecap").value,
            Contact_2__c: document.getElementById("contactRecap").value,

            Tipo_de_Parentezco__c: checkParentezco,
            Que_ano_le_ayudamos_con_impuestos__c: checkAsistidoImpuestos,
            Tipo_de_Agencia__c: checktipoAgencia,
            Fast_Note__c: document.getElementById("solicitudRecap").value
        });
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 500); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 500); }
    });
}
function verScript(id){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Id, Keywords_Cases__c, X4_1_Va_a_agregar_o_retirar_algun_depen__c, X1_En_apoyo_a_su_servicio_de_declaraci__c, X2_Cu_l_ser_a_el_mejor_horario_para_comu__c, X3_Quiere_realizar_alguna_actualizaci_n__c, X4_Cambio_sus_nombres_legalmente_en_el_a__c, X21_Cambio_de_seguro_social__c, X5_0_Estado_Civil__c, X6_Tiene_su_certificado_de_matrimonio__c, Hay_ingresos_que_su_esposo_a_reportara__c, X3_2_1_Nota_que_quiere_compartir_sobre_i__c, X7_Tiene_dependes_que_declara_en_sus_new__c, X8_4_Preguntarias_Nombre__c, X8_6_Va_a_retirar_algun_dependiente_new__c, X8_Va_a_agregar_dependes__c, X8_7_Nombre_Completo_Depende_a_Retirar__c, X8_7_Menciono_que_retira_un_dependiente__c, X8_3_Alguno_de_sus_dependientes_trabaja__c, X8_5_Cantidad_de_dinero__c, X9_Va_a_asistir_con_alguien_mas_que_nece__c, X23_Pago_cuidado_infantil_para_alguno_de__c, X24_Alguno_de_sus_dependientes_esta_en_l__c, X25_Gasto_en_utiles_escolares_de_alguno__c, X28_Alguno_de_sus_dependientes_tuvo_gast__c, X11_Ya_tiene_todos_los_documentos__c, X12_Ya_tiene_sus_formas_w2new__c, X28_Ademas_de_sus_formas_W2_usted_o_su_p__c, X12_3_Cuantas_W_2_tiene__c, X12_5_Cuantas_1099_tiene_o_el_reporte_de__c, X12_7_Recibio_Desempleo__c, X19_Tiene_algun_tipo_de_ingreso_por_jueg__c, X12_8_Tiene_algun_otro_tipo_de_ingreso__c, X12_9_Anotar_otro_tipo_de_formas_de_ingr__c, X30_Enviara_algun_documento_para_realiza__c, X31_Notas_Entrevistador__c FROM Script_Case__c WHERE Id='"+id+"'").then((result) => {
            for(var k = 0; k < result.totalSize; k++){
                //Text Recap
                if(result.records[k].X4_Cambio_sus_nombres_legalmente_en_el_a__c === "Si"){
                    document.getElementById("recapDiv4").style.display = "block";
                    document.getElementById("textRecap4").innerHTML = result.records[k].X4_Cambio_sus_nombres_legalmente_en_el_a__c;
                    document.getElementById("recapDiv5").style.display = "none";

                    document.getElementById("recapTax1").style.display = "block";
                    document.getElementById("textTax1").innerHTML = result.records[k].X4_Cambio_sus_nombres_legalmente_en_el_a__c;
                    document.getElementById("recapTax2").style.display = "none";
                }else{
                    document.getElementById("recapDiv4").style.display = "none";
                    document.getElementById("recapDiv5").style.display = "block";

                    document.getElementById("recapTax1").style.display = "none";
                    document.getElementById("recapTax2").style.display = "block";
                }
                if(result.records[k].X21_Cambio_de_seguro_social__c === "Si"){
                    document.getElementById("recapDiv6").style.display = "block";
                    document.getElementById("textRecap5").innerHTML = result.records[k].X21_Cambio_de_seguro_social__c;
                    document.getElementById("recapDiv7").style.display = "none";

                    document.getElementById("recapTax3").style.display = "block";
                    document.getElementById("textTax2").innerHTML = result.records[k].X21_Cambio_de_seguro_social__c;
                    document.getElementById("recapTax4").style.display = "none";
                }else{
                    document.getElementById("recapDiv6").style.display = "none";
                    document.getElementById("recapDiv7").style.display = "block";

                    document.getElementById("recapTax3").style.display = "none";
                    document.getElementById("recapTax4").style.display = "block";
                }
                if(result.records[k].X7_Tiene_dependes_que_declara_en_sus_new__c === "Si"){
                    document.getElementById("recapDiv8").style.display = "block";
                    document.getElementById("textRecap6").innerHTML = result.records[k].X8_Va_a_agregar_dependes__c;
                    document.getElementById("recapDiv9").style.display = "none";

                    document.getElementById("recapDep1").style.display = "block";
                    document.getElementById("textDep1").innerHTML = result.records[k].X8_Va_a_agregar_dependes__c;
                    document.getElementById("recapDep2").style.display = "none";
                }else{
                    document.getElementById("recapDiv8").style.display = "none";
                    document.getElementById("recapDiv9").style.display = "block";

                    document.getElementById("recapDep1").style.display = "none";
                    document.getElementById("recapDep2").style.display = "block";
                }
                if(result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c === "No" || !result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c){
                    document.getElementById("recapDiv10").style.display = "none";
                    document.getElementById("recapDiv11").style.display = "block";

                    document.getElementById("recapDep4").style.display = "none";
                    document.getElementById("recapDep5").style.display = "block";
                }else if(result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c === "Si" || result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c === "Talvez"){
                    document.getElementById("recapDiv10").style.display = "block";
                    document.getElementById("textRecap7").innerHTML = result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c;
                    document.getElementById("recapDiv11").style.display = "none";

                    document.getElementById("recapDep4").style.display = "block";
                    document.getElementById("textDep3").innerHTML = result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c;
                    document.getElementById("textDep4").innerHTML = result.records[k].X8_7_Nombre_Completo_Depende_a_Retirar__c;
                    document.getElementById("recapDep5").style.display = "none";
                }
                if(result.records[k].X12_Ya_tiene_sus_formas_w2new__c === "Si"){
                    document.getElementById("recapDiv12").style.display = "block";
                    document.getElementById("textRecap8").innerHTML = result.records[k].X12_Ya_tiene_sus_formas_w2new__c;
                    document.getElementById("recapDiv13").style.display = "none";

                    document.getElementById("recapInc1").style.display = "block";
                    document.getElementById("textInc1").innerHTML = result.records[k].X12_Ya_tiene_sus_formas_w2new__c;
                    document.getElementById("textInc2").innerHTML = result.records[k].X12_3_Cuantas_W_2_tiene__c;
                    document.getElementById("recapInc2").style.display = "none";
                }else{
                    if(result.records[k].X12_Ya_tiene_sus_formas_w2new__c){
                        document.getElementById("recapDiv12").style.display = "none";
                        document.getElementById("recapDiv13").style.display = "block";
                        
                        document.getElementById("recapInc1").style.display = "none";
                        document.getElementById("textInc3").innerHTML = result.records[k].X12_Ya_tiene_sus_formas_w2new__c;
                        document.getElementById("recapInc2").style.display = "block";
                    }else{
                        document.getElementById("recapDiv12").style.display = "none";
                        document.getElementById("recapDiv13").style.display = "none";
                        document.getElementById("recapInc1").style.display = "none";
                        document.getElementById("recapInc2").style.display = "none";
                    }
                }
                if(!result.records[k].X28_Ademas_de_sus_formas_W2_usted_o_su_p__c) {
                    document.getElementById("recapDiv14").style.display = "block";
                    document.getElementById("recapInc3").style.display = "none";
                    document.getElementById("recapInc5").style.display = "block";
                }else{
                    document.getElementById("recapDiv14").style.display = "none";
                    document.getElementById("recapInc3").style.display = "block";
                    document.getElementById("textInc4").innerHTML = result.records[k].X28_Ademas_de_sus_formas_W2_usted_o_su_p__c;
                    document.getElementById("recapInc5").style.display = "none";
                }
                
                document.getElementById("textRecap9").innerHTML = result.records[k].X12_3_Cuantas_W_2_tiene__c;
                document.getElementById("textRecap10").innerHTML = result.records[k].X12_Ya_tiene_sus_formas_w2new__c;
                
                if(!result.records[k].X5_0_Estado_Civil__c){
                    document.getElementById("recapTax5").style.display = "none";
                }else{
                    document.getElementById("recapTax5").style.display = "block";
                    document.getElementById("textTax3").innerHTML = result.records[k].X5_0_Estado_Civil__c;
                }

                if(!result.records[k].X8_4_Preguntarias_Nombre__c){
                    document.getElementById("recapDep3").style.display = "none";
                }else{
                    document.getElementById("recapDep3").style.display = "block";
                    document.getElementById("textDep2").innerHTML = result.records[k].X8_4_Preguntarias_Nombre__c;
                }
                
                
                if(result.records[k].X8_3_Alguno_de_sus_dependientes_trabaja__c === "Si"){
                    document.getElementById("textDep5").innerHTML = result.records[k].X8_3_Alguno_de_sus_dependientes_trabaja__c;
                    document.getElementById("textDep6").innerHTML = result.records[k].X8_5_Cantidad_de_dinero__c;
                    document.getElementById("recapDep6").style.display = "block";
                    document.getElementById("recapDep7").style.display = "none";
                }else{
                    document.getElementById("recapDep6").style.display = "none";
                    document.getElementById("recapDep7").style.display = "block";
                }
                if(result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c === "No" || result.records[k].X8_3_Alguno_de_sus_dependientes_trabaja__c === "No"){
                    document.getElementById("recapDep8").style.display = "block";
                }else{
                    document.getElementById("recapDep8").style.display = "none";
                }
                if(result.records[k].X9_Va_a_asistir_con_alguien_mas_que_nece__c === "Si"){
                    document.getElementById("recapDep9").style.display = "block";
                    document.getElementById("textDep7").innerHTML = result.records[k].X9_Va_a_asistir_con_alguien_mas_que_nece__c;
                    document.getElementById("recapDep10").style.display = "none";
                }else{
                    document.getElementById("recapDep9").style.display = "none";
                    document.getElementById("recapDep10").style.display = "block";
                }
                
                document.getElementById("textDep8").innerHTML = result.records[k].X23_Pago_cuidado_infantil_para_alguno_de__c;
                document.getElementById("textDep9").innerHTML = result.records[k].X24_Alguno_de_sus_dependientes_esta_en_l__c;
                document.getElementById("textDep10").innerHTML = result.records[k].X25_Gasto_en_utiles_escolares_de_alguno__c;
                document.getElementById("textDep11").innerHTML = result.records[k].X28_Alguno_de_sus_dependientes_tuvo_gast__c;

                
                if(result.records[k].X28_Ademas_de_sus_formas_W2_usted_o_su_p__c === "1099"){
                    document.getElementById("recapInc4").style.display = "block";
                    document.getElementById("textInc5").innerHTML = result.records[k].X12_5_Cuantas_1099_tiene_o_el_reporte_de__c;
                }else{
                    document.getElementById("recapInc4").style.display = "none";
                }
                if(result.records[k].X12_7_Recibio_Desempleo__c !== "No Aplica"){
                    document.getElementById("recapInc6").style.display = "block";
                    document.getElementById("textInc6").innerHTML = result.records[k].X12_7_Recibio_Desempleo__c;
                }else{
                    document.getElementById("recapInc6").style.display = "none";
                }
                document.getElementById("textInc7").innerHTML = result.records[k].X19_Tiene_algun_tipo_de_ingreso_por_jueg__c;
                document.getElementById("textInc8").innerHTML = result.records[k].X12_8_Tiene_algun_otro_tipo_de_ingreso__c;


                //document.getElementById("subjectRecap").value = result.records[k].Keywords_Cases__c;
                document.getElementById("entrevistaRecap").value = result.records[k].X1_En_apoyo_a_su_servicio_de_declaraci__c;
                var horario;
                if(result.records[k].X2_Cu_l_ser_a_el_mejor_horario_para_comu__c){
                    horario = new Date(result.records[k].X2_Cu_l_ser_a_el_mejor_horario_para_comu__c);
                }else{
                    horario = new Date();
                }
                horario.setMinutes(horario.getMinutes() - horario.getTimezoneOffset());
                document.getElementById("horarioRecap").value = horario.toISOString().slice(0,16);
                document.getElementById("actualizarEstadoRecap").value = result.records[k].X3_Quiere_realizar_alguna_actualizaci_n__c;
                document.getElementById("cambioNombreRecap").value = result.records[k].X4_Cambio_sus_nombres_legalmente_en_el_a__c;
                document.getElementById("cambioSeguroRecap").value = result.records[k].X21_Cambio_de_seguro_social__c;
                document.getElementById("estadoCivilRecap").value = result.records[k].X5_0_Estado_Civil__c;
                document.getElementById("certificadoMatrimonioRecap").value = result.records[k].X6_Tiene_su_certificado_de_matrimonio__c;
                document.getElementById("ingresosEsposoRecap").value = result.records[k].Hay_ingresos_que_su_esposo_a_reportara__c;
                document.getElementById("notaIngresoRecap").value = result.records[k].X3_2_1_Nota_que_quiere_compartir_sobre_i__c;
                document.getElementById("agregarDependientesRecap").value = result.records[k].X7_Tiene_dependes_que_declara_en_sus_new__c;
                document.getElementById("nombreDependienteRecap").value = result.records[k].X8_4_Preguntarias_Nombre__c;
                document.getElementById("retirarDependienteRecap").value = result.records[k].X8_6_Va_a_retirar_algun_dependiente_new__c;
                document.getElementById("cuantosDependientesRecap").value = result.records[k].X8_Va_a_agregar_dependes__c;
                document.getElementById("nombreRetirarDependienteRecap").value = result.records[k].X8_7_Nombre_Completo_Depende_a_Retirar__c;
                document.getElementById("motivoRetiraDependienteRecap").value = result.records[k].X8_7_Menciono_que_retira_un_dependiente__c;
                document.getElementById("dependienteTrabajaDependienteRecap").value = result.records[k].X8_3_Alguno_de_sus_dependientes_trabaja__c;
                document.getElementById("cantidadDineroRecap").value = result.records[k].X8_5_Cantidad_de_dinero__c;
                document.getElementById("asistirRecap").value = result.records[k].X9_Va_a_asistir_con_alguien_mas_que_nece__c;
                document.getElementById("cuidadoInfantilRecap").value = result.records[k].X23_Pago_cuidado_infantil_para_alguno_de__c;
                document.getElementById("universidadRecap").value = result.records[k].X24_Alguno_de_sus_dependientes_esta_en_l__c;
                document.getElementById("utilesRecap").value = result.records[k].X25_Gasto_en_utiles_escolares_de_alguno__c;
                document.getElementById("gastosExtraRecap").value = result.records[k].X28_Alguno_de_sus_dependientes_tuvo_gast__c;
                document.getElementById("documentosRecap").value = result.records[k].X11_Ya_tiene_todos_los_documentos__c;
                document.getElementById("formasW2Recap").value = result.records[k].X12_Ya_tiene_sus_formas_w2new__c;
                document.getElementById("declaraIngresosRecap").value = result.records[k].X28_Ademas_de_sus_formas_W2_usted_o_su_p__c;
                document.getElementById("cuantasW2Recap").value = result.records[k].X12_3_Cuantas_W_2_tiene__c;
                document.getElementById("1099BancoRecap").value = result.records[k].X12_5_Cuantas_1099_tiene_o_el_reporte_de__c;
                document.getElementById("desempleoRecap").value = result.records[k].X12_7_Recibio_Desempleo__c;
                document.getElementById("ingresoJuegoRecap").value = result.records[k].X19_Tiene_algun_tipo_de_ingreso_por_jueg__c;
                document.getElementById("otroIngresoRecap").value = result.records[k].X12_8_Tiene_algun_otro_tipo_de_ingreso__c;
                document.getElementById("formasIngresoRecap").value = result.records[k].X12_9_Anotar_otro_tipo_de_formas_de_ingr__c;
                document.getElementById("documentoPropiedadRecap").value = result.records[k].X30_Enviara_algun_documento_para_realiza__c;
                document.getElementById("notasRecap").value = result.records[k].X31_Notas_Entrevistador__c;
            }
        });
    });
}
function verCaso(csId, contactId, accountId){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        conn.query("SELECT Id, CaseNumber, CreatedDate, Subject FROM Case WHERE Customer_Support__c='"+csId+"' and ContactId='"+contactId+"' and AccountId='"+accountId+"' ").then((result) => {
            for(var k = 0; k < result.totalSize; k++){
                document.getElementById("caseNumber").innerHTML = "<a target='_blank' style='color: #054997; text-decoration: none;' class='labelModal' href='https://francistax.my.salesforce.com/"+result.records[k].Id+"'>"+result.records[k].CaseNumber+"</a>";
                document.getElementById("caseNumber2").innerHTML = "<a target='_blank' style='color: #054997; text-decoration: none;' class='labelModal' href='https://francistax.my.salesforce.com/"+result.records[k].Id+"'>"+result.records[k].CaseNumber+"</a>";
                document.getElementById("subjectCase").innerHTML = result.records[k].Subject;
                document.getElementById("subjectCase2").innerHTML = result.records[k].Subject;
                let date = new Date(result.records[k].CreatedDate);
                let options = {  
                    weekday: "long", year: "numeric", month: "short",  
                    day: "numeric", hour: "2-digit", minute: "2-digit"  
                };
                document.getElementById("createdDateCase").innerHTML = date.toLocaleTimeString("en-us", options);
                document.getElementById("createdDateCase2").innerHTML = date.toLocaleTimeString("en-us", options);
            }
        });
        conn.query("SELECT Id, StageName, CreatedDate, Name FROM Opportunity WHERE Customer_Support__c='"+csId+"' and Contact__c='"+contactId+"' and AccountId='"+accountId+"' ", function(err, result) {
            for(var k = 0; k < result.totalSize; k++){
                document.getElementById("stageOpp").innerHTML = result.records[k].StageName;
                let date = new Date(result.records[k].CreatedDate);
                let options = {  
                    weekday: "long", year: "numeric", month: "short",  
                    day: "numeric", hour: "2-digit", minute: "2-digit"  
                };
                document.getElementById("createdDateOpp").innerHTML = date.toLocaleTimeString("en-us", options);
                document.getElementById("subjectOpp").innerHTML = "<a target='_blank' style='color: #054997; text-decoration: none;' class='labelModal' href='https://francistax.my.salesforce.com/"+result.records[k].Id+"'>"+result.records[k].Name+"</a>";
            }
        });
    });
}
function verAuthentication(){
    var conn = new conexionSF();
    var url = new URL(window.location.href);
    var urlId = url.searchParams.get("Id");
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Id, FirstName, LastName, Phone, Email, Taxpayer_SSN__c, DOB__c, Nota_Phone__c FROM Contact WHERE Id='"+urlId+"'").then((result) => {
            document.getElementById("spanFirstName").innerHTML = result.records[0].FirstName;
            document.getElementById("firstNameAuth").value = result.records[0].FirstName;
            document.getElementById("spanLastName").innerHTML = result.records[0].LastName;
            document.getElementById("lastNameAuth").value = result.records[0].LastName;
            if(result.records[0].Phone){
                document.getElementById("spanPhone").innerHTML = result.records[0].Phone;
                document.getElementById("phoneNumberAuth").value = result.records[0].Phone;
            }
            if(result.records[0].Nota_Phone__c){
                document.getElementById("phoneNotesAuth").value = result.records[0].Nota_Phone__c;
            }
            if(result.records[0].Email){
                document.getElementById("spanEmail").innerHTML = result.records[0].Email;
                document.getElementById("emailAuth").value = result.records[0].Email;
            }
            if(result.records[0].Taxpayer_SSN__c){
                document.getElementById("spanSSN").innerHTML = result.records[0].Taxpayer_SSN__c;
                document.getElementById("ssnAuth").value = result.records[0].Taxpayer_SSN__c;
            }
            if(result.records[0].DOB__c){ 
                document.getElementById("spanDOB").innerHTML= result.records[0].DOB__c;
                document.getElementById("dobAuth").value = result.records[0].DOB__c;
            }
        });
        conn.query("SELECT Street__c, City__c, State__c, Country__c, Postal_Code__c FROM Address__c WHERE Contact__c='"+urlId+"'").then((result) => {
            if(result.records[0].Street__c){ 
                document.getElementById("spanStreet").innerHTML = result.records[0].Street__c;
                document.getElementById("streetAuth").value = result.records[0].Street__c;
            }
            if(result.records[0].City__c){ 
                document.getElementById("spanCity").innerHTML = result.records[0].City__c;
                document.getElementById("cityAuth").value = result.records[0].City__c;
            }
            if(result.records[0].State__c){
                document.getElementById("spanState").innerHTML = result.records[0].State__c;
                document.getElementById("stateAuth").value = result.records[0].State__c;
            }
            if(result.records[0].Country__c){
                document.getElementById("spanCountry").innerHTML = result.records[0].Country__c;
                document.getElementById("countryAuth").value = result.records[0].Country__c;
            }
            if(result.records[0].Postal_Code__c){
                document.getElementById("spanPostalCode").innerHTML = result.records[0].Postal_Code__c;
                document.getElementById("postalCodeAuth").value = result.records[0].Postal_Code__c;
            }
        });
    });
}

function scriptUpdate(){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
            //Obtener Id de Case Resolution relacionado con la Keyword Id del Customer Service
            const key = await conn.sobject('Keywords_Cases__c').retrieve(document.getElementById("subjectRecap").value);
            var caseResolution = key.Case_Resolution__c;
          
            //Obtener información del Case Resolution Relacionado a Keyword
            try{
                const caseRes = await conn.sobject('Case_Resolution__c').retrieve(caseResolution);
                if(caseRes){
                    await conn.sobject("Customer_Service__c").update({
                        Id: document.getElementById("csList").value,
                        Keywords_Cases__c: document.getElementById("subjectRecap").value
                    });
                    const ret = await conn.sobject("Script_Case__c").update({
                        Id: document.getElementById("scriptCaseId").value,
                        Keywords_Cases__c: document.getElementById("subjectRecap").value,
                        X1_En_apoyo_a_su_servicio_de_declaraci__c: document.getElementById("entrevistaRecap").value,
                        X2_Cu_l_ser_a_el_mejor_horario_para_comu__c: new Date(document.getElementById("horarioRecap").value),
                        X3_Quiere_realizar_alguna_actualizaci_n__c: document.getElementById("actualizarEstadoRecap").value,
                        X4_Cambio_sus_nombres_legalmente_en_el_a__c: document.getElementById("cambioNombreRecap").value,
                        X21_Cambio_de_seguro_social__c: document.getElementById("cambioSeguroRecap").value,
                        X5_0_Estado_Civil__c: document.getElementById("estadoCivilRecap").value,
                        X6_Tiene_su_certificado_de_matrimonio__c: document.getElementById("certificadoMatrimonioRecap").value,
                        Hay_ingresos_que_su_esposo_a_reportara__c: document.getElementById("ingresosEsposoRecap").value,
                        X3_2_1_Nota_que_quiere_compartir_sobre_i__c: document.getElementById("notaIngresoRecap").value,
                        X7_Tiene_dependes_que_declara_en_sus_new__c: document.getElementById("agregarDependientesRecap").value,
                        X8_4_Preguntarias_Nombre__c: document.getElementById("nombreDependienteRecap").value,
                        X8_6_Va_a_retirar_algun_dependiente_new__c: document.getElementById("retirarDependienteRecap").value,
                        X8_Va_a_agregar_dependes__c: document.getElementById("cuantosDependientesRecap").value,
                        X8_7_Nombre_Completo_Depende_a_Retirar__c: document.getElementById("nombreRetirarDependienteRecap").value,
                        X8_7_Menciono_que_retira_un_dependiente__c: document.getElementById("motivoRetiraDependienteRecap").value,
                        X8_3_Alguno_de_sus_dependientes_trabaja__c: document.getElementById("dependienteTrabajaDependienteRecap").value,
                        X8_5_Cantidad_de_dinero__c: document.getElementById("cantidadDineroRecap").value,
                        X9_Va_a_asistir_con_alguien_mas_que_nece__c: document.getElementById("asistirRecap").value,
                        X23_Pago_cuidado_infantil_para_alguno_de__c: document.getElementById("cuidadoInfantilRecap").value,
                        X24_Alguno_de_sus_dependientes_esta_en_l__c: document.getElementById("universidadRecap").value,
                        X25_Gasto_en_utiles_escolares_de_alguno__c: document.getElementById("utilesRecap").value,
                        X28_Alguno_de_sus_dependientes_tuvo_gast__c: document.getElementById("gastosExtraRecap").value,
                        X11_Ya_tiene_todos_los_documentos__c: document.getElementById("documentosRecap").value,
                        X12_Ya_tiene_sus_formas_w2new__c: document.getElementById("formasW2Recap").value,
                        X28_Ademas_de_sus_formas_W2_usted_o_su_p__c: document.getElementById("declaraIngresosRecap").value,
                        Para_el_ano_20xx_abrio_su_propia_compa__c: document.getElementById("declaraIngresosRecap").value,
                        X12_3_Cuantas_W_2_tiene__c: document.getElementById("cuantasW2Recap").value,
                        X12_5_Cuantas_1099_tiene_o_el_reporte_de__c: document.getElementById("1099BancoRecap").value,
                        X12_7_Recibio_Desempleo__c: document.getElementById("desempleoRecap").value,
                        X19_Tiene_algun_tipo_de_ingreso_por_jueg__c	: document.getElementById("ingresoJuegoRecap").value,
                        X12_8_Tiene_algun_otro_tipo_de_ingreso__c: document.getElementById("otroIngresoRecap").value,
                        X12_9_Anotar_otro_tipo_de_formas_de_ingr__c: document.getElementById("formasIngresoRecap").value,
                        X30_Enviara_algun_documento_para_realiza__c: document.getElementById("documentoPropiedadRecap").value,
                        X31_Notas_Entrevistador__c: document.getElementById("notasRecap").value 

                    });
                    if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 500); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 500); }
                }
            }catch(err){
                document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>No hay Resolución de Caso para esta Keyword</span>";
                document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 5000);
            }

    });
}

function online_script(success){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query("SELECT Id, X0_Buen_dia_tarde_noche__c, X1_Gracias_se_or_Primer_Nombre_Cliente__c, X10_CS_Gracias_en_caso_de_que_usted_cal__c, X11_CS_Ahora_vamos_a_verificar_su_n_mer__c, X12_CS_Gracias_Se_or_me_comparte_por_fa__c, X13_CS_Gracias_se_or_vamos_a_verificar_j__c, X14_CS_Se_or_en_el_pasado_usted_ha_recib__c, X2_CS_El_n_mero_telef_nico_que_tenemos_p__c, X3_CS_Gracias_se_or_el_correo_electr_nic__c, X4_CS_Perfecto_Se_or_usted_cuente_con_n__c, X5_CS_Gracias_Se_or_su_n_mero_es__c, X6_CS_Perfecto_Much_simas_gracias_ya_act__c, X7_CS_La_fecha_de_nacimiento_de_usted_es__c, X8_CS_Ustede_hacido_victima_de_robo_de_i__c, X9_CS_De_acuerdo_hay_posibilidad_de_que__c, Account__c, address__c, cases__c, Category__c, CityContact__c, Client_Type__c, Contact__c, CountryContact__c, CustomerService__c, dob__c, DOBContact__c, email__c, EmailContact__c, events__c, First_Name__c, history__c, Id_Call__c, Id_Customer__c, interview__c, Last_Name__c, Name, notes__c, Notes_Address__c, Notes_DOB__c, Notes_Email__c, Notes_Phone__c, Notes_SSN__c, PhoneContact__c, phone__c, pin__c, service__c, solution__c, ssn__c, SSNContact__c, StateContact__c, StreetContact__c, update__c, welcome__c, ZipCodeContact__c FROM Online_Script__c ORDER BY Name").then((result) => {
            var keywords = [];
            var keyArray;
            for(var k = 0; k < result.totalSize; k++){
                keyArray = 
                {
                    Id: result.records[k].Id, 
                    X0_Buen_dia_tarde_noche__c: result.records[k].X0_Buen_dia_tarde_noche__c,
                    X1_Gracias_se_or_Primer_Nombre_Cliente__c: result.records[k].X1_Gracias_se_or_Primer_Nombre_Cliente__c,
                    X10_CS_Gracias_en_caso_de_que_usted_cal__c: result.records[k].X10_CS_Gracias_en_caso_de_que_usted_cal__c,
                    X11_CS_Ahora_vamos_a_verificar_su_n_mer__c: result.records[k].X11_CS_Ahora_vamos_a_verificar_su_n_mer__c,
                    X12_CS_Gracias_Se_or_me_comparte_por_fa__c: result.records[k].X12_CS_Gracias_Se_or_me_comparte_por_fa__c,
                    X13_CS_Gracias_se_or_vamos_a_verificar_j__c: result.records[k].X13_CS_Gracias_se_or_vamos_a_verificar_j__c,
                    X14_CS_Se_or_en_el_pasado_usted_ha_recib__c: result.records[k].X14_CS_Se_or_en_el_pasado_usted_ha_recib__c,
                    X2_CS_El_n_mero_telef_nico_que_tenemos_p__c: result.records[k].X2_CS_El_n_mero_telef_nico_que_tenemos_p__c,
                    X3_CS_Gracias_se_or_el_correo_electr_nic__c: result.records[k].X3_CS_Gracias_se_or_el_correo_electr_nic__c,
                    X4_CS_Perfecto_Se_or_usted_cuente_con_n__c: result.records[k].X4_CS_Perfecto_Se_or_usted_cuente_con_n__c,
                    X5_CS_Gracias_Se_or_su_n_mero_es__c: result.records[k].X5_CS_Gracias_Se_or_su_n_mero_es__c,
                    X6_CS_Perfecto_Much_simas_gracias_ya_act__c: result.records[k].X6_CS_Perfecto_Much_simas_gracias_ya_act__c,
                    X7_CS_La_fecha_de_nacimiento_de_usted_es__c: result.records[k].X7_CS_La_fecha_de_nacimiento_de_usted_es__c,
                    X8_CS_Ustede_hacido_victima_de_robo_de_i__c: result.records[k].X8_CS_Ustede_hacido_victima_de_robo_de_i__c,
                    X9_CS_De_acuerdo_hay_posibilidad_de_que__c: result.records[k].X9_CS_De_acuerdo_hay_posibilidad_de_que__c,
                    Account__c: result.records[k].Account__c,
                    address__c: result.records[k].address__c,
                    cases__c: result.records[k].cases__c,
                    Category__c: result.records[k].Category__c,
                    CityContact__c: result.records[k].CityContact__c,
                    Client_Type__c: result.records[k].Client_Type__c,
                    Contact__c: result.records[k].Contact__c,
                    CountryContact__c: result.records[k].CountryContact__c,
                    CustomerService__c: result.records[k].CustomerService__c,
                    dob__c: result.records[k].dob__c,
                    DOBContact__c: result.records[k].DOBContact__c,
                    email__c: result.records[k].email__c,
                    First_Name__c: result.records[k].First_Name__c,
                    history__c: result.records[k].history__c,
                    Id_Call__c: result.records[k].Id_Call__c,
                    Id_Customer__c: result.records[k].Id_Customer__c,
                    interview__c: result.records[k].interview__c,
                    Last_Name__c: result.records[k].Last_Name__c,
                    Name: result.records[k].Name,
                    notes__c: result.records[k].notes__c,
                    Notes_Address__c: result.records[k].Notes_Address__c,
                    Notes_DOB__c: result.records[k].Notes_DOB__c,
                    Notes_SSN__c: result.records[k].Notes_SSN__c,
                    Notes_Phone__c: result.records[k].Notes_Phone__c,
                    PhoneContact__c: result.records[k].PhoneContact__c,
                    phone__c: result.records[k].phone__c,
                    pin__c: result.records[k].pin__c,
                    service__c: result.records[k].service__c,
                    solution__c: result.records[k].solution__c,
                    ssn__c: result.records[k].ssn__c,
                    SSNContact__c: result.records[k].SSNContact__c,
                    update__c: result.records[k].update__c,
                    welcome__c: result.records[k].welcome__c,
                    ZipCodeContact__c: result.records[k].ZipCodeContact__c
                };
                keywords.push(keyArray);
            }
            success(keywords);
        });
    });
}

function greetingUpdate(idCService, ayuda, provieneLlamada, checkParentezco, checktipoAgencia, llamadaAccount, llamadaContact, tipoCliente, checkAsistidoImpuestos, checkapoyarImpuestos){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Customer_Service__c").update({
            Id: idCService,
            Fast_Note__c: ayuda,
            Tipo_de_Llamada__c : provieneLlamada,
            Tipo_de_Parentezco__c: checkParentezco,
            Tipo_de_Agencia__c: checktipoAgencia,
            Account_2__c: llamadaAccount,
            Contact_2__c: llamadaContact,
            Cual_fue_el_ultimo_ano_que_le_ayudamos_c__c: tipoCliente,
            Que_ano_le_ayudamos_con_impuestos__c: checkAsistidoImpuestos,
            X6_En_que_a_os_le_vamos_a_apoyar__c: checkapoyarImpuestos
        });
        if (ret.success) {
            document.getElementById("messageSuccess").classList.remove("hidden");
            setTimeout(function() {
                document.getElementById("messageSuccess").classList.add("hidden");
            }, 500);
        }else{
            document.getElementById("messageError").classList.remove("hidden");
            setTimeout(function() {
                document.getElementById("messageError").classList.add("hidden");
            }, 500);
        }
    });
}

function authenticationUpdate(idContact, firstName, lastName, phone, phoneNotes, email, ssn, street, city, state, country, postal_code, dob){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Contact").update({
            Id: idContact,
            FirstName: firstName,
            LastName : lastName,
            Phone: phone,
            Nota_Phone__c: phoneNotes,
            Email: email,
            Taxpayer_SSN__c: ssn,
            DOB__c: dob
        });
        conn.query("SELECT Id FROM Address__c WHERE Contact__c='"+idContact+"'").then(async (resAddress) => {
            await conn.sobject("Address__c").update({
                Id: resAddress.records[0].Id,
                Street__c: street,
                City__c: city,
                State__c: state,
                Country__c: country,
                Postal_Code__c: postal_code
            });
        });
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 500); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 500); }
    });
}
function homeDivProbe(){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Script_Case__c").update({
            Id: document.getElementById("scriptCaseId").value,
            Notas1__c: document.getElementById("notesHome").value
        });
        document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Guardado exitosamente</span>";
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
    });
}
function taxinfoDivProbe(){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Script_Case__c").update({
            Id: document.getElementById("scriptCaseId").value,
            X4_Cambio_sus_nombres_legalmente_en_el_a__c: document.querySelector('input[name="nombreTaxInfoProbe"]:checked').value,
            X21_Cambio_de_seguro_social__c: document.querySelector('input[name="seguroTaxInfoProbe"]:checked').value,
            Notas2__c: document.getElementById("notasTaxInfoProbe").value
        });
        document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Guardado exitosamente</span>";
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
    });
}
function filingDivProbe(){
    var conn = new conexionSF(); var certificado, ingresos;
    if(document.querySelector('input[name="certificadoFilingProbe"]:checked')){ certificado = document.querySelector('input[name="certificadoFilingProbe"]:checked').value }else{ certificado = " "}
    if(document.querySelector('input[name="ingresosFilingProbe"]:checked')){ ingresos = document.querySelector('input[name="ingresosFilingProbe"]:checked').value }else{ ingresos = " "}
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Script_Case__c").update({
            Id: document.getElementById("scriptCaseId").value,
            X5_0_Estado_Civil__c: document.querySelector('input[name="estadocivilFilingProbe"]:checked').value,
            X6_Tiene_su_certificado_de_matrimonio__c: certificado,
            Hay_ingresos_que_su_esposo_a_reportara__c: ingresos,
            X3_2_1_Nota_que_quiere_compartir_sobre_i__c: document.getElementById("notaIngresoEsposo").value,
            Notas3__c: document.getElementById("notasFilingProbe").value
        });
        document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Guardado exitosamente</span>";
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
    });
}
function dependentsDivProbe(){
    var conn = new conexionSF(); var change, motivo, trabaja, asistir, extra;
    if(document.querySelector('input[name="changeDependentProbe"]:checked')){ change = document.querySelector('input[name="changeDependentProbe"]:checked').value }else{ change = " "}
    if(document.querySelector('input[name="motivoRetirarProbe"]:checked')){ motivo = document.querySelector('input[name="motivoRetirarProbe"]:checked').value }else{ motivo = " "}
    if(document.querySelector('input[name="trabajaIncomeDependentProbe"]:checked')){ trabaja = document.querySelector('input[name="trabajaIncomeDependentProbe"]:checked').value }else{ trabaja = " "}
    if(document.querySelector('input[name="asistirIncomeDependentProbe"]:checked')){ asistir = document.querySelector('input[name="asistirIncomeDependentProbe"]:checked').value }else{ asistir = " "}
    if(document.querySelector('input[name="extraDeductionDependentProbe"]:checked')){ extra = document.querySelector('input[name="extraDeductionDependentProbe"]:checked').value }else{ extra = " "}
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Script_Case__c").update({
            Id: document.getElementById("scriptCaseId").value,
            Va_a_declarar_dependes__c: document.querySelector('input[name="dependienteDependentsProbe"]:checked').value,
            X4_1_Va_a_agregar_o_retirar_algun_depen__c: change,
            X8_Va_a_agregar_dependes__c: document.getElementById("agregarChangeProbe").value,
            Nombres_Dependes__c: document.getElementById("nombresAgregarChangeProbe").value,
            Total_retirar_dependes__c: document.getElementById("retirarChangeProbe").value,
            Nombres_Dependes_Retirar__c: document.getElementById("nombresRetirarChangeProbe").value,
            X8_7_Menciono_que_retira_un_dependiente__c: motivo,
            X8_3_Alguno_de_sus_dependientes_trabaja__c: trabaja,
            X8_5_Cantidad_de_dinero__c: document.getElementById("cantidadIncomeDependentProbe").value,
            X9_Va_a_asistir_con_alguien_mas_que_nece__c: asistir,
            X28_Alguno_de_sus_dependientes_tuvo_gast__c: extra,
            Notas4__c: document.getElementById("notasDependentsProbe").value
        });
        document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Guardado exitosamente</span>";
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
    });
}
function incomeDivProbe(){
    var conn = new conexionSF(); var normas, declara, crp;
    if(document.querySelector('input[name="normasIncomeProbe"]:checked')){ normas = document.querySelector('input[name="normasIncomeProbe"]:checked').value }else{ normas = " "}
    if(document.querySelector('input[name="declaraIncomeProbe"]:checked')){ declara = document.querySelector('input[name="declaraIncomeProbe"]:checked').value }else{ declara = " "}
    if(document.querySelector('input[name="crpIncomeProbe"]:checked')){ crp = document.querySelector('input[name="crpIncomeProbe"]:checked').value }else{ crp = " "}
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Script_Case__c").update({
            Id: document.getElementById("scriptCaseId").value,
            Usted_trabaja_para_una_compa_a_donde_t__c: document.querySelector('input[name="retencionIncomeProbe"]:checked').value,
            X12_Ya_tiene_sus_formas_w2new__c: normas,
            X12_3_Cuantas_W_2_tiene__c: document.getElementById("cuantasW2IncomeProbe").value,
            recibe_su_pago_en_efectivo_o_cheques_per__c: document.querySelector('input[name="pagoIncomeProbe"]:checked').value,
            Para_el_ano_20xx_abrio_su_propia_compa__c: declara,
            X28_Ademas_de_sus_formas_W2_usted_o_su_p__c: declara,
            X12_5_Cuantas_1099_tiene_o_el_reporte_de__c: document.getElementById("cuantas1099IncomeProbe").value,
            Ya_tiene_todos_los_documentos__c: document.getElementById("detalleIncomeProbe").value,
            Usted_tiene_casa_por_renta_como_un_ingre__c: document.querySelector('input[name="casaIncomeProbe"]:checked').value,
            Necesita_que_hagamos_sus_CRP_para_sus_in__c: crp,
            Ya_tiene_su_lista_de_gastos_e_ingresos_r__c: document.getElementById("listaIncomeProbe").value,
            Notas5__c: document.getElementById("notasIncomeProbe").value
        });
        document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Guardado exitosamente</span>";
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
    });
}

function crpDivProbe(){
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const ret = await conn.sobject("Script_Case__c").update({
            Id: document.getElementById("scriptCaseId").value,
            X30_Enviara_algun_documento_para_realiza__c: document.querySelector('input[name="crpProbe"]:checked').value,
            Notas6__c: document.getElementById("notasCRPProbe").value,
        });
        document.getElementById("messageSuccess").innerHTML = "<span class='successMessage'>Guardado exitosamente</span>";
        if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
    });
}
function probeSave(){
    var conn = new conexionSF();
    if(!document.getElementById("notesHome").value.trim() || !document.getElementById("notesTaxpayer").value.trim() || !document.getElementById("notesFiling").value.trim() ||
    !document.getElementById("notesDependents").value.trim() || !document.getElementById("notesIncome").value.trim() || !document.getElementById("notesCRP").value.trim()){
        document.getElementById("messageWarning").innerHTML = "<span class='warningMessage'>Para continuar, se requiere escribir una nota en cada sección</span>"; document.getElementById("messageWarning").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageWarning").classList.add("hidden"); }, 2000);
    }else{
        conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
            const ret = await conn.sobject("Script_Case__c").update({
                Id: document.getElementById("scriptCaseId").value,
                Notas1__c: document.getElementById("notesHome").value,
                Notas2__c: document.getElementById("notesTaxpayer").value,
                Notas3__c: document.getElementById("notesFiling").value,
                Notas4__c: document.getElementById("notesDependents").value,
                Notas5__c: document.getElementById("notesIncome").value,
                Notas6__c: document.getElementById("notesCRP").value,
            });
            if (ret.success) { document.getElementById("messageSuccess").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageSuccess").classList.add("hidden"); functions.nextScript(); }, 1000); }else{ document.getElementById("messageError").classList.remove("hidden"); setTimeout(function() { document.getElementById("messageError").classList.add("hidden"); }, 1000); }
        });
    }
}

function calendarEvents(success){
    var conn = new conexionSF();
    var firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    var query = 'SELECT Id, Subject__c, StartTime__c, EndTime__c, PriorityType__c, Description__c, Tipo_de_Cita__c, Color__c FROM Calendar__c WHERE StartTime__c >= $date ORDER BY StartTime__c'.replace('$date', firstDay.toISOString());
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then((res) => {
        conn.query(query).then((result) => {
            var events = [];
            var eventArray;
            for(var j = 0; j < result.totalSize; j++){
                eventArray = 
                {
                    id:result.records[j].Id, 
                    title: result.records[j].Subject__c, 
                    start: result.records[j].StartTime__c, 
                    end: result.records[j].EndTime__c, 
                    allDay:false,
                    color: result.records[j].Color__c,
                    borderColor: '#000',
                    extendedProps: {
                        descripcion: result.records[j].Description__c, 
                        priority: result.records[j].PriorityType__c,
                        tipo: result.records[j].Tipo_de_Cita__c,
                        tipo2: result.records[j].PriorityType__c + '_' + result.records[j].Tipo_de_Cita__c,
                        dayHour: new Date(result.records[j].StartTime__c).getDay() + '-' + new Date(result.records[j].StartTime__c).toTimeString().substring(0,5)
                    }
                };
                events.push(eventArray);
            }
            success(events);
        });
    });
}
function agregarEvento(){
    var contact = document.getElementById("idContacto").value;
    var tipoEvento = document.getElementById("tipoEvento").value;
    var name = document.getElementById("keywordListName").value;
    var checkapoyarImpuestos = ""; var count4 = 0; var apoyarImpuestos = document.getElementsByName('apoyarImpuestos[]'); var total4 = document.querySelectorAll("input[name='apoyarImpuestos[]']:checked").length; if(total4 === 16){ total4 = total4 - 1; } for (var j=0; j<apoyarImpuestos.length; j++) { if(apoyarImpuestos[j].checked && apoyarImpuestos[j].value !== "All") { count4++; if(count4 === total4){ checkapoyarImpuestos += apoyarImpuestos[j].value; }else{ checkapoyarImpuestos += apoyarImpuestos[j].value + ';'; } } }

    var inicio = document.getElementById("inicioEvento").value;
    var fin = document.getElementById("finEvento").value;
    var fecha = document.getElementById("fechaEvento").value;
    //Duracion
    var fecha1 = new Date(fecha + " " +inicio);
    var fecha2 = new Date(fecha + " " +fin);
    var duracion = Math.round((fecha2.getTime() - fecha1.getTime()) / 60000);

    var bandera = false; var bandera2 = false;
    if(fecha2.getTime() > fecha1.getTime()){ bandera = true; }else{ bandera = false; alert("Hora fin no puede ser menor o igual a Hora de Inicio");  }
    var descripcion = document.getElementById("descripcionEvento").value;
    if(descripcion && descripcion !== " "){ bandera2 = true; }else{ bandera2 = false; alert("Se requiere una descripción para el evento"); }
    var color;
    var prioridad = document.getElementById("listaPrioridad").value;
    if(prioridad === "Low-Mid" && tipoEvento === "Presencial"){ color = "#92DB32" }else 
    if(prioridad === "Mid-High" && tipoEvento === "Presencial"){ color = "#F0BA4F" }else
    if(prioridad === "Monthly-Clients" && tipoEvento === "Presencial"){ color = "#F26252" }else
    if(prioridad === "Clients-Support" && tipoEvento === "Presencial"){ color = "#E9E9E9" }else
    if( (prioridad === "Low-Mid" && tipoEvento === "Virtual") || (prioridad === "Monthly-Clients" && tipoEvento === "Virtual") ){ color = "#CD40FF"}
    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        const con = await conn.sobject('Contact').retrieve(contact);
        var contactName = con.Name;
        if(bandera === true && bandera2 === true){
            await conn.sobject("Calendar__c").create(
                {
                    CustomerService__c: document.getElementById("csList").value,
                    Account__c: document.getElementById("idAccount").value,
                    Contact__c: contact,
                    Subject__c: name+', '+checkapoyarImpuestos.split(";").pop()+', '+contactName,
                    Description__c: descripcion,
                    StartTime__c: fecha1,
                    EndTime__c: fecha2,
                    Duration__c: duracion,
                    PriorityType__c : prioridad,
                    Tipo_de_Cita__c	: tipoEvento,
                    //Color #92DB32 verde (low), #E9E9E9 gris (client support), #F0BA4F amarillo (mid-high), #7F8080 gris oscuro, #F26252 rojo month, #CD40FF morado
                    Color__c: color
                }
            );
            //Evento SF Production
            await conn.sobject("Event").create(
                {
                    Contact__c: contact,
                    CustomerService__c: document.getElementById("csList").value,
                    Subject: name+', '+checkapoyarImpuestos.split(";").pop()+', '+contactName,
                    Description: descripcion,
                    ActivityDateTime: fecha1,
                    StartDateTime: fecha1,
                    DurationInMinutes: duracion,
                    EndDateTime: fecha2,
                    Priority__c : prioridad,
                    WhoId: contact,
                    Tipo_de_Cita__c	: document.getElementById("tipoEvento").value
                }
            );
            
            functions.calendario();
            closeModal();
        }
    });
}

function closeModal(){
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}
function updateEvento(){
    var inicio = document.getElementById("inicioEvento").value;
    var fin = document.getElementById("finEvento").value;
    var fecha = document.getElementById("fechaEvento").value;
    //Duracion
    var fecha1 = new Date(fecha + " " +inicio);
    var fecha2 = new Date(fecha + " " +fin);
    var duracion = Math.round((fecha2.getTime() - fecha1.getTime()) / 60000);

    var bandera = false; var bandera2 = false;
    if(fecha2.getTime() > fecha1.getTime()){ bandera = true; }else{ bandera = false; alert("Hora fin no puede ser menor o igual a Hora de Inicio"); }
    var descripcion = document.getElementById("descripcionEvento").value;
    if(descripcion && descripcion !== " "){ bandera2 = true; }else{ bandera2 = false; alert("Se requiere una descripción para el evento"); }

    var conn = new conexionSF();
    conn.login('doc@francistaxservice.com', 'Servidor2024.').then(async (res) => {
        if(bandera === true && bandera2 === true){
            const owner = await conn.sobject('Calendar__c').retrieve(document.getElementById("idEvento").value);
            await conn.sobject("Calendar__c").update({   
                Id: document.getElementById("idEvento").value,
                Description__c: descripcion,
                StartTime__c: fecha1,
                EndTime__c: fecha2,
                Duration__c: duracion,
                PriorityType__c : document.getElementById("listaPrioridad").value,
                Tipo_de_Cita__c	: document.getElementById("tipoEvento").value,
                OwnerId: owner.OwnerId
            });
            
            await conn.sobject("Event").update({   
                Id: document.getElementById("idEvent").value,
                Description: descripcion,
            });
            
            functions.calendario();
            closeModal();
        }
    });
}

export { accountsUser, customerService, scriptCase, keywords, verRecap, verScript, verCaso, verAuthentication, online_script, greetingUpdate, authenticationUpdate, homeDivProbe, taxinfoDivProbe, filingDivProbe, dependentsDivProbe, incomeDivProbe, crpDivProbe, probeSave, recapUpdate, scriptUpdate, calendarEvents, agregarEvento, updateEvento };