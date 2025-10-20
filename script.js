// Form Validation and Dynamic Functionality

// DOM Elements
const contactForm = document.getElementById('contactForm');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const imageUrlInput = document.getElementById('imageUrlInput');
const imageTitleInput = document.getElementById('imageTitleInput');
const addImageBtn = document.getElementById('addImageBtn');
const imageGallery = document.getElementById('imageGallery');

// Contact Form Validation
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (!formData.name) {
        showError('nameError', 'Name is required');
        isValid = false;
    } else if (formData.name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    if (!formData.email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(formData.email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && !isValidPhone(formData.phone)) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Subject validation
    if (!formData.subject) {
        showError('subjectError', 'Subject is required');
        isValid = false;
    } else if (formData.subject.length < 5) {
        showError('subjectError', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    // Message validation
    if (!formData.message) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (formData.message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
});

// Helper functions for validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Todo List Functionality
let todoCounter = 0;

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (!todoText) {
        alert('Please enter a task!');
        return;
    }
    
    const todoItem = createTodoItem(todoText);
    todoList.appendChild(todoItem);
    todoInput.value = '';
    
    // Add animation
    todoItem.style.opacity = '0';
    setTimeout(() => {
        todoItem.style.opacity = '1';
    }, 10);
}

function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.setAttribute('data-id', ++todoCounter);
    
    li.innerHTML = `
        <span class="todo-text">${escapeHtml(text)}</span>
        <div class="todo-actions">
            <button class="complete-btn" onclick="toggleComplete(${todoCounter})">Complete</button>
            <button class="delete-btn" onclick="deleteTodo(${todoCounter})">Delete</button>
        </div>
    `;
    
    return li;
}

function toggleComplete(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        todoItem.classList.toggle('completed');
        const completeBtn = todoItem.querySelector('.complete-btn');
        completeBtn.textContent = todoItem.classList.contains('completed') ? 'Undo' : 'Complete';
    }
}

function deleteTodo(id) {
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    if (todoItem) {
        // Add fade out animation
        todoItem.style.opacity = '0';
        todoItem.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            todoItem.remove();
        }, 300);
    }
}

// Image Gallery Functionality
addImageBtn.addEventListener('click', addImage);

function addImage() {
    const imageUrl = imageUrlInput.value.trim();
    const imageTitle = imageTitleInput.value.trim();
    
    if (!imageUrl) {
        alert('Please enter an image URL!');
        return;
    }
    
    if (!imageTitle) {
        alert('Please enter an image title!');
        return;
    }
    
    // Validate URL
    try {
        new URL(imageUrl);
    } catch (e) {
        alert('Please enter a valid URL!');
        return;
    }
    
    const imageItem = createImageItem(imageUrl, imageTitle);
    imageGallery.appendChild(imageItem);
    
    // Clear inputs
    imageUrlInput.value = '';
    imageTitleInput.value = '';
    
    // Add animation
    imageItem.style.opacity = '0';
    setTimeout(() => {
        imageItem.style.opacity = '1';
    }, 10);
}

function createImageItem(url, title) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    
    div.innerHTML = `
        <img src="${escapeHtml(url)}" alt="${escapeHtml(title)}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='">
        <div class="gallery-item-content">
            <h3>${escapeHtml(title)}</h3>
            <div class="gallery-item-actions">
                <button class="remove-image-btn" onclick="removeImage(this)">Remove</button>
            </div>
        </div>
    `;
    
    return div;
}

function removeImage(button) {
    const galleryItem = button.closest('.gallery-item');
    if (galleryItem) {
        // Add fade out animation
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'scale(0.8)';
        setTimeout(() => {
            galleryItem.remove();
        }, 300);
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some sample todos on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add sample todos
    const sampleTodos = [
        'Learn HTML and CSS',
        'Master JavaScript DOM manipulation',
        'Build responsive layouts',
        'Create interactive forms'
    ];
    
    sampleTodos.forEach((todo, index) => {
        setTimeout(() => {
            const todoItem = createTodoItem(todo);
            todoList.appendChild(todoItem);
        }, index * 200);
    });
    
    // Add sample images
    const sampleImages = [
        {
            url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
            title: 'Web Development'
        },
        {
            url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
            title: 'Coding'
        },
        {
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            title: 'Programming'
        }
    ];
    
    sampleImages.forEach((image, index) => {
        setTimeout(() => {
            const imageItem = createImageItem(image.url, image.title);
            imageGallery.appendChild(imageItem);
        }, index * 300);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit contact form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement.closest('#contactForm')) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}
