// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. SELECT ELEMENTS
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('.section');
  const skillBars = document.querySelectorAll('.skill-progress');
  const contactForm = document.getElementById('contact-form');

  // 2. SCROLL EFFECTS (Header & Back-to-Top)
  window.addEventListener('scroll', function() {
    // Header background change
    header.classList.toggle('scrolled', window.scrollY > 50);
    
    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }
    
    // Active Nav Link highlight
    setActiveNav();
  });

  // 3. NAVIGATION LOGIC
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  function setActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }

  // 4. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. THE PROGRESS BAR ANIMATION (The change you requested)
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        
        // Reset to zero first
        bar.style.width = '0';
        bar.style.transition = 'width 1.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        
        // Trigger animation
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);

        // Stop observing once animated
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => progressObserver.observe(bar));

  // 6. CONTACT FORM HANDLING
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        date: new Date().toLocaleString()
      };
      
      console.log('Form Submitted:', formData);
      alert('Message sent successfully!');
      contactForm.reset();
    });
  }

  console.log('%c🚀 Portfolio Script Loaded Successfully!', 'color: #0ea5e9; font-weight: bold;');
});
