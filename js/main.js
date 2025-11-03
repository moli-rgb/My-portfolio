// Functionality for the "click on me" element
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.the_name');
    
    if (nameElement) {
        nameElement.addEventListener('click', function() {
            alert('Hello! I\'m Mostafa, a web developer passionate about creating amazing digital experiences!');
        });
    }
    
    // Add hover effect to project buttons
    const projectButtons = document.querySelectorAll('.btn-outline-light');
    projectButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});