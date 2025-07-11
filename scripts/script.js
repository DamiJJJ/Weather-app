const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.remove('is-valid');
    formControl.classList.add('is-invalid');
    const errorText = formControl.querySelector('.error-text');
    errorText.textContent = message;
};

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.remove('is-invalid');
    formControl.classList.add('is-valid');
    const errorText = formControl.querySelector('.error-text');
    errorText.textContent = '';
};

const checkEmail = (input) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'E-mail jest nieprawidłowy!');
    }
};

const checkRequired = (inputArr) => {
    let isValid = true;
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `Pole ${getFieldName(input)} jest wymagane.`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
};

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `Pole ${getFieldName(input)} musi mieć co najmniej ${min} znaków.`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `Pole ${getFieldName(input)} może mieć maksymalnie ${max} znaków.`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
};

const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, 'Hasła nie są zgodne!');
        return false;
    } else {
        return true;
    }
};

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isRequired = checkRequired([username, email, password, password2]);

    if (isRequired) {
        const isUsernameLengthValid = checkLength(username, 3, 15);
        const isPasswordLengthValid = checkLength(password, 6, 25);
        
        checkEmail(email);
        const passwordsMatch = checkPasswordsMatch(password, password2);

        if (isUsernameLengthValid && isPasswordLengthValid && passwordsMatch) {
            // Tutaj można dodać kod do wysłania formularza, np. za pomocą AJAX
            alert('Formularz wysłany pomyślnie!');
            form.reset();
            [username, email, password, password2].forEach(input => {
                const formControl = input.parentElement;
                formControl.classList.remove('is-valid', 'is-invalid');
                formControl.querySelector('.error-text').textContent = '';
            });
        }
    }
});

username.addEventListener('blur', () => checkLength(username, 3, 15));
email.addEventListener('blur', () => checkEmail(email));
password.addEventListener('blur', () => checkLength(password, 6, 25));
password2.addEventListener('blur', () => checkPasswordsMatch(password, password2));