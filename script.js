const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
//Function
function showError(input, message)
{
    const formControl = input.parentElement;
    formControl.classList.add('error');
    if (formControl.classList.contains('success'))
    { formControl.classList.remove('success') }
    
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input)
{
    const formControl = input.parentElement;
    formControl.classList.add('success');
    if (formControl.classList.contains('error'))
    { formControl.classList.remove('error') }
}

//Check email is valid
function isValidEmail(email)
{
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    
}

//Check required fiels
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        
        if (input.value.trim() === "") {
            showError(input, `${getFielName(input)} is required`);
        }
        else if (input == username) {
            checkLength(input, 3, 10);
        }
        else if (input == password) {
            checkLength(input, 6, 20);
        }
        else if (input == email) {
            if (isValidEmail(input.value)) {
                showSuccess(input);
            }
            // if(!isValidEmail(input.value))
            else {
                showError(input, 'Your email is invalid')
                
            }
        }
        else {
            showSuccess(input);
        }
        
    })
}


function getFielName(input)
{
    return input.parentElement.querySelector('label').innerText;
    
}

//Check input length
function checkLength(input, min, max)
{
    if (input.value.length > max)
    {
        showError(input,`${getFielName(input)} must be less than ${max}`)
    }
    
    else if (input.value.length < min)
    {
        showError(input,`${getFielName(input)} must be at least ${min}`)
    }
    else if (input == password2)
    {
        CheckPassword(password, password2);
    }
    else
    {
        showSuccess(input);
    }
    
}


// Check password
function CheckPassword(password, password2)
{
    if (password.value === password2.value)
    {
        showSuccess(password2)
    }
    else
    {
        showError(password2,
            ' Your password and confirmation password do not match');
        }
    }
    
    
    
    form.addEventListener('submit', function (e)
    {
        
        e.preventDefault();
        
        checkRequired([username, email, password, password2]);
        CheckPassword(password, password2);
        
    })