import Swal from "sweetalert2";

export const showQuoteForm = (onSubmit) => {
  let nameInput, emailInput, phoneInput, countrySelect;

  Swal.fire({
    title: "REQUEST A QUOTE",
    html: `
      <div class="swal-custom-container">
        <p class="swal-sub-title">Enter your details to receive a custom configuration summary.</p>

        <div class="input-wrapper">
          <input type="text" id="swal-name" class="premium-input" placeholder="FULL NAME" />
        </div>

        <div class="input-wrapper">
          <input type="email" id="swal-email" class="premium-input" placeholder="EMAIL ADDRESS" />
        </div>

        <div class="phone-container">
          <select id="swal-country" class="premium-select">
            <option value="+1" selected>🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+92">🇵🇰 +92</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+91">🇮🇳 +91</option>
          </select>
          <input type="tel" id="swal-phone" class="premium-input phone-input" placeholder="PHONE NUMBER" />
        </div>
      </div>
    `,
    confirmButtonText: "SUBMIT REQUEST",
    showCancelButton: true,
    cancelButtonText: "CANCEL",
    reverseButtons: true,
    customClass: {
      popup: "premium-swal-popup",
      title: "premium-swal-title",
      confirmButton: "premium-confirm-btn",
      cancelButton: "premium-cancel-btn",
      validationMessage: "premium-validation-error"
    },
    buttonsStyling: false,
    focusConfirm: false,

    // ✅ DOM ready callback
    didOpen: () => {
      nameInput = document.getElementById("swal-name");
      emailInput = document.getElementById("swal-email");
      phoneInput = document.getElementById("swal-phone");
      countrySelect = document.getElementById("swal-country");
    },

    preConfirm: () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const country = countrySelect.value;

      if (!name || !email || !phone) {
        Swal.showValidationMessage("ALL FIELDS ARE REQUIRED");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9\s()\-]{7,15}$/;

      if (!emailRegex.test(email)) {
        Swal.showValidationMessage("INVALID EMAIL ADDRESS");
        return false;
      }

      if (!phoneRegex.test(phone)) {
        Swal.showValidationMessage("INVALID PHONE NUMBER");
        return false;
      }

      return { name, email, phone: country + " " + phone };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      onSubmit(result.value);
    }
  });
};