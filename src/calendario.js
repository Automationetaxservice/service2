import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import {calendarEvents} from './salesforceValues';

var _Lista = require("./salesforceValues");

require("./styles.css");


function renderEventContent(eventInfo) {
  return(
    <>
        <div className='event'>
            <i>{eventInfo.event.title}</i>
        </div>
      
    </>
  )
}

export default function Calendar() {
    
    const handleDateClick = (arg) => {

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
        modal +='        <div class="modalScriptRow">';
        modal +='            <div class="divInputScript"> <label class="labelModal">Prioridad:</label><br> <select id="prioridadEvento"> <option value="Low-Mid">Low-Mid</option> <option value="Mid-High">Mid-High</option> <option value="Monthly-Clients">Monthly-Clients</option> <option value="Clients-Support">Clients-Support</option> </select> </div>';
        modal +='            <div class="divInputScript"> <label class="labelModal">Tipo de Cita:</label><br> <select id="tipoEvento"> <option value="Presencial">Presencial</option> <option value="Virtual">Virtual</option> </select> </div>';
        modal +='        </div>';
        modal +='    </div>';
        document.getElementById("modalChild").innerHTML = modal;
        document.getElementById("eventoModal").classList.remove("hidden");
        document.querySelector(".overlay").classList.remove("hidden");

        var tiempo1 = new Date(arg.dateStr);
        console.log(tiempo1);
        document.getElementById("inicioEvento").value = tiempo1.toTimeString().substring(0,5);
        var tiempo2 = (new Date(tiempo1.getTime()+ 1800000)).toTimeString().substring(0,5);
        document.getElementById("finEvento").value = tiempo2;
        document.getElementById("fechaEvento").valueAsDate = tiempo1;

        
    }
    const eventClick = (info) => {
        console.log('Event: ' + info.event.title);
        info.el.style.borderColor = 'red';
    }

    var myitems = calendarEvents( (resp) => { console.log(resp) });
    return (
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin  ]}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                initialView="timeGridWeek"
                selectable= {true}
                weekends={true}
                hiddenDays= { [0] }
                navLinks= {true}
                nowIndicator= {true}
                businessHours= { {startTime: '08:00', endTime: '18:00'} }
                headerToolbar= { {center: 'dayGridMonth,timeGridWeek'} }
                //events={myitems}
                events={
                    [ { id: 'event1', title: 'evento 1', start: '2024-06-01T08:00:00', end: '2024-06-01T08:30:00', allDay:false, date: '2024-06-01' }, ]
                    
                }
                eventClick ={eventClick}
            />
    )
}

