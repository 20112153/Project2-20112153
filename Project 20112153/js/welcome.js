// Dynamic welcome 
function getWelcomeMessage() {
    // Using date to get hour
    const hour = new Date().getHours();
    //declare greeting var
    let greeting;
    //js logic to determine time
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon";
    } else if (hour >= 18 && hour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }
    //Get day with date
    const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return `${greeting}! Welcome to my website. Happy ${dayOfWeek}!`;
}

// Display the welcome message on load
window.addEventListener('load', function() {
    const welcomeElement = document.getElementById('welcome-message');
    if (welcomeElement) {
        welcomeElement.textContent = getWelcomeMessage();
    }
});

// Toggle expandable content 
//Evnt listener
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const expandableContent = document.getElementById('expandable-content');
    //Toggle button triggered on click event
    toggleBtn.addEventListener('click', function() {
        if (expandableContent.style.display === 'none') {
            expandableContent.style.display = 'block';
            toggleBtn.textContent = 'Hide Content';
        } else {// Logic if clicked show if clicked show nothing  for toggle
            expandableContent.style.display = 'none';
            toggleBtn.textContent = 'Show Content';
        }
    });
});
