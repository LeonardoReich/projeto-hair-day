import { UtilsDOM, UtilsMessages } from "../../utils/utils-classes";
import { Schedules } from "../../services/schedules";
import { LoadSchedules } from "./load";

export class CancelSchedules {

    static processOnLoading() {
        this.handleEvents();
    }

    static handleEvents() {
        this.handlePeriodEvents();
    }

    static handlePeriodEvents() {
        this.getAllSchedules().forEach((oPeriod) => {
            this.onClickPeriod(oPeriod);
        });
    }
    
    static onClickPeriod(oPeriod) {
        oPeriod.addEventListener('click', async (oEvent) => {
            if(oEvent.target.classList.contains('cancel-icon')) {
                const iId = this.getIdScheduleItemByEvent(oEvent);
                
                if(iId && UtilsMessages.showConfirm('Tem certeza que deseja cancelar o agendamento?')) {
                    await Schedules.cancelSchedule(iId);
                    LoadSchedules.hoursLoad();
                }
            }
        });
    }

    static getIdScheduleItemByEvent(oEvent) {
        const oScheduleItem = oEvent.target.closest('li');
        const {id} = oScheduleItem.dataset;
        return id;
    }

    static cancelSchedules() {
        console.log(this.getAllSchedules());
    }
    
    static getAllSchedules() {
        return UtilsDOM.getAllElementsByClass('period');
    }

}

CancelSchedules.processOnLoading();
