import dayjs from "dayjs";
import { UtilsDOM, UtilsMessages } from "../../utils/utils-classes";

export class ShowSchedules {

    static showSchedules(aDailySchedules) {
        try {
            this.resetSchedules();

            aDailySchedules.forEach((oSchedule) => {
                this.createSchedules(oSchedule);
            });
        } 
        catch (oError) {
            UtilsMessages.showLog(oError);
            UtilsMessages.showAlert('Não foi possível exibir os agendamento.');
        }
    }

    static createSchedules(oSchedule) {
        const oScheduleItem = document.createElement('li');
        const oScheduleHour = document.createElement('strong');
        const oClientName   = document.createElement('span');

        oScheduleItem.setAttribute('data-id', oSchedule.id);
        oScheduleHour.textContent = dayjs(oSchedule.oWhen).format('HH:mm');
        oClientName.textContent   = oSchedule.sClient;

        const oCancelIcon = document.createElement('img');
        oCancelIcon.classList.add('cancel-icon');
        oCancelIcon.setAttribute('src', './src/assets/cancel.svg');
        oCancelIcon.setAttribute('alt', 'Cancelar');

        oScheduleItem.append(oScheduleHour, oClientName, oCancelIcon);
        this.setScheduleAccordingPeriod(oScheduleItem, oSchedule.sHour);
    }

    static setScheduleAccordingPeriod(oScheduleItem, sHour) {
        if(sHour <= 12) {
            this.getMorningSchedulesElement().appendChild(oScheduleItem);
        }
        else if(sHour > 12 && sHour <= 18) {
            this.getAfternoonSchedulesElement().appendChild(oScheduleItem);
        }
        else {
            this.getNightSchedulesElement().appendChild(oScheduleItem);
        }
    }

    static getMorningSchedulesElement() {
        return UtilsDOM.getElementById('period-morning');
    }

    static setMorningSchedules(sValue) {
        this.getMorningSchedulesElement().innerHTML = sValue;
    }

    static resetMorningSchedules() {
        this.setMorningSchedules('');
    }

    static getAfternoonSchedulesElement() {
        return UtilsDOM.getElementById('period-afternoon');
    }

    static setAfternoonSchedules(sValue) {
        this.getAfternoonSchedulesElement().innerHTML = sValue;
    }

    static resetAfternoonSchedules() {
        this.setAfternoonSchedules('');
    }

    static getNightSchedulesElement() {
        return UtilsDOM.getElementById('period-night');
    }

    static setNightSchedules(sValue) {
        this.getNightSchedulesElement().innerHTML = sValue;
    }

    static resetNightSchedules() {
        this.setNightSchedules('');
    }

    static resetSchedules() {
        this.resetMorningSchedules();
        this.resetAfternoonSchedules();
        this.resetNightSchedules();
    }

}