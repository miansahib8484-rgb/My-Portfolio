// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const formMessage = document.getElementById('formMessage');
    const form = document.getElementById('contactForm');

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(name && email && message){
        // WhatsApp number (add your country code)
        const whatsappNumber = "+923407327059";

        // Construct WhatsApp message
        const text = `Hello, my name is ${name}.\nEmail: ${email}\nMessage: ${message}`;
        const url = `https://wa.me/${whatsappNumber.replace('+','')}?text=${encodeURIComponent(text)}`;

        // Open WhatsApp
        window.open(url, '_blank');

        // Show confirmation message
        formMessage.innerHTML = '<i class="fa-solid fa-check-circle" style="color: var(--color-secondary-accent); margin-right: 8px;"></i> Thank you! Redirecting to WhatsApp...';
        formMessage.style.color = "green";

        // Reset form
        form.reset();

        // Hide the message after 5 seconds
        setTimeout(() => {
            formMessage.innerHTML = '';
        }, 5000);

    } else {
        formMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="color: red; margin-right: 8px;"></i> Please fill out all fields!';
        formMessage.style.color = "red";
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL-TRIGGERED FADE-IN ANIMATION
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 2. IMAGE PARALLAX EFFECT ON HOVER (3D Interaction)
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const MAX_ROTATION = 5; // degrees

    parallaxElements.forEach(wrapper => {
        const img = wrapper.querySelector('img');
        
        // Mouse movement listener
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateX = -y * MAX_ROTATION;
            const rotateY = x * MAX_ROTATION;
            
            wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            
            const translateX = -x * 8;
            const translateY = -y * 8;
            
            img.style.transform = `translate3d(${translateX}px, ${translateY}px, 20px) scale(1.03)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            img.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
    });
    
    // 3. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});
