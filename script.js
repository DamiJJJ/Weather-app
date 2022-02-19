const userName = document.querySelector('#userName');
const password1 = document.querySelector('#password1');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const clearButton = document.querySelector('.clear');
const sendButton = document.querySelector('.send');

function showErrorMessage(input, message){
    const box = input.parentElement;
    const errorMessage = box.querySelector('.error');

    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}

function checkPasswordsValue(password1, password2){
    if(password1.value !== password2.value){
        showErrorMessage(password2, 'Podane hasła są różne!');
    }
}

function checkInputLength(input, minValue){
    if(input.value.length < minValue){
        showErrorMessage(input, 'Twoja nazwa użytkownika jest za krótka');
    }
}

// function checkPasswordLength(password, minValue){
//     const numbers = ['1', '2', '3', '3', '5', '6', '7', '8', '9', '0']
//     if(password.value.length < minValue){
//         console.log('Twoje hasło jest za krótkie');
//     } else if()
// }
clearButton.addEventListener('click', e => {
    e.preventDefault();
    //funkcje, które mają być wywoływane po kliknięciu na przycisk
})

sendButton.addEventListener('click', e => {
    e.preventDefault();
    checkPasswordsValue(password1, password2);
    checkInputLength(userName, 5);
    checkInputLength(password1, 5);
})