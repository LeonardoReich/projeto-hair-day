import dayjs from "dayjs";
import { UtilsMessages } from "../utils/utils-classes.js";
import { oAPIConfig } from "./api-config.js";

export class Schedules {

    static async createSchedule(oData) {
        try {
            await this.doFetchCreateSchedule(oData);
            UtilsMessages.showAlert('Agendamento realizado com sucesso!');
        }
        catch (oError) {
            UtilsMessages.showLog(oError);
            UtilsMessages.showAlert('Não foi possível agendar. Tente novamente mais tarde.');
        }
    }

    static async getSchedulesByDay(sDate) {
        try {
            const aResponse = await this.doFetchGetSchedules();

            return aResponse.filter((oSchedule) => {
                return dayjs(sDate).isSame(oSchedule.oWhen, 'day');
            });
        }
        catch (oError) {
            UtilsMessages.showLog(oError);
            UtilsMessages.showAlert('Não foi possível buscar os agendamentos do dia selecionado.');
        }
    }

    static async cancelSchedule(iId) {
        try {
            await this.doFetchCancelSchedule(iId);
            UtilsMessages.showAlert('Agendamento cancelado com sucesso!');
        }
        catch (oError) {
            UtilsMessages.showLog(oError);
            UtilsMessages.showAlert('Não foi possível cancelar o agendamento. Tente novamente mais tarde.');
        }
    }

    static async doFetchCreateSchedule(oData) {
        await fetch(this.getSchedulesUrl(), {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(oData)
        });
    }

    static async doFetchGetSchedules() {
        return (await fetch(this.getSchedulesUrl())).json();
    }

    static async doFetchCancelSchedule(iId) {
        await fetch(this.getSchedulesUrl() + `/${iId}`, {
            method : 'DELETE'
        });
    }

    static getSchedulesUrl() {
        return `${oAPIConfig.baseURL}/schedules`;
    }

}
