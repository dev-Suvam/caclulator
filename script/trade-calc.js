//FOR LEVERAGE CALCULATIONS
let LC_Btn = document.querySelector('.LC__calculate-leverage')
LC_Btn.addEventListener('click', () => {
    let number_of_shares = parseInt(document.querySelector('.LC_number-of-shares').value)
    let price_per_share = parseFloat(document.querySelector('.LC_price-per-share').value)
    let amount_used  = parseFloat(document.querySelector('.LC_amount-used').value)

    let calc_Leverage = (number_of_shares*price_per_share)/amount_used
    let out_value = document.querySelector('.LC__output-value')
    if(calc_Leverage >= 0) {
    out_value.textContent = calc_Leverage.toFixed(2)
    document.querySelector('.NS_leverage').value = calc_Leverage.toFixed(2)
    }
})
//FOR SHARE QUANTITY CALCULATIONS
let NS_Btn = document.querySelector('.NS_calculate-shares')
NS_Btn.addEventListener('click', () => {
    let amt = parseFloat(document.querySelector('.NS_amount').value)
    let price_per_share = parseFloat(document.querySelector('.NS_price-per-share').value)
    let leverage_multiplier = parseFloat(document.querySelector('.NS_leverage').value)

    let sqc_qty = (amt*leverage_multiplier)/price_per_share
    let sqc_output = document.querySelector('.NS_output-value')
    if(sqc_qty >= 0){
        sqc_output.textContent = convertNumtoINR(Math.floor(sqc_qty))
        document.querySelector('.PC_number-of-shares').value = Math.floor(sqc_qty)
        document.querySelector('.PC_buy-price-per-share').value = price_per_share
        //
        document.querySelector('.SP_number-of-shares').value = Math.floor(sqc_qty)
        document.querySelector('.SP_buy-price-per-share').value = price_per_share
    }
})
//FOR PROFIT CALCULATIONS
let pc_btn = document.querySelector('.PC_calculate-profits')
pc_btn.addEventListener('click', () => {
 
    let qty_shares = parseInt(document.querySelector('.PC_number-of-shares').value)
    let buy_price = parseFloat(document.querySelector('.PC_buy-price-per-share').value)
    let sell_price = parseFloat(document.querySelector('.PC_sell-price-per-share').value)

    
    let pc_profit  = qty_shares*(sell_price-buy_price)
    let cost_price = buy_price*qty_shares
    let profit_percent = (pc_profit/cost_price)*100
    let pc_out = document.querySelector('.PC-output-profit-value')
    let pc_profit_percentage_out = document.querySelector('.PC-output-profit-percentage')
    if(pc_profit < 0 || pc_profit >= 0 ){
    pc_out.textContent =convertNumtoINR(Math.round(pc_profit))
    pc_profit_percentage_out.textContent = profit_percent.toFixed(2)
    }
})
//FOR GETTING SELL PRICE FOR TARGETED PROFITS
let rsp_btn = document.querySelector('.SP_calculate-sell-price')
rsp_btn.addEventListener('click', () => {
    let shares_qty = parseInt(document.querySelector('.SP_number-of-shares').value)
    let buy_price = parseFloat(document.querySelector('.SP_buy-price-per-share').value)
    let profit_aim = parseFloat(document.querySelector('.SP_profit-aim').value)

    //output values
    let sellPrice_target_out__value = (profit_aim/shares_qty)+buy_price
    let onePer_Out__value = ((1/100)*buy_price)+buy_price
    let one_per_profit_value_out_calc = (onePer_Out__value-buy_price)*shares_qty


    //Select Display output
    let sellPrice_target_out = document.querySelector('.SP_output-value')
    let onePer_Out = document.querySelector('.SP_output-value-at-one-percent')
    let one_per_profit_value_output = document.querySelector('.SP_output-value-profit-at-one-percent')


    //Change Output
    if(sellPrice_target_out__value>=0){
        sellPrice_target_out.textContent = sellPrice_target_out__value.toFixed(2)
    }
    if(shares_qty >= 0 && buy_price >= 0){
        onePer_Out.textContent = onePer_Out__value.toFixed(2)
        one_per_profit_value_output.textContent  = one_per_profit_value_out_calc.toFixed(2)
    }

})

function convertNumtoINR (x){
    x = x.toString()
    let lastThree = x.substring(x.length - 3)
    let otherNumbers = x.substring(0, x.length - 3)
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree
     return res
    }