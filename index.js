const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(data){
    return data.map((array) => {
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(record, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return record;
}

function createTimeOutEvent(record, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return record;
}

function hoursWorkedOnDate(record, date){
    let start = record.timeInEvents.find(foo => {
        return foo.date === date;
    });
    let end = record.timeOutEvents.find(foo => {
        return foo.date === date;
    });
    return (end.hour - start.hour) / 100;
}

function wagesEarnedOnDate(record, date){
    let wage = hoursWorkedOnDate(record, date) * record.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(recordObj){
    let dates = recordObj.timeInEvents.map((findDate) => {
        return findDate.date
    })
    let totalWages = dates.reduce((a, b) => {
        return a + wagesEarnedOnDate(recordObj, b)
    }, 0)
    return totalWages;
}

function calculatePayroll(arrayOfEmployees){
    let payroll = arrayOfEmployees.reduce((x, y) => {
        return x + allWagesFor(y)
    }, 0)
    return payroll;
}
