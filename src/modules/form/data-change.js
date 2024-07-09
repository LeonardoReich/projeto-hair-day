import { SubmitForm } from "./submit.js";
import { LoadSchedules } from "../schedules/load.js";

class DateChange {

    static processOnLoading() {
        this.onChangeInputDate();
    }

    static onChangeInputDate() {
        SubmitForm.getInputDate().addEventListener('change', () => {
            LoadSchedules.hoursLoad();
        });
    }

}

DateChange.processOnLoading();