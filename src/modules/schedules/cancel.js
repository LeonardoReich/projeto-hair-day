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
            await this.cancelSchedule(oEvent);
        });
    }

    static async cancelSchedule(oEvent) {
        if(!oEvent.target.classList.contains('cancel-icon')) {
            return;
        }
        
        const iIdSchedule = this.getIdScheduleItemByEvent(oEvent);
            
        if(!iIdSchedule || !UtilsMessages.showConfirm('Tem certeza que deseja cancelar o agendamento?')) {
            return;
        }

        await Schedules.cancelSchedule(iIdSchedule);
        LoadSchedules.hoursLoad();
    }

    static getIdScheduleItemByEvent(oEvent) {
        const oScheduleItem = oEvent.target.closest('li');
        const {id} = oScheduleItem.dataset;
        return id;
    }
    
    static getAllSchedules() {
        return UtilsDOM.getAllElementsByClass('period');
    }

}

CancelSchedules.processOnLoading();
