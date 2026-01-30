// ---------------- DATA ----------------
const locationData = {
  India: {
    Telangana: ["Hyderabad", "Warangal"],
    Karnataka: ["Bangalore", "Mysore"],
  },
  USA: {
    Texas: ["Dallas", "Austin"],
    California: ["Los Angeles", "San Diego"],
  },
  UK: {
    England: ["London", "Manchester"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa"],
  },
};

const disposableEmails = ["tempmail.com", "10minutemail.com", "guerrillamail.com"];

// ---------------- ELEMENTS ----------------
const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");

// ---------------- DROPDOWNS ----------------
document.getElementById("country").addEventListener("change", function () {
  const state = document.getElementById("state");
  const city = document.getElementById("city");

  if (locationData[this.value]) {
    Object.keys(locationData[this.value]).forEach((s) => {
      state.innerHTML += `<option value="${s}">${s}</option>`;
    });
  }
  validateForm();
});

document.getElementById("state").addEventListener("change", function () {
  const country = document.getElementById("country").value;
  const city = document.getElementById("city");

  city.innerHTML = `<option value="">Select City</option>`;
  if (locationData[country] && locationData[country][this.value]) {
    locationData[country][this.value].forEach((c) => {
      city.innerHTML += `<option value="${c}">${c}</option>`;
    });
  }
  validateForm();
});

// ---------------- PASSWORD STRENGTH ----------------
document.getElementById("password").addEventListener("input", function () {
  const strength = document.getElementById("strength");
  const value = this.value;

  strength.className = "strength-indicator";

  if (value.length >= 10 && /[A-Z]/.test(value) && /\d/.test(value)) {
    strength.textContent = "Strong";
    strength.style.color = "green";
  } else if (value.length >= 8) {
    strength.textContent = "Medium";
    strength.style.color = "orange";
  } else if (value.length > 0) {
    strength.textContent = "Weak";
    strength.style.color = "red";
  } else {
    strength.textContent = "";
  }
  validateForm();
});

// ---------------- VALIDATION ----------------
document.querySelectorAll("input, select, textarea").forEach((el) => {
  el.addEventListener("input", validateForm);
  el.addEventListener("change", validateForm);
});

function validateForm() {
  let valid = true;

  function check(id, msg) {
    const field = document.getElementById(id);
    const err = document.getElementById(id + "Err");
    if (!field.value.trim()) {
      field.classList.add("invalid");
      err.textContent = msg;
      valid = false;
    } else {
      field.classList.remove("invalid");
      err.textContent = "";
    }
  }

  check("fname", "First name required");
  check("lname", "Last name required");
  check("email", "Email required");
  check("phone", "Phone number required");
  check("country", "Country required");
  check("state", "State required");
  check("city", "City required");
  check("password", "Password required");
  check("confirmPassword", "Confirm password required");

  //phone number format
  const phone = document.getElementById("phone").value;
  const phonePattern = /^(?:\+\d{1,3}[\s-]?)?\d{10}$/;
  if (!phonePattern.test(phone)) {
    document.getElementById("phoneErr").textContent = "Phone Number must be 10 digits";
    valid = false;
  }
  // Email domain lett
  const email = document.getElementById("email").value;
  if (email.includes("@")) {
    const domain = email.split("@")[1];
    if (disposableEmails.includes(domain)) {
      document.getElementById("emailErr").textContent = "Disposable email not allowed";
      valid = false;
    }
  }

  // Password match
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");
  if (password.value !== confirmPassword.value) {
    document.getElementById("confirmPasswordErr").textContent = "Passwords do not match";
    valid = false;
  }

  // Gender
  if (!document.querySelector('input[name="gender"]:checked')) {
    document.getElementById("genderErr").textContent = "Select gender";
    valid = false;
  } else {
    document.getElementById("genderErr").textContent = "";
  }

  // Terms
  if (!document.getElementById("terms").checked) {
    document.getElementById("termsErr").textContent = "Accept Terms & Conditions";
    valid = false;
  } else {
    document.getElementById("termsErr").textContent = "";
  }

  submitBtn.disabled = !valid;
  return valid;
}

// ---------------- SUBMIT ----------------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  var a = 5;
  document.getElementById("successMsg").innerHTML = `
    <div class="success-content">
      <div class="success-icon">✓</div>
      <h3>Registration Successful!</h3>
      <h3>Thank you, <b>${document.getElementById("fname").value} ${document.getElementById("lname").value}</b></h3>
      <p>Your profile has been submitted successfully.</p>
      <h4 id="countdown">removes in ${a} seconds</h4>
    </div>
  `;

  form.reset();
  document.getElementById("strength").textContent = "";
  submitBtn.disabled = true;

  const timer = setInterval(function () {
    a--;
    if (a == 0) {
      clearInterval(timer);
      document.getElementById("successMsg").innerHTML = "";
    }
    document.getElementById("countdown").innerText = `removes in ${a} seconds`;
  }, 1000);
});
