document.addEventListener("DOMContentLoaded", function () {
  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Typing Effect
  const typingText = "Hi, I’m Yasmin Mohamed — Front-End Developer";
  const typingElement = document.getElementById("typing-text");
  let i = 0;
  function typeWriter() {
    if (typingElement && i < typingText.length) {
      typingElement.innerHTML += typingText.charAt(i);
      i++;
      setTimeout(typeWriter, 75);
    }
  }
  if (typingElement) {
    typeWriter();
  }

  // Intersection Observer for animations
  const sections = document.querySelectorAll(".section-hidden");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Contact Form Handling
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const scriptURL =
        "هنا يتم وضع رابط الـ Web App الخاص بـ Google Apps Script"; // <-- ضعي الرابط هنا

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";
      }
      if (formStatus) {
        formStatus.innerText = "";
      }

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
          if (response.ok) {
            if (formStatus) {
              formStatus.innerText = "Message sent successfully!";
              formStatus.style.color = "var(--success)";
            }
            form.reset();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .catch((error) => {
          if (formStatus) {
            formStatus.innerText = "An error occurred. Please try again.";
            formStatus.style.color = "var(--error)";
          }
          console.error("Error!", error.message);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
          }
        });
    });
  }
});
