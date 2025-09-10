// Basic form behavior & validation
document.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById('regForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const formMessage = document.getElementById('formMessage');

  // Profile picture toggle & preview
  const enablePic = document.getElementById('enablePic');
  const picArea = document.getElementById('picArea');
  const profilePic = document.getElementById('profilePic');
  const preview = document.getElementById('preview');

  enablePic.addEventListener('change', () => {
    picArea.classList.toggle('hidden', !enablePic.checked);
  });

  profilePic.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      preview.textContent = 'No image selected';
      preview.style.backgroundImage = '';
      return;
    }
    if (!f.type.startsWith('image/')) {
      preview.textContent = 'File is not an image';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(evt) {
      preview.innerHTML = '';
      const img = new Image();
      img.src = evt.target.result;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.objectFit = 'cover';
      preview.appendChild(img);
    };
    reader.readAsDataURL(f);
  });

  // simple client validation and submission simulation
  regForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    formMessage.textContent = '';

    // check built-in validity first
    if (!regForm.checkValidity()) {
      formMessage.textContent = 'Please fill required fields correctly.';
      regForm.reportValidity();
      return;
    }

    // password check
    if (password.value !== confirmPassword.value) {
      formMessage.textContent = 'Passwords do not match.';
      confirmPassword.focus();
      return;
    }
    if (password.value.length < 6) {
      formMessage.textContent = 'Password must be at least 6 characters.';
      password.focus();
      return;
    }

    // phone pattern check (10 digits)
    const phone = document.getElementById('phone');
    const phoneRe = /^\d{10}$/;
    if (!phoneRe.test(phone.value)) {
      formMessage.textContent = 'Phone must be 10 digits.';
      phone.focus();
      return;
    }

    // terms checkbox must be checked
    const agree = document.getElementById('agree');
    if (!agree.checked) {
      formMessage.textContent = 'You must agree to the terms and conditions.';
      agree.focus();
      return;
    }

    // simulate form submission -> create a summary (DO NOT send real data anywhere)
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: phone.value,
      location: document.getElementById('location').value,
      gender: regForm.gender.value,
      dob: document.getElementById('dob').value,
      country: document.getElementById('country').value
    };

    // show confirmation message
    formMessage.textContent = `Registration successful for ${data.name} (${data.email}).`;
    regForm.reset();
    picArea.classList.add('hidden');
    preview.innerHTML = 'No image selected';
  });

  // Reset handler to clear preview/message
  regForm.addEventListener('reset', () => {
    setTimeout(() => {
      formMessage.textContent = '';
      preview.innerHTML = 'No image selected';
      picArea.classList.add('hidden');
    }, 0);
  });
});
