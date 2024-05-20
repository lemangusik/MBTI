const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const showPasswordBtn = document.getElementById("showPasswordBtn");
const passwordInput = document.getElementById("passwordInput");
const modalForm = document.getElementById("modalForm");

openModalBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());

showPasswordBtn.addEventListener("pointerdown", () => {
  passwordInput.type = "text";
});
showPasswordBtn.addEventListener("pointerup", () => {
  passwordInput.type = "password";
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (modalForm.checkValidity()) {
    const formData = new FormData(modalForm);
    console.log(Object.fromEntries(formData));
  } else {
    modalForm.reportValidity();
    modalForm.querySelectorAll(":invalid")[0].focus();
  }
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

document.addEventListener("pointerdown", (e) => {
  if (!modal.contains(e.target) && e.target !== openModalBtn) {
    modal.close();
  }
});

const inputs = modalForm.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (!input.checkValidity()) {
      input.setAttribute("aria-invalid", "true");
      const errorElement = input.nextElementSibling;
      errorElement.textContent = input.validationMessage;
      errorElement.removeAttribute("hidden");
    } else {
      input.removeAttribute("aria-invalid");
      const errorElement = input.nextElementSibling;
      errorElement.textContent = "";
      errorElement.setAttribute("hidden", "true");
    }
  });
});