console.log("JS Loaded");

// ===== ELEMENTS =====
const ctaButton = document.getElementById("ctaButton");
const contactCta = document.getElementById("contactCta");
const modalOverlay = document.getElementById("modalOverlay");
const cancelBtn = document.getElementById("cancelBtn");
const contactForm = document.getElementById("contactForm");
const modal = document.querySelector(".modal");

const emailInput = contactForm.elements["email"];
const emailField = emailInput.closest(".field");
const emailError = document.getElementById("emailError");

const phoneInput = contactForm.elements["telefon"];
const nameInputs = [
  contactForm.elements["nume"],
  contactForm.elements["prenume"]
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== MODAL OPEN / CLOSE =====
ctaButton.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

contactCta.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ===== INPUT RESTRICTIONS =====
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

nameInputs.forEach(input => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-zA-ZăâîșțĂÂÎȘȚ\s-]/g, "");
  });
});

emailInput.addEventListener("keydown", (e) => {
  if (e.key === " ") e.preventDefault();
});

// remove whitespace-only input immediately
contactForm.addEventListener("input", (e) => {
  const el = e.target;
  if (!el.matches("input, textarea")) return;

  if (el.value.length > 0 && el.value.trim() === "") {
    el.value = "";
  }

  const field = el.closest(".field");
  if (field) {
    field.classList.remove("invalid");
    const error = field.querySelector(".field-error");
    if (error) error.style.display = "none";
  }
});

// ===== SUBMIT VALIDATION =====
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let hasErrors = false;
  const fields = contactForm.querySelectorAll(".field");

  // 1. empty field validation (ALL fields)
  fields.forEach(field => {
    const input = field.querySelector("input, textarea");
    const error = field.querySelector(".field-error");

    if (input.value.trim() === "") {
      field.classList.add("invalid");
      error.style.display = "block";
      hasErrors = true;
    }
  });

  if (hasErrors) return;

  // 2. email format validation (ONLY after non-empty)
  const email = emailInput.value.trim();

  if (!emailRegex.test(email)) {
    emailField.classList.add("invalid");
    emailError.textContent = "Email invalid";
    emailError.style.display = "block";
    return;
  }

  // 3. success
  const data = {
    nume: contactForm.elements["nume"].value.trim(),
    prenume: contactForm.elements["prenume"].value.trim(),
    email: email,
    telefon: contactForm.elements["telefon"].value.trim(),
    mesaj: contactForm.elements["mesaj"].value.trim()
  };

  console.log(data);

  contactForm.reset();
  modalOverlay.style.display = "none";
});

// Disable autocomplete

function openModal() {
  contactForm.reset();
  modalOverlay.style.display = "flex";
}

ctaButton.addEventListener("click", openModal);
contactCta.addEventListener("click", openModal);