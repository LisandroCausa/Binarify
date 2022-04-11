const userInput = document.querySelector('#user-input');
const resultText = document.querySelector('#result');
const inputSelect = document.querySelector('#input-select');
const outputSelect = document.querySelector('#output-select');

const operatorSelect = document.querySelector('#operator-select');
const firstOperandInput = document.querySelector('#first-operand');
const secondOperandInput = document.querySelector('#second-operand');


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

function convertSignMagnitudeToDecimal(binary = '0') {
    binary = String(binary);
    const signBit = binary[0];
    binary = binary.substring(1);
    const decimal = convertBinaryToDecimal(binary);
    if(signBit === '1')
        return -decimal;
    
    return decimal;
}

function convertOneComplementToDecimal(binary = '0') {
    binary = String(binary);
    const signBit = binary[0];
    binary = binary.substring(1);
    if(signBit === '0')
        return convertBinaryToDecimal(binary);
    
    const invertedBits = invertBits(binary);
    const absoluteResult = convertBinaryToDecimal(invertedBits);
    return -absoluteResult;
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

function convertToSignMagnitude(number) {
    const signBit = number < 0 ? '1' : '0';
    return signBit + convertToBinary(number);
}

function convertToOneComplement(number) {
    const binary = convertToBinary(number);
    if(number < 0)
    {
        const invertedBits = invertBits(binary);
        return "1" + invertedBits;
    }
    return "0" + binary;
}

function invertBits(bits) {
    bits = String(bits);
    let result = '';
    for(const digit of bits)
    {
        if(digit === '0')
            result += '1';
        else
            result += '0';
    }
    return result;
}

function formatBinary(binary) {
    const extraDigits = binary.length % 4;
    if(extraDigits === 0) 
        return binary;

    const zerosToAdd = 4 - extraDigits;
    let result = '';
    for(let i = 0; i < zerosToAdd; i++)
    {
        result += '0';
    }
    result += binary;
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

function ADD(binary1, binary2) {
    const lengthDiff = Math.abs(binary1.length-binary2.length);
    if(binary1.length > binary2.length)
    {
        for(let i = 0; i < lengthDiff; i++)
        {
            binary2 = '0'.concat(binary2);
        }
    }
    else
    {
        for(let i = 0; i < lengthDiff; i++)
        {
            binary1 = '0'.concat(binary1);
        }
    }
    const length = binary1.length;
    let carry = new Array(length+1);
    let result = '';
    for(let i = length-1; i >= 0; i--)
    {
        let sum = 0;
        if(binary1[i] === '1') sum++;
        if(binary2[i] === '1') sum++;
        if(carry[i+1] === '1') sum++;

        switch(sum)
        {
        case 1:
            result = '1' + result;
            break;
        case 2:
            carry[i] = '1';
            result = '0' + result;
            break;
        case 3:
            carry[i] = '1';
            result = '1' + result;
            break;
        default:
            result = '0' + result;
        }
    }
    if(carry[0] === '1')
        result = '1' + result;

    return result;
}

function outputError() {
    resultText.value = 'Error!';
}

function updateResult() { // Conversions page (Index)
    const inputValue = userInput.value;
    if(inputValue === '')
    {
        resultText.value = '';
        return;
    }

    const inputSystem = inputSelect.value;
    const outputSystem = outputSelect.value;

    let result = '';
    switch(inputSystem)
    {
    case 'binary':
        if(!isBinary(inputValue))
            return outputError();
            
        result = convertBinaryToDecimal(inputValue);
        break;
    case 'decimal':
        if(!isDecimal(inputValue)) 
            return outputError();

        result = Number(inputValue);
        break;
    case 'hex':
        if(!isHexadecimal(inputValue))
            return outputError();

        result = convertHexToDecimal(inputValue);
        break;
    case 'sign-magnitude':
        if(!isBinary(inputValue))
            return outputError();
        
        result = convertSignMagnitudeToDecimal(inputValue);
        break;
    case 'one-complement':
        if(!isBinary(inputValue))
            return outputError();

        result = convertOneComplementToDecimal(inputValue);
        break;
    }

    let convertedResult = result;
    switch(outputSystem)
    {
    case 'binary':
        convertedResult = convertToBinary(result);
        convertedResult = formatBinary(convertedResult);
        break;
    case 'decimal':
        break;
    case 'hex':
        convertedResult = convertToHex(result);
        break;
    case 'sign-magnitude':
        convertedResult = convertToSignMagnitude(result);
        break;
    case 'one-complement':
        convertedResult = convertToOneComplement(result);
        break;
    }
    resultText.value = convertedResult;
}

function calculateResult() { // Operations page
    const firstOperand = firstOperandInput.value;
    const secondOperand = secondOperandInput.value;

    if(!isBinary(firstOperand) || !isBinary(secondOperand))
        return outputError();


    let result = '';
    const operator = operatorSelect.value;
    switch(operator)
    {
    case 'add':
        result = ADD(firstOperand, secondOperand);
        break;
    }
    resultText.value = result;
}