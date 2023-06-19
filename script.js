const form = document.getElementById('sign-up-form');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirm-password');
const info = document.querySelector('.info');
info.disabled = true;
form.noValidate = true;
form.addEventListener('submit', validateForm);


// Simple function to invalidate an input box (message + styling)
function invalidate(input) {
    input.classList.add("invalid");
    input.style.borderBottom = `2px solid red`;
    if (input.value === "") {
        input.nextElementSibling.textContent = "This is a required field";
    } else if (input.id === "email") {
        input.nextElementSibling.textContent = "Email is not in a valid format (aaa@aaa.aaa)";
    } else if (input.id === "phone") {
        input.nextElementSibling.textContent = "Phone # is not in a valid format (10 digits only)";
    } else if ((input.id === "password") || (input.id === "confirm-password")) {
        input.nextElementSibling.textContent = "Passwords do not match";
    }
}


// Simple function to validate an input box (message + styling)
function validate(input) {
    input.nextElementSibling.textContent = '\u200B';
    input.style.borderBottom = `2px solid green`;
}


// Wrapper function for general validation
function validateText(input) {
    if (!input.checkValidity()) {
        invalidate(input);
    } else {
        if ((input === password) || (input === confirmpassword)) {
            validatePasswords(input);
            return;
        }
        validate(input);
    }
}


// Specific wrapper function for validating passwords
function validatePasswords(input) {
    if ((password.value !== "") && (confirmpassword.value !== "")) {
        if (password.value !== confirmpassword.value) {
            invalidate(password);
            invalidate(confirmpassword);
        } else {
            validate(password);
            validate(confirmpassword);
        }
    } else if (input.value !== "") {
        validate(input);
    }
}


// Validates the form on submission
function validateForm(e) {
    const form = e.target;
    if (form.checkValidity()) {
        // Form is valid, but we need to check passwords
        if (password.value !== confirmpassword.value) {
            e.preventDefault();
            invalidate(password);
            invalidate(confirmpassword);
        } else {
            // All inputs are correct
            alert("Thanks for signing up! However, this is not an actual site...");
        }
    } else {
        // Get which inputs are invalid
        e.preventDefault();
        Array.from(form.elements).forEach(i => { 
            validateText(i);
         });
    }
}


// We're going to implement an "eager" validation approach using
// event listeners on each input and validation wrappers 
const inputList = document.querySelectorAll("input");
inputList.forEach(input => {
    // When we leave text input, we validate "lazily"
    input.addEventListener("blur", () => {
        // We have to consider passwords separately
        if ((input === password) || (input === confirmpassword)) {
            validatePasswords(input);
            return;
        }
        if (input.checkValidity()) {
            validate(input);
        } else if (input.value !== "") {
            invalidate(input);
        }
    });

    // If some input is invalid, we validate "aggressively"
    input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) {
            validateText(input);
        }
    })
});