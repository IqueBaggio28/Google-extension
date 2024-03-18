

document.addEventListener('DOMContentLoaded', function() {
    const addButtonList = document.querySelectorAll('.tasks_list');

    addButtonList.forEach(function(button) {
        button.addEventListener('click', function() {
            const li = this.parentElement;
            const check = li.querySelector('.check');

            // Show check and create input box and delete button
            check.style.display = 'block';
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('task-input'); // Add a class for easier styling
            input.placeholder = 'Input your task'; // Set placeholder text
            li.appendChild(input);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = '&#10006;'; // Black 'X'
            deleteButton.style.scale = '.8';
            li.appendChild(deleteButton);

            // Add functionality to delete button
            deleteButton.addEventListener('click', function() {
                check.style.display = 'none';
                input.remove();
                deleteButton.remove();
                button.style.display = 'inline-block'; // Show '+' button again
                // Reset check color
                check.style.backgroundColor = '';

                // Adjust opacity
            });

            // Remove functionality of '+' button
            this.style.display = 'none';
            // Adjust opacity
            li.style.opacity = '1';
        });
    });
    // Add functionality to check elements
    const checkList = document.querySelectorAll('.check');
    checkList.forEach(function(check) {
        check.addEventListener('click', function() {
            const li = this.parentElement;
            const text = li.querySelector('.task-input');
            if (text.style.textDecoration === 'line-through') {
                text.style.textDecoration = 'none';
                check.style.backgroundColor = '';
            } else {
                text.style.textDecoration = 'line-through';
                check.style.backgroundColor = 'green';
            }
        });
    });
});





