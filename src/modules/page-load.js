import { LoadSchedules } from "./schedules/load.js";

class PageLoad {

    static DOMContenttLoaded() {
        document.addEventListener("DOMContentLoaded", () => {
            LoadSchedules.hoursLoad();
        });
    }
    
}

PageLoad.DOMContenttLoaded();