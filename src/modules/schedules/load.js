import { HoursLoad } from "../form/hours-load.js";
import { Schedules } from "../../services/schedules.js";
import { ShowSchedules } from "../schedules/show.js";
import { SubmitForm } from "../form/submit.js";

export class LoadSchedules {

    static async hoursLoad() {
        const sDate = SubmitForm.getValueInputDate();
        const aDailySchedules = await Schedules.getSchedulesByDay(sDate);
        
        ShowSchedules.showSchedules(aDailySchedules);
        HoursLoad.openingHours({sDate, aDailySchedules});
    }
    
}