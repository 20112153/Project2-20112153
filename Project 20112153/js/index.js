// Wait until loaded
document.addEventListener('DOMContentLoaded', function () {

 
  // Find all headings
  document.querySelectorAll('.toggle-heading').forEach(function (heading) {
    
    // Get the next element 
    var content = heading.nextElementSibling;

    

    // Add click event to each heading
    heading.addEventListener('click', function () {
      
      // Check if content is  hidden
      var hidden = content.style.display === 'none';

      // Toggle display between 'block' and 'none'
      content.style.display = hidden ? 'block' : 'none';

      // Update the text of the toggle 
      heading.querySelector('.toggle-icon').textContent = hidden ? '[hide]' : '[show]';
    });
  });

});


// Run a second block when DOM is ready (for comments system)
document.addEventListener('DOMContentLoaded', function () {

  
  const form = document.getElementById('comment-form');
  const container = document.getElementById('comments-container');
  const templateSource = document.getElementById('comment-template').innerHTML;

  // Compile the template
  const template = Handlebars.compile(templateSource);

  // Store comments in an array 
  let comments = [];

  // Function to render all comments 
  function renderComments() {
    container.innerHTML = template({ comments: comments });
  }

  // Look for form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    // Get input values and trim 
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('comment').value.trim();

    

    // Add new comment to the beginning of the array 
    comments.unshift({ name, text });

    // Re-render 
    renderComments();

    // Clear the form inputs
    form.reset();
  });

});
//  TEXT SIZE SLIDER
$(function () {
  $("#text-slider").slider({
    min: 12,     // minimum size 
    max: 30,     // maximum size (px)
    value: 16,   // default size

    slide: function (event, ui) {
      // Change font size of main 
      document.querySelector('main').style.fontSize = ui.value + 'px';
    }
  });
});