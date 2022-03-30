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

function convertToBinary(number = 0) {
    number = Math.abs(number);
    if(number === 0)
        return '0';
        
    let maxPower2Subtractable = 0;
    for(let i = 0; i < 1024; i++)
    {
        if(number < 2**i)
        {
            maxPower2Subtractable = i-1;
            break;
        }
    }

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

function isBinary(binary) {
    for(const digit of binary)
    {
        if(!(digit == '0' || digit == '1'))
            return false;
    }
    return true;
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
        if(Number.isNaN(Number(inputValue))) 
            return;
        result = inputValue;
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
    }
    resultText.textContent = convertedResult;
}