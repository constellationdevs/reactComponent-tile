export function getHolidays(tileConfig: any) {
    return tileConfig.holidays.map((date: string) => new Date(date));
}

export function isWeekday(date: any) {
    const day = date.getDay();
    return day !== 0 && day !== 6;
};
export function allDays(date: any) {
    const day = date.getDay();
    return day === 0 || day === 1 || day === 2 || day === 3 || day === 4 || day === 5|| day === 6;
};

export function createEventFromDate(date: string, inputID?: any) {
    const event = {target: {value: "", id: "", className: ""}};
    event.target.value = date;
    event.target.id = inputID;
    return event;
}

export function createDateFromString(value: any) {
    return !value || value === "" ? null : new Date(value + " 12:00:00")
}

export function getMaxDate(tileConfig: any) {
    return new Date(tileConfig.maxDate);
}

export function createDateInput(inputId:string, inputLabel: string){

    return {
      templateID: 4,
      type: "date",
      inputID: inputId,
      label: inputLabel,
      min: "today",
      currentValue: "",
      excludeDates: false
    };
}