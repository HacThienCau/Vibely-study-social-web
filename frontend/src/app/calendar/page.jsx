"use client";

import * as React from 'react';
import { 
    Day, Week, WorkWeek, Month, Agenda, ScheduleComponent, Inject, Resize, DragAndDrop, 
    ViewsDirective,
    ViewDirective
} from '@syncfusion/ej2-react-schedule';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { registerLicense } from '@syncfusion/ej2-base';
import './schedule.css';
registerLicense('ORg4AjUWIQA/Gnt2XVhhQlJHfVtdXHxLflFzVWJbdVtyflZGcC0sT3RfQFhjSn5RdkVmXn9ZdnRUTw==');
const Schedule = () => {
  
    // Xử lý màu sắc sự kiện
    const onEventRendered = (args) => {
        const categoryColor = args.data.CategoryColor;
        if (!args.element || !categoryColor) return;

        if (scheduleObj.current?.currentView === 'Agenda') {
            args.element.firstChild.style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    };
    const data = [
      {
        Id: 1,
        Subject: "Meeting",
        StartTime: new Date(2025, 2, 3, 10, 0),
        EndTime: new Date(2025, 2, 3, 11, 0),
        CategoryColor: "#1aaa55",
        isAllDay: false
      },
      {
        Id: 2,
        Subject: "Planning",
        StartTime: new Date(2025, 2, 4, 12, 0),
        EndTime: new Date(2025, 2, 4, 14, 0),
        CategoryColor: "#357cd2",
        isAllDay: true,
        Status: "Completed",
        Priority: "High"
      }
    ]

    return (
        <main className='pt-14'>
          <ScheduleComponent
            width='100%'
            height='650px'
            eventSettings={{ dataSource: data }}>
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="Month" />
                <ViewDirective option="Agenda" />
            
              </ViewsDirective>

              <Inject services={[Day, Week, Month, Agenda]} />
          </ScheduleComponent>
        </main>
    );
};

export default Schedule;