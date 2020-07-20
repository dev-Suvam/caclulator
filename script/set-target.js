let InitialAmount ;
let RateOfInterest ;
let TimePeriod ;
let ChangeAmount;
let ChangeInterval ;
let Leverage ;
let Max_MTF_Margin;
let MTF_Margin;
let WeeklyTarget;
let MonthlyTarget;
let YearlyTarget;
let Total_Invested_Amount ;
let TargetProfitArray;

let display_div = document.querySelector('#display-result')
let btn = document.querySelector('#calculate--target')
btn.addEventListener('click', ()=>{
    clearContentOf(display_div)
    Max_MTF_Margin = 500000;
    MTF_Margin = 0;
    WeeklyTarget=0;
    MonthlyTarget=0;
    YearlyTarget=0;
    
    TargetProfitArray= []
     InitialAmount = parseInt(document.querySelector('#initial-amount').value);
     RateOfInterest = parseFloat(document.querySelector('#interest').value);
     TimePeriod = parseInt(document.querySelector('#time-period').value);
     ChangeAmount = parseInt(document.querySelector('#change-amount').value);
     ChangeInterval = parseInt(document.querySelector('#change-interval').value);
     Leverage = parseInt(document.querySelector('#leverage').value);
     Total_Invested_Amount=InitialAmount;
    calculateTargets()
})

function calculateTargets(){
    for (let i = 1; i <= TimePeriod; i++) {
        //calculate daily profits initial and final amount
        if(InitialAmount*(Leverage-1)>Max_MTF_Margin) {
            MTF_Margin = Max_MTF_Margin
            printMaxMarginExceed(Max_MTF_Margin)
        }else {
            MTF_Margin = InitialAmount*(Leverage-1)
        }
        let TotalInvestment = InitialAmount + MTF_Margin
        let TargetProfit = (TotalInvestment * (RateOfInterest / 100))
        TargetProfitArray.push(TargetProfit)
        FinalAmount = (InitialAmount + TargetProfit)

        resultsObj = {
            initial_amount:InitialAmount,
            final_amount:FinalAmount,
            profit_per_unit_period:TargetProfit,
        }
        printPeriodicTargets(resultsObj,i)

        if(i%5===0){
            for(let j = i-5 ;j<=i-1;j++) {
        
                WeeklyTarget = WeeklyTarget+TargetProfitArray[j]
            }
            printWeeklyTargets(WeeklyTarget);
            WeeklyTarget = 0;
        }
        if(i%20===0){
            for(let j = i-20 ;j<=i-1;j++) {
                MonthlyTarget = MonthlyTarget+TargetProfitArray[j]
            }
            printMonthlyTargets(MonthlyTarget);
            MonthlyTarget = 0;
        }
        if(i%200===0){
            for(let j = i-200 ;j<=i-1;j++) {
                YearlyTarget = YearlyTarget+TargetProfitArray[j]
            }
            printYearlyTargets(YearlyTarget);
            YearlyTarget = 0;
        }
        InitialAmount = FinalAmount
        if(i%ChangeInterval===0) {
            InitialAmount = FinalAmount+ChangeAmount;
            printChangedAmount(InitialAmount)
        }

        if(i%ChangeInterval===0) {
            Total_Invested_Amount = Total_Invested_Amount+ChangeAmount
        }
        if(i===TimePeriod){
            printInvestedAndFinalReturns(Total_Invested_Amount,(FinalAmount-Total_Invested_Amount))
        }
        
    }
}

function printMaxMarginExceed(number) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container max-margin-exceed`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p>Max Margin Exceed  Max-Margin: <span>${convertNumtoINR(Math.round(number))}</span></p>`

}
function printPeriodicTargets(object,number) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container calculated-targets`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p><span class="period_number">#${convertNumtoINR(Math.round(number))}</span> Initial Amount:<span class="calc_value">${convertNumtoINR (Math.round(object.initial_amount))}</span>Final Amount:<span class="calc_value">${convertNumtoINR(Math.round(object.final_amount))}</span>Target Profit:<span class="calc_value">${convertNumtoINR(Math.round(object.profit_per_unit_period))}</span></p>`
}
function printChangedAmount(number) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container changed-amount`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p>Change in Amount:<span class="calc_value">${convertNumtoINR(Math.round(number))}</span></p>`
}
function printMonthlyTargets(number) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container monthly-targets`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p>Monthly Target:<span class="calc_value">${convertNumtoINR(Math.round(number))}</span></p>`
}
function printWeeklyTargets(number) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container weekly-targets`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p>Weekly Target:<span class="calc_value">${convertNumtoINR(Math.round(number))}</span></p>` 
}
function printYearlyTargets(number) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container yearly-targets`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p>Yearly Target:<span class="calc_value">${convertNumtoINR(Math.round(number))}</span></p>`
}
function printInvestedAndFinalReturns(number1,number2) {
    let text_div = document.createElement("div")
    text_div.setAttribute('class', `text-container total-investment`)
    display_div.appendChild(text_div)
    text_div.innerHTML = `<p>Total Investment:<span class="calc_value">${convertNumtoINR(Math.round(number1))}</span>Total Returns:<span class="calc_value">${convertNumtoINR(Math.round(number2))}</span>Percentage Return:<span class="calc_value">${convertNumtoINR(Math.round((number2/number1)*100))}%</span></p>`
}
function clearContentOf(element) {
element.innerHTML = "" ;
}
function convertNumtoINR (x){
    x = x.toString()
    let lastThree = x.substring(x.length - 3)
    let otherNumbers = x.substring(0, x.length - 3)
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree
     return res
}