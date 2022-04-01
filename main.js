const userInput = document.querySelector('#user-input');
const resultText = document.querySelector('#result');
const inputSelect = document.querySelector('#input-select');
const outputSelect = document.querySelector('#output-select');

function convertBinaryToDecimal(binary = '0') {
    binary = String(binary);
    let decimal = 0;
    for(let i = 0; i < binary.length; i++)
    {
        decimal += Number(binary[i]) * 2**(binary.length - i - 1);
    }
    return decimal;
}

function convertHexToDecimal(hex = '0') {
    let decimal = 0;
    for(let i = 0; i < hex.length; i++)
    {
        decimal += getHexValue(hex[i]) * 16**(hex.length - i - 1);
    }
    return decimal;
}

function getHexValue(digit) {
    digit = digit[0];
    digit = digit.toUpperCase();
    switch(digit)
    {
    case 'A': return 10;
    case 'B': return 11;
    case 'C': return 12;
    case 'D': return 13;
    case 'E': return 14;
    case 'F': return 15;
    }
    return Number(digit);
}

function getHexDigit(value) {
    if(value < 10)
        return String(value);

    switch(value)
    {
    case 10: return 'A';
    case 11: return 'B';
    case 12: return 'C';
    case 13: return 'D';
    case 14: return 'E';
    }
    return 'F';
}

function findMaxPowerSubtractable(number, base) {
    for(let i = 0; i < 1024; i++)
    {
        if(number < base**i)
        {
            return i - 1;
        }
    }
}

function convertToBinary(number) {
    number = Math.abs(number);
    if(number === 0)
        return '0';

    const maxPower2Subtractable = findMaxPowerSubtractable(number, 2);

    let result = '';
    for(let i = maxPower2Subtractable; i >= 0; i--)
    {
        const power2 = 2**i;
        if(number >= power2)
        {
            number -= power2;
            result += '1';
        }
        else
        {
            result += '0';
        }
    }
    return result;
}

function convertToHex(number) {
    number = Math.abs(number);
    if(number === 0)
        return '0';

    const maxPower16Subtractable = findMaxPowerSubtractable(number, 16);

    let result = '';
    for(let i = maxPower16Subtractable; i >= 0; i--)
    {
        const power16 = 16**i;
        let k;
        for(k = 15; k > 0; k--)
        {
            if(k * power16 > number)
                continue;
            
            number -= k * power16;
            result += getHexDigit(k);
            break;
        }
        if(k <= 0)
            result += '0';
    }
    return result;
}

function isBinary(binary) {
    for(const digit of binary)
    {
        if(!(digit == '0' || digit == '1'))
            return false;
    }
    return true;
}

function isDecimal(number) {
    if(Number.isNaN(Number(number)))
        return false;

    if(Number(number) === 0 && !number.includes('0'))
        return false;

    return true;
}

function isHexadecimal(hex) {
    hex = hex.toUpperCase();
    for(const digit of hex)
    {
        if(!isHexLetter(digit) && !isDecimal(digit))
            return false;
    }
    return true;
}

function isHexLetter(digit) {
    digit = digit.toUpperCase();
    return digit === 'A' || digit === 'B' || digit === 'C' || digit === 'D' || digit === 'E' || digit === 'F';
}

function updateResult() {
    const inputValue = userInput.value;
    const inputSystem = inputSelect.value;
    const outputSystem = outputSelect.value;

    let result;
    switch(inputSystem)
    {
    case 'binary':
        if(!isBinary(inputValue))
            return;
        result = convertBinaryToDecimal(inputValue);
        break;
    case 'decimal':
        if(!isDecimal(inputValue)) 
            return;
        result = Number(inputValue);
        break;
    case 'hex':
        if(!isHexadecimal(inputValue))
            return;
        result = convertHexToDecimal(inputValue);
        break;
    }

    let convertedResult = result;
    switch(outputSystem)
    {
    case 'binary':
        convertedResult = convertToBinary(result);
        break;
    case 'decimal':
        break;
    case 'hex':
        convertedResult = convertToHex(result);
        break;
    }
    resultText.value = convertedResult;
}