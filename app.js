//Selectors
const birthYear = document.getElementById("birth-year")
const birthMonth = document.getElementById("birth-month")
const birthDaySelect = document.getElementById("birth-day")
let birthDayOption ;
let birthDayOptionTxt ;

//DEMANDED
const demandedMonth = document.getElementById("demanded-birth-month")
const demandedYear = document.getElementById("demanded-birth-year")
const demandedDaySelect = document.getElementById("demanded-birth-day")
let demandedDayOption ;
let demandedDayOptionTxt ;

//Calculations
let birthDate
let demandedDate
let diffDatesDay  
let diffDatesHour  
let diffDatesMin 
let diffDatesSec 

function showCurrentMonth(selectMonth){
    selectMonth.value = new Date().getMonth()
}


function showCurrentYear(inputYear){
    inputYear.value = new Date().getFullYear()
    inputYear.max = new Date().getFullYear()
}

function showCurrentDay(selectDay){
    selectDay.value = new Date().getDate()
    
}
showCurrentMonth(birthMonth)
showCurrentMonth(demandedMonth)
showCurrentYear(birthYear)
showCurrentYear(demandedYear)

function createDaysOptions(year,month,selectDay,option,optionText) {
    for (var x = 1; x<= (new Date(year.value, (parseInt(month.value)+1),0).getDate()); x++){
        option = document.createElement("option")
        optionText = document.createTextNode(x)
        selectDay.appendChild(option).appendChild(optionText)
    }}


createDaysOptions(birthYear,birthMonth,birthDaySelect,birthDayOption,birthDayOptionTxt)
createDaysOptions(demandedYear,demandedMonth,demandedDaySelect,demandedDayOption, demandedDayOptionTxt)
showCurrentDay(birthDaySelect)
showCurrentDay(demandedDaySelect)
function selectchange(year,month,selectDay,option,optionText){
    for (var i = selectDay.length; i >= 0; i--) {
        selectDay.options[i] = null
    }
    createDaysOptions(year,month,selectDay,option,optionText)
}



function calcAge(){
    birthDate = new Date(birthYear.value ,birthMonth.value ,birthDaySelect.value)
    demandedDate = new Date(demandedYear.value ,demandedMonth.value ,demandedDaySelect.value)
    console.log(birthDate.getDay())
    diffDatesDay = (demandedDate.getTime()-birthDate.getTime())/(1000*60*60*24)
    diffDatesHour = diffDatesDay * 24
    diffDatesMin = diffDatesDay*24*60
    diffDatesSec = diffDatesDay*24*60*60
    calcBirthWeekDay()

}

function calcBirthWeekDay(){
    weekDays = ["Sunday","Monday" , "Tuesday","Wednesday","Thursday","Friday","Saturday"]
    console.log(weekDays[birthDate.getDay()])
}

function showCalculatedAge(){}

