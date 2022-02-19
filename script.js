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
    const box = password2.parentElement;
    const errorMessage = box.querySelector('.error');
    
    if(password1.value !== password2.value){
        showErrorMessage(password2, 'Podane hasła są różne!');
    } else {
        errorMessage.style.display = 'none';
    }
}

function checkInputLength(input, minValue){
    const box = input.parentElement;
    const errorMessage = box.querySelector('.error');

    if(input.value.length < minValue){
        showErrorMessage(input, `Pole powinno zawierać ${minValue} znaków`);
    } else {
        errorMessage.style.display = 'none';
    }
}

function checkEmailValue(email){
    const box = email.parentElement;
    const errorMessage = box.querySelector('.error');
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(email.value)){
        errorMessage.style.display = 'none';
    } else {
        showErrorMessage(email, 'E-mail niepoprawny');
    }
}

clearButton.addEventListener('click', e => {
    e.preventDefault();
    [userName, password1, password2, email].forEach(input => {
        input.value = '';
        const box = input.parentElement;
        const errorMessage = box.querySelector('.error');
        errorMessage.style.display = 'none';
    })
})

sendButton.addEventListener('click', e => {
    e.preventDefault();
    checkPasswordsValue(password1, password2);
    checkInputLength(userName, 5);
    checkInputLength(password1, 8);
    checkEmailValue(email);
})