//Selectors
//Birth Date Selectors
const birthYear = document.getElementById("birth-year")
const birthMonth = document.getElementById("birth-month")
const birthDaySelect = document.getElementById("birth-day")


//DEMANDED Date Selectors
const demandedMonth = document.getElementById("demanded-month")
const demandedYear = document.getElementById("demanded-year")
const demandedDaySelect = document.getElementById("demanded-day")

//Input button
const  button= document.getElementById("input-btn")

const ballons = document.getElementsByClassName("ballon");
//Global variables

//Global variables | Day options
let birthDayOption ; //Birth day options
let demandedDayOption ; //Demanded day options

//Global variables | Age Calculations
let birthDate
let demandedDate
let diffDatesDay  
let diffDatesHour  
let diffDatesMin 
let diffDatesSec 

//Global variables  | error message
let errorMessageTxt = document.createElement("h2")

//Global variables | Showing the age calculations
let ageCalcUL
let ageCalcLi

//Global variables | Controling the page content
let finish = 0;

//Functions

//Stopping the ballon animation
function BallonAnimation(state){
    for (var i = 0; i < ballons.length; i++) {
        ballons[i].style.animationPlayState = state;
    }
}

BallonAnimation("paused")

//Showing the current Date on <select> and <Input> tags

//Showing the current year
function showCurrentYear(inputYear){
    inputYear.value = new Date().getFullYear()
}

//Showing the current month
function showCurrentMonth(selectMonth){
    selectMonth.value = new Date().getMonth()
}

//Showing the current day
function showCurrentDay(selectDay){
    selectDay.value = new Date().getDate()
}

showCurrentMonth(birthMonth)
showCurrentMonth(demandedMonth)
showCurrentYear(birthYear)
showCurrentYear(demandedYear)

//Creating <option> tags for <select> tag
function createDaysOptions(year,month,selectDay,option) {
    //Making the <select> tag length = the number the chosen month days
    for (var x = 1; x<= (new Date(year.value, (parseInt(month.value)+1),0).getDate()); x++){
        option = document.createElement("option")
        option.textContent = x
        selectDay.appendChild(option)
        option.value = x
    }
}

//Changingthe number of February days according to the chosen year 
function createFebruaryOptions(year,month,selectDay,option){
    if(month.value ==1){
        changeDayNum(year,month,selectDay,option)
    }
}

//Creating option tags and showing the current day as the default
createDaysOptions(birthYear,birthMonth,birthDaySelect,birthDayOption)
createDaysOptions(demandedYear,demandedMonth,demandedDaySelect,demandedDayOption)
showCurrentDay(birthDaySelect)
showCurrentDay(demandedDaySelect)

//Recreating the option tags after changing the month value
function changeDayNum(year,month,selectDay,option){
    for (var i = selectDay.length; i >= 0; i--) {
        selectDay.options[i] = null //Removing the old option tags
    }
    createDaysOptions(year,month,selectDay,option) //Creating new option tags
}

//Showing the error message
function errorMessage(){
    errorMessageTxt.textContent = "" //To remove the old error message if the error was repeated again
    errorMessageTxt.setAttribute("id","error-message") //Creating Id for the error message text
    document.querySelector(".input-container").appendChild(errorMessageTxt)
    
    //Styling the error message text and the text above it
    document.getElementById("input-container-text").style.marginBottom ="10px" 
    errorMessageTxt.style.marginBottom = "15px"
}

//Calculating the age
function calcAge(){
    birthDate = new Date(birthYear.value ,birthMonth.value ,birthDaySelect.value) //the birth date
    demandedDate = new Date(demandedYear.value ,demandedMonth.value ,demandedDaySelect.value) //the demanded date
    
    diffDatesYear = Math.floor((demandedDate.getTime()-birthDate.getTime())/(1000*60*60*24*365)) //The age in years
    diffDatesDay = (demandedDate.getTime()-birthDate.getTime())/(1000*60*60*24) //The age in days
    diffDatesMonth = Math.floor((diffDatesDay/(365/12))) //The age in months
    diffDatesHour = diffDatesDay * 24 //The age in hours
    diffDatesMin = diffDatesDay*24*60 //The age in minutes
    diffDatesSec = diffDatesDay*24*60*60 //The age in seconds
}


//Calculating the birth week day
function calcBirthWeekDay(){
    weekDays = ["Sunday","Monday" , "Tuesday","Wednesday","Thursday","Friday","Saturday"]
    birthWeekDay = weekDays[birthDate.getDay()]
}

//Creatins lists that contain the age calculations
function createLists(){
    document.getElementById("input-container-dates").style.display = "none"
    ageCalcUL = document.createElement("ul")
    ageCalcUL.setAttribute("id" , "age-calculations")
    document.getElementById("input-container-div").appendChild(ageCalcUL)
    
    for(var y = 0;y<7 ;y++){
        ageCalcLi = document.createElement("li")
        ageCalcLi.setAttribute("id" , "age-calculations-list")
        ageCalcUL.appendChild(ageCalcLi)
    }
}


//Writing the age calculations
function showCalculatedAge(){
    ageCalcUL.childNodes[0].textContent=`You was born on ${birthWeekDay}`
    ageCalcUL.childNodes[1].textContent=`Your Age In Years : ${diffDatesYear} Years`
    ageCalcUL.childNodes[2].textContent=`Your Age In Months : ${diffDatesMonth} Months`
    ageCalcUL.childNodes[3].textContent=`Your Age In Days: ${Math.round(diffDatesDay)} days`
    ageCalcUL.childNodes[4].textContent=`Your Age In Hours: ${Math.round(diffDatesHour)} hours`
    ageCalcUL.childNodes[5].textContent=`Your Age In Minutes: ${Math.round(diffDatesMin)} minutes`
    ageCalcUL.childNodes[6].textContent=`Your Age In Seconds: ${Math.round(diffDatesSec)} seconds`
    
    //Increasing the seconds value every second
    setInterval(function(){
        diffDatesSec++
        ageCalcUL.childNodes[6].textContent=`Your Age In Seconds: ${Math.round(diffDatesSec)} seconds`
    },1000)

    
}

//Adding event listener to the input button

button.addEventListener("click",function(){
    calcAge() //Doing the age calculations

    //Checking errors
    if(finish == 0){ 

        //Checking errors | checking if the input year is bigger than the current year
        if(birthYear.value>new Date().getFullYear() || demandedYear.value>new Date().getFullYear()){
            errorMessage()
            errorMessageTxt.textContent ="There is an error, please enter the years again"
        }
        
        //Checking errors | checking if the demanded date is earlier than the birth date
        else if(diffDatesSec<0){
            errorMessage()
            errorMessageTxt.textContent ="There is an error, Date of birth must be earlier than the age at date"
        }

        //Checking errors| If there is no errors
        else{
            //Removing the error message styles
            document.getElementById("input-container-text").style.marginBottom ="40px"
            errorMessageTxt.style.marginBottom = "0"
            errorMessageTxt.textContent = ""
            
            //Showing the age calculations
            calcBirthWeekDay()
            createLists()
            showCalculatedAge()
            finish++ 
            button.textContent = "Try Another Date" //Changing the button text

            //Showing the ballons animation
            BallonAnimation("running")
        }
    }

    //Reloading the page if the button is clicked again after showng the age
    else if(finish ==1){
        window.location.reload()
    }

})
    
    