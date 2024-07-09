export class UtilsDOM {

    static getElementByTag(sIdentifier) {
        return this.getElement(sIdentifier, '');
    }

    static getAllElementsByTag(sIdentifier) {
        return this.getAllElements(sIdentifier, '');
    }

    static getElementById(sIdentifier) {
        return this.getElement(sIdentifier, '#');
    }

    static getAllElementsById(sIdentifier) {
        return this.getAllElements(sIdentifier, '#');
    }

    static getElementByClass(sIdentifier) {
        return this.getElement(sIdentifier, '.');
    }

    static getAllElementsByClass(sIdentifier) {
        return this.getAllElements(sIdentifier, '.');
    }

    static getElement(sIdentifier, sSelector) {
        return document.querySelector(`${sSelector}${sIdentifier}`);
    }

    static getAllElements(sIdentifier, sSelector) {
        return document.querySelectorAll(`${sSelector}${sIdentifier}`);
    }

}