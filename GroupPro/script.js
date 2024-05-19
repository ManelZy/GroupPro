// Selecting form and input elements
const form = document.querySelector("form");
const passwordInput = document.getElementById("password");

// Function to display error messages
// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    // Get the container for the error message or create it if it doesn't exist
    let errorContainer = field.nextElementSibling;
    if (!errorContainer || !errorContainer.classList.contains("error-container")) {
        errorContainer = document.createElement("div");
        errorContainer.classList.add("error-container");
        field.parentNode.insertBefore(errorContainer, field.nextSibling);
    }
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    // Append the error message to the error container
    errorContainer.appendChild(errorElement);
}


// Function to remove error messages
const removeError = (field) => {
    field.classList.remove("error");
    const errorContainer = field.nextElementSibling;
    const errorElement = errorContainer.querySelector(".error-text");
    if (errorElement) {
        errorElement.remove();
    }
}



const handleFormData = (e) => {
    e.preventDefault();

    // Retrieving input elements
    const emailInput = document.getElementById("email");

    // Getting trimmed values from input fields
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Regular expression patterns for email and password validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Validating email
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }

    // Validating password
    if (password === "") {
        showError(passwordInput, "Enter your password");
    } else if (!passwordPattern.test(password)) {
        showError(passwordInput, "Password must be at least 5 characters long and contain at least one uppercase and one lowercase letter");
    }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    // Submitting the form
    form.submit();
}










// Handling form submission event
form.addEventListener("submit", handleFormData);


