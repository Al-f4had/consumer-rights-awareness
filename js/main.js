document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const themeButton = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("consumershield-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-theme");

  const updateThemeLabel = () => {
    if (!themeButton) return;
    const dark = document.body.classList.contains("dark-theme");
    themeButton.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    themeButton.title = dark ? "Switch to light theme" : "Switch to dark theme";
  };
  updateThemeLabel();

  themeButton?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("consumershield-theme", theme);
    updateThemeLabel();
  });

  const rightsGrid = document.querySelector("#rights-grid");
  const searchInput = document.querySelector("#rights-search");
  const rightsStatus = document.querySelector("#rights-status");

  if (rightsGrid) {
    fetch("xml/consumer-rights.xml")
      .then((response) => {
        if (!response.ok) throw new Error("XML file could not be loaded.");
        return response.text();
      })
      .then((xmlText) => {
        const xml = new DOMParser().parseFromString(xmlText, "application/xml");
        if (xml.querySelector("parsererror")) throw new Error("The XML file is not well-formed.");

        const rights = [...xml.querySelectorAll("right")].map((item) => ({
          id: item.getAttribute("id"),
          title: item.querySelector("title")?.textContent ?? "",
          description: item.querySelector("description")?.textContent ?? "",
          example: item.querySelector("example")?.textContent ?? "",
          icon: item.querySelector("icon")?.textContent ?? "✓"
        }));

        if (!rights.length) throw new Error("No rights were found in the XML file.");
        const renderRights = (query = "") => {
          const filtered = rights.filter((right) =>
            [right.title, right.description, right.example].join(" ").toLowerCase().includes(query.toLowerCase())
          );
          rightsGrid.innerHTML = filtered.map((right) => `
            <article class="right-card">
              <span class="right-number">${String(right.id).padStart(2, "0")}</span>
              <div class="right-card-icon" aria-hidden="true">${escapeHTML(right.icon)}</div>
              <h3>${escapeHTML(right.title)}</h3>
              <p>${escapeHTML(right.description)}</p>
              <p class="example"><strong>Example:</strong> ${escapeHTML(right.example)}</p>
            </article>`).join("");
          if (rightsStatus) rightsStatus.textContent = filtered.length
            ? `Showing ${filtered.length} of ${rights.length} consumer rights.`
            : "No matching rights found. Try another keyword.";
        };
        renderRights();
        searchInput?.addEventListener("input", (event) => renderRights(event.target.value.trim()));
      })
      .catch((error) => {
        console.warn("ConsumerShield XML:", error.message);
        if (rightsStatus) rightsStatus.textContent = "Showing the built-in rights information. XML loading is available when the site is served through a web server.";
        if (searchInput) {
          searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            rightsGrid.querySelectorAll(".right-card").forEach((card) => {
              card.hidden = !card.textContent.toLowerCase().includes(query);
            });
          });
        }
      });
  }

  document.querySelectorAll("[data-accordion-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      if (panel) panel.hidden = expanded;
    });
  });
});

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}
