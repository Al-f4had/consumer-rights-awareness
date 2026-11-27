document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#complaint-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "status-message";

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete the required fields correctly.";
      status.style.color = "#b45309";
      return;
    }

    const formData = new FormData(form);
    const summary = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      issue: formData.get("issue"),
      date: formData.get("date"),
      details: formData.get("details").trim(),
      remedy: formData.get("remedy")
    };

    if (summary.details.length < 20) {
      status.textContent = "Please describe the issue in at least 20 characters.";
      status.style.color = "#b45309";
      return;
    }

    status.textContent = "Your summary is complete and valid. This demonstration does not submit or save it. Copy your details if you want to use them on an official channel.";
    status.style.color = "#087e59";
    console.info("ConsumerShield demo form validated. No data was transmitted.");
  });
});
