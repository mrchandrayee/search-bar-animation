(() => {
  const demo = document.getElementById("search-demo");
  const trigger = document.getElementById("search-trigger");
  const input = document.getElementById("search-input");
  const clear = document.getElementById("clear-button");
  const suggestion = document.getElementById("suggestion");

  const examples = ["aurora", "design inspiration", "motion graphics", "creative studio"];

  function openSearch() {
    demo.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
    window.setTimeout(() => input.focus(), 260);
  }

  function closeSearch() {
    demo.classList.remove("open", "has-query");
    trigger.setAttribute("aria-expanded", "false");
    input.value = "";
    suggestion.textContent = "";
    trigger.focus();
  }

  function updateSuggestion() {
    const query = input.value.trim();
    demo.classList.toggle("has-query", query.length > 0);
    suggestion.textContent = query ? `try search — “${query}”` : "";
  }

  trigger.addEventListener("click", openSearch);
  input.addEventListener("input", updateSuggestion);
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") closeSearch();
    if (event.key === "Enter" && input.value.trim()) {
      suggestion.textContent = `searching — “${input.value.trim()}”`;
      input.blur();
    }
  });
  clear.addEventListener("click", closeSearch);
  document.addEventListener("pointerdown", event => {
    if (!demo.contains(event.target) && demo.classList.contains("open")) {
      demo.classList.remove("open", "has-query");
      trigger.setAttribute("aria-expanded", "false");
      input.value = "";
      suggestion.textContent = "";
    }
  });
  // A small rotating hint makes the idle state feel alive.
  let exampleIndex = 0;
  window.setInterval(() => {
    if (!demo.classList.contains("open")) {
      exampleIndex = (exampleIndex + 1) % examples.length;
      input.placeholder = `Search ${examples[exampleIndex]}...`;
    }
  }, 2600);
})();