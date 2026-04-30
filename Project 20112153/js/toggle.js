// Toggle expandable content 
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const expandableContent = document.getElementById('expandable-content');
    
    toggleBtn.addEventListener('click', function() {
        if (expandableContent.style.display === 'none') {
            expandableContent.style.display = 'block';
            toggleBtn.textContent = 'Hide Content';
        } else {
            expandableContent.style.display = 'none';
            toggleBtn.textContent = 'Show Content';
        }
    });
});
