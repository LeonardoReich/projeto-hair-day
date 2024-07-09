export class UtilsMessages {

    static showAlert(sMessage) {
        alert(sMessage);
    }

    static showConfirm(sMessage) {
        return confirm(sMessage);
    }

    static showLog(sLog) {
        console.log(sLog);
    }

}