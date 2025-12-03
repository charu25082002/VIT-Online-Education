// DOM Elements
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navButtons = document.querySelector(".nav-buttons");
const modal = document.getElementById("applicationModal");
const openModalButtons = document.querySelectorAll(".open-application-modal");
const closeModalButton = document.querySelector(".close-btn");
const header = document.querySelector(".sticky-header");
const animatedElements = document.querySelectorAll(".animate__animated");
const floatingWhatsapp = document.querySelector(".floating-whatsapp");

// Initialize animations
document.addEventListener("DOMContentLoaded", function () {
  // Add initial animation classes
  animatedElements.forEach((element) => {
    const animation = element.getAttribute("data-animation");
    if (animation) {
      element.classList.add("animate__" + animation);
    }
  });

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize counters
  initCounters();

  // Initialize form submissions
  initForms();

  // Initialize About section animations
  initAboutAnimations();
});

// Mobile Menu Toggle
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navButtons.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navButtons.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// Sticky Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Trigger scroll animations
  checkScrollAnimations();
});

// Modal Functionality
openModalButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const program = button.getAttribute("data-program");
    if (program) {
      document.getElementById("program").value = program;
      document.getElementById("programInterest").value = program;
    }
    openModal();
  });
});

closeModalButton.addEventListener("click", () => {
  closeModal();
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

function openModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  modal.style.animation = "fadeIn 0.3s";
}

function closeModal() {
  modal.style.animation = "fadeOut 0.3s";
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

// Scroll Animations
function initScrollAnimations() {
  // Add CSS for scroll animations
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .float-animation {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
  document.head.appendChild(style);
}

function checkScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;
  const triggerBottom = windowHeight * 0.85;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add("visible");
    }
  });
}

// Initialize counters with animation
function initCounters() {
  const stats = document.querySelectorAll(".stat span");

  stats.forEach((stat) => {
    const value = stat.textContent;
    if (value.includes("+")) {
      const numValue = parseInt(value);
      if (!isNaN(numValue)) {
        let count = 0;
        const increment = numValue / 50;
        const timer = setInterval(() => {
          count += increment;
          if (count >= numValue) {
            count = numValue;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(count) + "+";
        }, 50);
      }
    }
  });
}

// About Section Animations
function initAboutAnimations() {
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate about stats
          const aboutStats = document.querySelectorAll(".stat-number");
          aboutStats.forEach((stat) => {
            const value = stat.textContent;
            if (value.includes("+")) {
              const numValue = parseInt(value);
              if (!isNaN(numValue)) {
                let count = 0;
                const increment = numValue / 50;
                const timer = setInterval(() => {
                  count += increment;
                  if (count >= numValue) {
                    count = numValue;
                    clearInterval(timer);
                  }
                  stat.textContent = Math.floor(count) + "+";
                }, 50);
              }
            }
          });

          // Add animation classes to elements
          const aboutFeatures = document.querySelectorAll(".about-feature");
          aboutFeatures.forEach((feature, index) => {
            setTimeout(() => {
              feature.style.animation = `fadeInUp 0.5s ease ${
                index * 0.1
              }s forwards`;
            }, 300);
          });

          // Animate why vit cards
          const whyVitCards = document.querySelectorAll(".why-vit-card");
          whyVitCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `zoomIn 0.5s ease ${
                index * 0.1
              }s forwards`;
            }, 500);
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

// Form Submission via WhatsApp
function initForms() {
  // Application Form
  document
    .getElementById("applicationForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm("application");
    });

  // Contact Form
  document
    .getElementById("contactForm")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      submitForm("contact");
    });
}

function submitForm(formType) {
  let formData = {};
  let whatsappMessage = "";

  if (formType === "application") {
    // Collect application form data
    formData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      program: document.getElementById("program").value,
      qualification: document.getElementById("qualification").value.trim(),
      yearOfPassing: document.getElementById("yearOfPassing").value,
      experience: document.getElementById("experience").value,
      currentCompany: document.getElementById("currentCompany").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    // Format message for WhatsApp
    whatsappMessage =
      `*📋 New VIT Online Program Application*\n\n` +
      `*👤 Name:* ${formData.firstName} ${formData.lastName}\n` +
      `*📧 Email:* ${formData.email}\n` +
      `*📱 Phone:* ${formData.phone}\n` +
      `*🎓 Program:* ${formData.program}\n` +
      `*📜 Qualification:* ${formData.qualification}\n` +
      (formData.yearOfPassing
        ? `*📅 Year of Passing:* ${formData.yearOfPassing}\n`
        : "") +
      (formData.experience
        ? `*💼 Work Experience:* ${formData.experience} years\n`
        : "") +
      (formData.currentCompany
        ? `*🏢 Current Company:* ${formData.currentCompany}\n`
        : "") +
      (formData.message ? `*💬 Additional Info:* ${formData.message}\n` : "") +
      `\n_Sent via VIT Online Website_`;
  } else if (formType === "contact") {
    // Collect contact form data
    formData = {
      name: document.getElementById("contactName").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      phone: document.getElementById("contactPhone").value.trim(),
      program: document.getElementById("programInterest").value,
      message: document.getElementById("contactMessage").value.trim(),
    };

    // Format message for WhatsApp
    whatsappMessage =
      `*📞 New VIT Online Program Enquiry*\n\n` +
      `*👤 Name:* ${formData.name}\n` +
      `*📧 Email:* ${formData.email}\n` +
      `*📱 Phone:* ${formData.phone}\n` +
      (formData.program ? `*🎓 Program Interest:* ${formData.program}\n` : "") +
      `*💬 Message:* ${formData.message}\n` +
      `\n_Sent via VIT Online Website_`;
  }

  // WhatsApp phone number (replace with actual number)
  const whatsappNumber = "9841377645"; // Replace with actual number

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Open WhatsApp
  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
    "_blank"
  );

  // Reset form and close modal if it's application form
  if (formType === "application") {
    document.getElementById("applicationForm").reset();
    closeModal();

    // Show success animation
    const modalContent = document.querySelector(".modal-content");
    modalContent.style.animation = "pulse 0.5s";
    setTimeout(() => {
      modalContent.style.animation = "";
    }, 500);
  } else {
    document.getElementById("contactForm").reset();

    // Show success animation
    const contactForm = document.getElementById("contactForm");
    contactForm.style.animation = "pulse 0.5s";
    setTimeout(() => {
      contactForm.style.animation = "";
    }, 500);
  }

  // Show floating success message
  showNotification("Message ready to send on WhatsApp!");
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1a365d 0%, #2d5aa0 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add CSS for notifications
const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Program Info Buttons
document.querySelectorAll(".program-info-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const programCard = this.closest(".program-card");
    const programTitle = programCard.querySelector("h3").textContent;

    showNotification(
      `More information about ${programTitle} will be displayed here.`
    );

    // Add animation effect
    programCard.style.animation = "pulse 0.5s";
    setTimeout(() => {
      programCard.style.animation = "";
    }, 500);
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Floating WhatsApp animation
if (floatingWhatsapp) {
  setInterval(() => {
    floatingWhatsapp.style.transform = "translateY(-5px)";
    setTimeout(() => {
      floatingWhatsapp.style.transform = "translateY(0)";
    }, 500);
  }, 3000);
}

// Add hover effects to cards
document
  .querySelectorAll(".program-card, .feature-card, .why-vit-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

// Initialize scroll animations on load
window.addEventListener("load", checkScrollAnimations);

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.backgroundPositionY = scrolled * 0.5 + "px";
  }
});

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize tooltips for info buttons
document.querySelectorAll(".program-info-btn").forEach((button) => {
  button.setAttribute("title", "Click for more information");
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Add loaded class to body for transitions
  setTimeout(() => {
    document.body.style.opacity = "1";
    document.body.style.transition = "opacity 0.5s ease";
  }, 100);
});
