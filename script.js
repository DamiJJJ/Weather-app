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

function clearErrorMessage(input){
    const box = input.parentElement;
    const errorMessage = box.querySelector('.error');

    errorMessage.style.display = 'none';
}

function checkPasswordsValue(password1, password2){
    
    if(password1.value !== password2.value){
        showErrorMessage(password2, 'Podane hasła są różne!');
    } else {
        clearErrorMessage(password2);
    }
}

function checkInputLength(input, minValue){

    if(input.value.length < minValue){
        showErrorMessage(input, `Pole powinno zawierać ${minValue} znaków`);
    } else {
        clearErrorMessage(input);
    }
}

function checkEmailValue(email){
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(email.value)){
        clearErrorMessage(email);
    } else {
        showErrorMessage(email, 'E-mail niepoprawny');
    }
}

clearButton.addEventListener('click', e => {
    e.preventDefault();
    [userName, password1, password2, email].forEach(input => {
        input.value = '';
        clearErrorMessage(input);
    })
})

sendButton.addEventListener('click', e => {
    e.preventDefault();
    checkPasswordsValue(password1, password2);
    checkInputLength(userName, 5);
    checkInputLength(password1, 8);
    checkEmailValue(email);
})