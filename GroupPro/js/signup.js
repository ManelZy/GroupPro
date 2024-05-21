document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    console.log("Email before API call:", email);

    try {
        const result = await signupUser({ email, password, name });
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
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        });

        const ret_data = await response.json();
        console.log(ret_data);

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
