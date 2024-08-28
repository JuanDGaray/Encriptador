const matrizSpanishCharacters = [  ['A', '<'],['B', '0'],['C', 'j'],['D', 'd'],['E', 't'],
                                    ['F', 'ñ'],['G', 'H'],['H', '}'],['I', 'D'],['J', '?'],
                                    ['K', '9'],['L', ')'],['M', '/'],['N', "'"],['Ñ', '¿'],
                                    ['O', '.'],['P', 'm'],['Q', 'S'],['R', 'W'],['S', '='],
                                    ['T', '1'],['U', '6'],['V', 'g'],['W', 'É'],['X', 'U'],
                                    ['Y', '&'],['Z', '@'],['a', 'E'],['b', 'Ú'],['c', '"'],
                                    ['d', '#'],['e', 'F'],['f', '*'],['g', 'q'],['h', 'w'],
                                    ['i', '\\'],['j', 'k'],['k', '|'],['l', 'é'],['m', "'"],
                                    ['n', 'l'],['ñ', 'o'],['o', '$'],['p', ':'],['q', ']'],
                                    ['r', 'y'],['s', ','],['t', 'N'],['u', 'x'],['v', '7'],
                                    ['w', 'P'],['x', 'Q'],['y', 'Z'],['z', 'J'],['Á', 'i'],
                                    ['É', 'K'],['Í', 'V'],['Ó', 'Ü'],['Ú', '['],['Ü', 'T'],
                                    ['á', '{'],['é', '-'],['í', 'u'],['ó', '3'],['ú', 'f'],
                                    ['ü', 'G'],['0', '+'],['1', 'B'],['2', 'L'],['3', 'Á'],
                                    ['4', '8'],['5', 'X'],['6', 'v'],['7', 'í'],['8', 'Ñ'],
                                    ['9', 'Y'],[' ', '>'],['.', ';'],[',', '~'],[';', '_'],
                                    [':', '!'],['!', '¡'],['¡', 'ó'],['¿', 'ü'],['?', 'R'],
                                    ['-', '4'],["'", 'M'],['_', 'Í'],['"', 'I'],["'", 'A'],
                                    ['(', 'h'],[')', 'n'],['[', 'b'],[']', 'r'],['{', 'Ó'],
                                    ['}', 'a'],['\\', ' '],['/', '`'],['@', '5'],['$', 'c'],
                                    ['#', 'z'],['%', '^'],['&', 'á'],['*', '2'],['+', 's'],
                                    ['=', 'C'],['<', 'ú'],['>', 'p'],['|', 'e'],['~', 'O'],
                                    ['`', '\n'],['^', '%'],['\n', '('] ];

const matrizSpanishVocalCharacters = [['a', 'enter'],['e', 'imes'],['i', 'ai'],['o', 'ober'],['u', 'ufat']];

const createKey = () => {
    let specialKey = [];
    let indicesEnabled = []
    for (let i = 0; i < caracteres.length; i++) {
        indicesEnabled.push(i);
    }
    for (let i = 0; i < caracteres.length; i++) {
        const selectIndiceAleatorio = Math.floor(Math.random() * indicesEnabled.length);
        const indxRandom = indicesEnabled[selectIndiceAleatorio];
        indicesEnabled.splice(selectIndiceAleatorio, 1);
        specialKey.push(caracteres[indxRandom]);
    }
    const stringKey = specialKey.join();
    return stringKey
}
const caracteres = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ" +
                   "abcdefghijklmnñopqrstuvwxyz" +
                   "ÁÉÍÓÚÜ" +
                   "áéíóúü" +
                   "0123456789" +
                   " .,;:!¡¿?-'_\"'()[]{}\\/@$#%&*+=<>|~`^";

const textArea = document.getElementById("textArea")
const containerBox = document.getElementById("container_box")
const buttonEncryptor = document.getElementById("encryptor_btn")
const buttonDecryptor = document.getElementById("decryptor_btn")
const containerButtons = document.getElementsByClassName("btn-one")
const buttonWarning = document.getElementById("return_btn-warning")
const messageWarning = document.getElementsByClassName("message-box")[0] 
const buttonReturn = document.getElementById("return_btn")
const selectType = document.getElementById("selectType")
const CheckBoxKeyGenerator = document.getElementById("CheckBoxKeyGenerator")
const textMessageWarning = document.getElementById("warning_text")
const infoVocal = document.getElementById("infoVocal")
const buttonCopy = document.getElementById("buttonCopy")
const copyText = document.getElementById("copyText")
buttonEncryptor.addEventListener('click', function() {
    const valueTextarea = textArea.value;
    if (valueTextarea.length > 0) {
        containerBox.classList.add('active');
        setTimeout(function() {encryptAction(valueTextarea);}, 800);    
    } else{
        textMessageWarning.innerText = "Debes incluir algún caracter";
        messageWarning.classList.remove('btn-deactivate');
        messageWarning.classList.add('btn-activate');
        
    }
    
});

const encryptAction = (text) => {
    
    var valueselectType = selectType.value
    console.log(valueselectType)
    containerBox.classList.remove('active')

    if (valueselectType == "all"){
        toogleBtn();
        let textEncrypted = "";
        text =  text.replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t');
        for (let i = 0; i < text.length; i++){
            letter = text[i];
            if  (caracteres.includes(letter)){
                for (let j = 0; j < matrizSpanishCharacters.length; j++){
                    if (letter == matrizSpanishCharacters[j][0]){
                        textEncrypted = textEncrypted +  matrizSpanishCharacters[j][1];
                        textArea.value = textEncrypted+"[*k]";
                        
                    }     
                }
            }
                else{
                    textMessageWarning.innerText = "No se reconoce el caracter [" +letter+"]";
                    messageWarning.classList.remove('btn-deactivate');
                    messageWarning.classList.add('btn-activate');  
                    textArea.value = text;
                    break;
                }    
            }
        } else if (valueselectType == "vocales"){
                let textEncrypted = "";
                let found = false;
                const hayMinuscula = /[A-Z]/.test(text);
                const haySaltos = /\n/.test(text);
                const hayCaracteresEspeciales = /[^a-zA-Z0-9\s]/.test(text);
                const simboloEspeciales = /[!@#\$%\^\&*\)\(+=._-]/.test(text);
                console.log("hayMinuscula", hayMinuscula, "haySaltos",haySaltos, "hayCaracteresEspeciales", hayCaracteresEspeciales, "simboloEspeciales", simboloEspeciales)
                if (!hayMinuscula && !haySaltos && !hayCaracteresEspeciales && !simboloEspeciales){
                    toogleBtn()
                    for (let i = 0; i < text.length; i++){
                        found = false
                        letter = text[i];
                        for (let j = 0; j < matrizSpanishVocalCharacters.length; j++){
                            if (letter == matrizSpanishVocalCharacters[j][0]){
                                textEncrypted = textEncrypted +  matrizSpanishVocalCharacters[j][1];
                                break;}}
                        if (!found) {
                                textEncrypted += letter;
                                }
                            }
                    textArea.value = textEncrypted;
                } else{
                    textMessageWarning.innerText = "No se adminten caracteres especiales, saltos de linea o mayusculas";
                    messageWarning.classList.remove('btn-deactivate');
                    messageWarning.classList.add('btn-activate');  
                    textArea.value = text;
                }
                
                
                
        }
    }
buttonWarning.addEventListener('click', function(){
    const messageWarning = document.getElementsByClassName("message-box")[0] 
    messageWarning.classList.remove('btn-activate');
    messageWarning.classList.add('btn-deactivate');
});

buttonReturn.addEventListener('click', function(){
    toogleBtn()
    textArea.value = ""
    if (infoVocal.classList.contains("btn-deactivate")){
        infoVocal.classList.remove("btn-deactivate");
        infoVocal.classList.add("btn-activate");
    };
});

const toogleBtn = () => {
    toogleBtnPrimary()
    if (infoVocal.classList.contains('btn-activate')){
        infoVocal.classList.remove("btn-activate");
        infoVocal.classList.add('btn-deactivate');} 
    Array.from(containerButtons).forEach(function(button) {
        if (button.classList.contains('btn-activate')) {
            button.classList.remove('btn-activate');
            button.classList.add('btn-deactivate');
        } else {
            button.classList.remove('btn-deactivate');
            button.classList.add('btn-activate');
        }
    })
}


textArea.addEventListener('input', () => {
    const btnDecryptor = document.getElementById("decryptor_btn")
    const inputKeyDecryptor = document.getElementById("inputKey")
    const btnEncryptor = document.getElementById("encryptor_btn")
    if (textArea.value.length > 3  && (textArea.value.slice(-4) === "[*k]" || textArea.value.slice(-4) === "[+k]") && btnDecryptor.classList.contains("disable-btn")) {
        btnDecryptor.classList.remove('disable-btn');  
        btnEncryptor.classList.add('disable-btn');
        CheckBoxKeyGenerator.classList.remove("btn-activate");
        CheckBoxKeyGenerator.classList.add('btn-deactivate');
        if (textArea.value.slice(-4) === "[+k]"){
            inputKeyDecryptor.classList.add("btn-activate");
            inputKeyDecryptor.classList.remove('btn-deactivate');
            if (infoVocal.classList.contains('btn-activate')){
                infoVocal.classList.remove("btn-activate");
                infoVocal.classList.add('btn-deactivate');}
        } 
    } else if (!btnDecryptor.classList.contains("disable-btn")){
        btnDecryptor.classList.add('disable-btn')
        btnEncryptor.classList.remove('disable-btn');
        inputKeyDecryptor.classList.remove("btn-activate");
        inputKeyDecryptor.classList.add('btn-deactivate');
        
         
    } else if (textArea.value.includes("enter") || textArea.value.includes("imes") || textArea.value.includes("ober") || textArea.value.includes("ufat")) {
        console.log("La cadena contiene una de las subcadenas.");
        btnDecryptor.classList.remove('disable-btn');  
        btnEncryptor.classList.add('disable-btn');
        CheckBoxKeyGenerator.classList.remove("btn-activate");
        CheckBoxKeyGenerator.classList.add('btn-deactivate');
        if (infoVocal.classList.contains('btn-activate')){
            infoVocal.classList.remove("btn-activate");
            infoVocal.classList.add('btn-deactivate');}
    }
});

selectType.addEventListener('change', () => {
    console.log(selectType.value);
    if (selectType.value == "vocales"){
        if (infoVocal.classList.contains("btn-deactivate")){
            infoVocal.classList.remove("btn-deactivate");
            infoVocal.classList.add("btn-activate");
        } 
    }else if (infoVocal.classList.contains("btn-activate")){
        infoVocal.classList.add("btn-deactivate");
        infoVocal.classList.remove("btn-activate");
    };}
)


buttonCopy.addEventListener('click', function(){
    const textInput = textArea.value
    copyText.innerText = "Copiado!";
    navigator.clipboard.writeText(textInput)
    setTimeout(function() { copyText.innerText = "Copiar";}, 800);
});

const toogleBtnPrimary = () => {
    if (CheckBoxKeyGenerator.classList.contains('btn-activate')){
        CheckBoxKeyGenerator.classList.remove("btn-activate");
        CheckBoxKeyGenerator.classList.add('btn-deactivate');
        buttonCopy.classList.remove("OpacityOn");
        buttonCopy.classList.add('OpacityOff');
    }else{
        CheckBoxKeyGenerator.classList.remove("btn-deactivate");
        CheckBoxKeyGenerator.classList.add('btn-activate');
        buttonCopy.classList.add("OpacityOn");
        buttonCopy.classList.remove('OpacityOff');
    }
}
