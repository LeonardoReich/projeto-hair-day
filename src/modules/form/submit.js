import dayjs from "dayjs";
import { UtilsMessages, UtilsDOM } from "../../utils/utils-classes.js";
import { Schedules } from "../../services/schedules.js";
import { LoadSchedules } from "../schedules/load.js";

export class SubmitForm {

    static processOnLoading() {
        this.handleBehaviors();
    }

    static handleBehaviors() {
        this.handleFields();
        this.handleEvents();
    }

    static handleFields() {
        this.handleInputDate();
    }

    static handleInputDate() {
        this.setValueInputDate();
        this.getInputDate().min = this.getCurrentDate();
    }

    static handleEvents() {
        this.handleFormEvents();
    }

    static handleFormEvents() {
        this.onSubmitForm();
    }

    static onSubmitForm() {
        this.getFormElement().addEventListener('submit', async (oEvent) => {
            oEvent.preventDefault();
            
            try {
                const oData = this.getDataObjectSubmitted();
                const aMessages = this.getArrayValidationMessages(oData);

                if(aMessages.length) {
                    return UtilsMessages.showAlert(aMessages);
                }

                await Schedules.createSchedule(this.handleDataToSend(oData));

                this.resetForm();
            } 
            catch (oError) {
                UtilsMessages.showAlert('Não foi possível realizar o agendamento.');
                UtilsMessages.showLog(oError);
            }
        });
    }

    static getDataObjectSubmitted() {
        return {
            sDate   : this.getValueInputDate(),
            sHour   : this.getValueHourSelected(),
            sClient : this.getValueInputClient()
        };
    }

    static getArrayValidationMessages(oData) {
        const aMessages = [];

        if(!oData.sDate) {
            aMessages.push('O campo Data é obrigatório.');
        }
        else if(!oData.sHour) {
            aMessages.push('Selecione um horário disponível.');
        }
        else if(!oData.sClient) {
            aMessages.push('O campo Cliente é obrigatório.');
        }

        return aMessages;
    }

    static handleDataToSend(oData) {
        const oHandledData = {
            id      : `${new Date().getTime()}`,
            sDate   : oData.sDate,
            sHour   : oData.sHour.split(':')[0],
            sClient : oData.sClient
        };

        const oWhen = this.getValueWhenScheduling(oHandledData.sDate, oHandledData.sHour);

        return {...oHandledData, ...{oWhen}};
    }

    static async resetForm() {
        await LoadSchedules.hoursLoad();
        this.resetValueInputClient();
    }

    static getValueWhenScheduling(sDate, sHour) {
        return dayjs(sDate).add(sHour, 'hour');
    }

    static getFormElement() {
        return UtilsDOM.getElementByTag('form');
    }

    static getUnorderedListElement() {
        return UtilsDOM.getElementById('hours');
    }

    static getHoursAvailableListElement() {
        return UtilsDOM.getAllElementsByClass('hour-available');
    }

    static getHourSelectedListElement() {
        return UtilsDOM.getElementByClass('hour-selected');
    }

    static getValueHourSelected() {
        return this.getHourSelectedListElement() ? this.getHourSelectedListElement().innerText : null;
    }

    static getInputDate() {
        return UtilsDOM.getElementById('date');
    }

    static getValueInputDate() {
        return this.getInputDate().value;
    }

    static setValueInputDate(sValue = this.getCurrentDate()) {
        this.getInputDate().value = sValue;
    }

    static getInputClient() {
        return UtilsDOM.getElementById('client');
    }

    static getValueInputClient() {
        return this.getInputClient().value;
    }

    static setValueInputClient(sValue) {
        this.getInputClient().value = sValue;
    }

    static resetValueInputClient() {
        this.setValueInputClient('');
    }

    static getCurrentDate() {
        return dayjs(new Date()).format("YYYY-MM-DD");
    }

}

SubmitForm.processOnLoading();