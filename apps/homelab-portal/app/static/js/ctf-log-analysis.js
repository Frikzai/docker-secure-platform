document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#flag-form");
    const input = document.querySelector("#flag-input");
    const result = document.querySelector("#flag-result");

    if (!form || !input || !result) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        result.textContent = "Validation en cours...";
        result.classList.remove("success", "error");

        try {
            const response = await fetch("/api/ctf/log-analysis/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    flag: input.value,
                }),
            });

            const data = await response.json();

            result.textContent = data.message;
            result.classList.add(data.valid ? "success" : "error");
        } catch (error) {
            result.textContent = "Erreur lors de la validation du flag.";
            result.classList.add("error");
        }
    });
});
