document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("payment-form");
  const payBtn = document.getElementById("pay-btn");
  let stripe = null;

  // 1. Fetch Stripe publishable key from backend config
  fetch("/api/config")
    .then((res) => {
      if (!res.ok) throw new Error("Could not load backend configurations.");
      return res.json();
    })
    .then((config) => {
      if (config.publishableKey) {
        stripe = Stripe(config.publishableKey);
      } else {
        console.error("Stripe Publishable Key is missing in server environment variables!");
      }
    })
    .catch((err) => {
      console.error("Initialization error:", err);
    });

  // 2. Handle form submission
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!stripe) {
      alert("Payment gateway is initializing. Please wait a moment and try again.");
      return;
    }

    const email = document.getElementById("emailField").value.trim();
    const name = document.getElementById("nameField").value.trim();
    const amountVal = document.getElementById("amountField").value;
    const description = document.getElementById("descriptionField").value.trim();

    const amount = parseFloat(amountVal);

    // Form inputs validation
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a positive payment amount (minimum $0.01).");
      return;
    }

    // Disable button to prevent double-submits
    const originalText = payBtn.innerHTML;
    payBtn.innerHTML = `<span>Processing payment...</span> <i class="bi bi-arrow-repeat spin"></i>`;
    payBtn.disabled = true;

    // Call checkout session API
    fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        amount,
        description,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errData) => {
            throw new Error(errData.error || "Failed to start payment checkout session.");
          });
        }
        return res.json();
      })
      .then((session) => {
        // Redirect to hosted Stripe checkout
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .catch((err) => {
        console.error("Redirection checkout error:", err);
        alert("Payment Error: " + err.message);
        payBtn.innerHTML = originalText;
        payBtn.disabled = false;
      });
  });
});
