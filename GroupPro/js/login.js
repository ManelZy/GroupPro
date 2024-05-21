document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    loginErrorMessage.textContent = ''; // Clear previous error message
  
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming success response contains 'answer' and 'token'
        if (data.answer === 'success') {
          // Store token in local storage or cookies
          localStorage.setItem('token', data.token);
          localStorage.setItem('user_id', data.user_id);
          // Redirect to logged home page
          window.location.href = 'logged_home_page.html';
        } else {
          loginErrorMessage.textContent = data.error_message;
        }
      } else {
        // Handle non-200 HTTP responses
        loginErrorMessage.textContent = data.error_message || 'Login failed. Please try again.';
      }
    } catch (error) {
      loginErrorMessage.textContent = 'An error occurred. Please try again.';
      console.error('Error:', error);
    }
  });
  