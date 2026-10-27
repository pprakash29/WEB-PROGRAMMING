const STORAGE_KEY = "userInformation";
const DRAFT_KEY = "userInformationDraft";
const form = document.getElementById("userForm");
const fields = ["name", "mobile", "email", "city", "state", "country"];
const errors = { name: "Please enter your full name.", mobile: "Enter exactly 10 digits.", email: "Enter a valid email address.", city: "Please enter your city.", state: "Please enter your state.", country: "Please enter your country." };

function setupCommon() {
  const clock = document.getElementById("liveClock");
  const updateClock = () => { clock.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date()); };
  updateClock();
  setInterval(updateClock, 1000);
  const top = document.getElementById("backTop");
  window.addEventListener("scroll", () => top.classList.toggle("visible", window.scrollY > 320));
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
function validateField(id) {
  const input = document.getElementById(id);
  const value = input.value.trim();
  let valid = value.length > 0;
  if (id === "mobile") valid = /^\d{10}$/.test(value);
  if (id === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  input.classList.toggle("valid", valid);
  input.classList.toggle("invalid", !valid && value.length > 0);
  document.getElementById(`${id}Error`).textContent = valid || value.length === 0 ? "" : errors[id];
  return valid;
}
function validateGender() {
  const valid = Boolean(document.querySelector('input[name="gender"]:checked'));
  document.querySelector(".gender-field").classList.toggle("invalid", !valid);
  document.getElementById("genderError").textContent = valid ? "" : "Please select a gender.";
  return valid;
}
function getUserFromForm() {
  return Object.fromEntries(["name", "gender", ...fields.filter(id => id !== "name")].map(key => [
    key, key === "gender" ? document.querySelector('input[name="gender"]:checked')?.value || "" : document.getElementById(key).value.trim()
  ]));
}
function updateProgress() {
  const completed = fields.filter(id => document.getElementById(id).value.trim()).length + (document.querySelector('input[name="gender"]:checked') ? 1 : 0);
  const total = fields.length + 1;
  const percent = Math.round(completed / total * 100);
  document.getElementById("progressLabel").textContent = `${percent}% complete`;
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("draftStatus").textContent = percent === 100 ? "Ready to save" : completed ? "Draft saved automatically" : "Ready when you are";
}
function updateSubmitState() {
  document.getElementById("submitButton").disabled = !(fields.every(validateField) && validateGender());
  updateProgress();
}
function showToast(text, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.className = `toast visible ${type}`;
  setTimeout(() => toast.classList.remove("visible"), 3200);
}
function modal(open) {
  document.getElementById("confirmModal").hidden = !open;
  if (open) document.getElementById("cancelModal").focus();
}
function fillForm(user) {
  fields.forEach(id => { if (typeof user[id] === "string") document.getElementById(id).value = user[id]; });
  const gender = document.querySelector(`input[name="gender"][value="${CSS.escape(user.gender || "")}"]`);
  if (gender) gender.checked = true;
  document.getElementById("nameCount").textContent = `${document.getElementById("name").value.length} / 60`;
  fields.forEach(validateField);
  updateSubmitState();
}

setupCommon();
fields.forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    validateField(id);
    updateSubmitState();
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(getUserFromForm())); } catch { showToast("Draft could not be saved.", "error"); }
  });
  input.addEventListener("blur", () => validateField(id));
});
document.querySelectorAll('input[name="gender"]').forEach(input => input.addEventListener("change", () => {
  updateSubmitState();
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(getUserFromForm())); } catch { showToast("Draft could not be saved.", "error"); }
}));
document.getElementById("name").addEventListener("input", event => { document.getElementById("nameCount").textContent = `${event.target.value.length} / 60`; });
document.getElementById("clearButton").addEventListener("click", () => modal(true));
document.getElementById("cancelModal").addEventListener("click", () => modal(false));
document.getElementById("confirmModalButton").addEventListener("click", () => {
  form.reset();
  localStorage.removeItem(DRAFT_KEY);
  fields.forEach(id => { document.getElementById(id).classList.remove("valid", "invalid"); document.getElementById(`${id}Error`).textContent = ""; });
  document.getElementById("nameCount").textContent = "0 / 60";
  updateSubmitState();
  modal(false);
  showToast("Form cleared.");
});
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!fields.every(validateField) || !validateGender()) { updateSubmitState(); showToast("Please correct the highlighted fields.", "error"); return; }
  const user = getUserFromForm();
  const button = document.getElementById("submitButton");
  button.disabled = true;
  button.querySelector(".button-label").hidden = true;
  button.querySelector(".loading-spinner").hidden = false;
  setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...user, savedAt: new Date().toISOString() }));
      localStorage.removeItem(DRAFT_KEY);
      window.location.href = "display.html";
    } catch {
      button.disabled = false;
      button.querySelector(".button-label").hidden = false;
      button.querySelector(".loading-spinner").hidden = true;
      showToast("Could not save details in this browser.", "error");
    }
  }, 650);
});

const saved = localStorage.getItem(STORAGE_KEY);
const draft = localStorage.getItem(DRAFT_KEY);
if (saved) document.getElementById("saveStatus").textContent = "Profile saved in this browser";
if (new URLSearchParams(window.location.search).has("edit")) {
  try { if (saved) fillForm(JSON.parse(saved)); } catch { showToast("Saved details could not be loaded for editing.", "error"); }
} else if (draft) {
  try { fillForm(JSON.parse(draft)); } catch { localStorage.removeItem(DRAFT_KEY); }
}
updateSubmitState();
