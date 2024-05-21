// Check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Redirect to the appropriate page (chatbot or login)
function redirectToPage() {
    if (isLoggedIn()) {
        // User is logged in, redirect to chatbot page
        window.location.href = 'chatbot.html';
    } else {
        // User is not logged in, redirect to login page
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatbotLink = document.querySelector('.navbar-menu li:nth-child(2) a'); // Assuming Chatbot link is the second link in the navbar menu

    // Add click event listener to the Chatbot link
    chatbotLink.addEventListener('click', (event) => {
        // Prevent the default action of the link
        event.preventDefault();
        
        // Redirect to the appropriate page
        redirectToPage();
    });
});