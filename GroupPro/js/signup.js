document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('signup_email').value;
    const phone_number = document.getElementById('phone_number').value;
    const password = document.getElementById('signup_password').value;
    const password_confirmation = document.getElementById('password_confirmation').value;

    console.log("Data before API call:", { first_name, last_name, email, phone_number, password, password_confirmation });

    try {
        const result = await signupUser({ first_name, last_name, email, phone_number, password, password_confirmation });
        if (result === 'success') {
            window.location.href = 'signup-success.html'; // Redirect to the next step or a success page
        } else {
            alert(result); // Handle error message
        }
    } catch (error) {
        console.error("Error during signup:", error);
        alert('Error: An unexpected error occurred.');
    }
});

async function signupUser(data) {
    try {
        const response = await fetch('http://127.0.0.1:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const ret_data = await response.json();
        console.log("Response from API:", ret_data);

        if (ret_data.answer) {
            if (ret_data.answer === 'success') {
                alert('Check your email box for verification.');
                return 'success';
            } else if (ret_data.answer === 'error') {
                return `Error: ${ret_data.error_message}`;
            }
        } else {
            return 'Error: Unexpected response format';
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return 'Error: An unexpected error occurred.';
    }
}
