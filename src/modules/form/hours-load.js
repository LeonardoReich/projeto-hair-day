import dayjs from "dayjs";
import { aOpeningHours } from "../../utils/opening-hours.js"
import { SubmitForm } from "./submit.js";

export class HoursLoad {

    static openingHours({sDate, aDailySchedules}) {
        this.resetHourList();

        const aUnavailableHours = this.getUnavailableHours(aDailySchedules);

        const aOpening = aOpeningHours.map((sHour) => {
            const [sScheduleHour] = sHour.split(':');
            const bHourIsPast     = dayjs(sDate).add(sScheduleHour, 'hour').isBefore(dayjs());
            const bAvailableHour  = !aUnavailableHours.includes(sHour) && !bHourIsPast;

            return {sHour, bAvailableHour};
        });

        this.createHours(aOpening);
    }

    static getUnavailableHours(aDailySchedules) {
        return aDailySchedules.map((oSchedule) => {
            return dayjs(oSchedule.oWhen).format('HH:mm');
        });
    }

    static createHours(aOpening) {
        aOpening.forEach(({sHour, bAvailableHour}) => {
            const oLi = document.createElement('li');
            oLi.classList.add('hour');
            oLi.classList.add(bAvailableHour ? 'hour-available' : 'hour-unavailable');
            oLi.textContent = sHour;
            this.handleHourHeader(sHour);
            this.getHourList().append(oLi);
        });

        this.handleHoursEvents();
    }

    static handleHourHeader(sHour) {
        const aPeriods = {
            '09:00' : 'Manhã',
            '13:00' : 'Tarde',
            '18:00' : 'Noite'
        };
        
        if(aPeriods[sHour]) {
            this.createHourHeader(aPeriods[sHour]);
        }
    }

    static createHourHeader(sTitle) {
        const oHeader = document.createElement('li');
        oHeader.classList.add('hour-period');
        oHeader.textContent = sTitle;
        this.getHourList().append(oHeader);
    }

    static handleHoursEvents() {
        const aAvailableHours = this.getAvailableHours();

        aAvailableHours.forEach((oAvailableHour) => {
            oAvailableHour.addEventListener('click', (oSelected) => {
                aAvailableHours.forEach((oHour) => {
                    oHour.classList.remove('hour-selected');
                });

                oSelected.target.classList.add('hour-selected');
            });
        });
    }

    static getHourList() {
        return SubmitForm.getUnorderedListElement();
    }

    static resetHourList() {
        this.getHourList().innerHTML = '';
    }

    static getAvailableHours() {
        return SubmitForm.getHoursAvailableListElement();
    }
    
}