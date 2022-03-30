const userInput = document.querySelector('#user-input');
const resultText = document.querySelector('#result');

function convertBinaryToDecimal(binary = '0') {
    binary = String(binary);
    let decimal = 0;
    for(let i = 0; i < binary.length; i++)
    {
        if(binary[i] === '0')
            continue;
        
        decimal += 2**(binary.length - i - 1);
    }
    return decimal;
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
    if(!isBinary(inputValue))
        return;
    
    const result = convertBinaryToDecimal(inputValue);
    resultText.textContent = result;
}