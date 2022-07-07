import * as math from 'mathjs'

export const generateWeightArr = (rawWeightArr: number[]) => {
    /*
    let arrLength: number = -1
    if(typeof number !== 'number' && Array.isArray(number) === true){
        arrLength = number.length
    } else if(typeof number === 'number' && Array.isArray(number) !== true){
        arrLength = number
    }
    */
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const denominator = rawWeightArr.reduce(reducer, 0)
    //console.log(denominator)
    const unit = math.floor(math.evaluate(`1/${denominator}`), 8)
    //console.log(unit)
    const weightArr = rawWeightArr.map(elements => {
        return math.evaluate(`${elements}*${unit}`)
    })


    return weightArr
}