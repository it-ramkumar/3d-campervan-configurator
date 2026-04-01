import Swal from "sweetalert2";

export const showQuoteForm = (onSubmit) => {
  Swal.fire({
    title: "REQUEST A QUOTE",
    html: `
      <div class="swal-custom-container">
        <p class="swal-sub-title">Enter your details to receive a custom configuration summary.</p>

        <div class="input-wrapper">
          <input type="text" id="swal-name" class="premium-input" placeholder="FULL NAME" autocomplete="off" />
        </div>

        <div class="input-wrapper">
          <input type="email" id="swal-email" class="premium-input" placeholder="EMAIL ADDRESS" autocomplete="off" />
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
          <input type="tel" id="swal-phone" class="premium-input phone-input" placeholder="PHONE NUMBER" autocomplete="off" />
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

    preConfirm: () => {
      // ✅ Live Build Fix: Always fetch fresh values inside the hook
      const name = document.getElementById("swal-name").value.trim();
      const email = document.getElementById("swal-email").value.trim();
      const phone = document.getElementById("swal-phone").value.trim();
      const country = document.getElementById("swal-country").value;

      // Debugging: Live console pe check karne ke liye (Aap isse remove bhi kar sakte hain)

      if (!name || !email || !phone) {
        Swal.showValidationMessage("ALL FIELDS ARE REQUIRED");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage("INVALID EMAIL ADDRESS");
        return false;
      }

      // Live phone number validation ko simple rakha hai
      if (phone.length < 7) {
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