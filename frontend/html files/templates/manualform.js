document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 0;
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const form = document.getElementById("customForm");

    function showStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.style.display = index === step ? "block" : "none";
        });
    }

    nextBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (index < formSteps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    showStep(currentStep);

    document.getElementById("add-more").addEventListener("click", function () {
        const illnessContainer = document.getElementById("illness-forms");
        const newIllnessForm = document.createElement("div");
        newIllnessForm.classList.add("illness-form");

        newIllnessForm.innerHTML = `
            <label for="illness-name">Health Illness Name:</label>
            <input type="text" name="illness_name[]" required>

            <label for="illness-period">Illness Period:</label>
            <input type="date" name="illness_start[]" required> to 
            <input type="date" name="illness_end[]" required>

            <label for="expenditure">Expenditure on This Illness:</label>
            <input type="number" name="expenditure[]" required>

            <label for="bills">Upload Authorized Bills (if available):</label>
            <input type="file" name="bills[]">
        `;

        illnessContainer.appendChild(newIllnessForm);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission
        
        let formData = {};
        new FormData(form).forEach((value, key) => {
            if (!formData[key]) {
                formData[key] = value;
            } else {
                if (!Array.isArray(formData[key])) {
                    formData[key] = [formData[key]];
                }
                formData[key].push(value);
            }
        });

        localStorage.setItem("formData", JSON.stringify(formData)); // Store form data
        window.location.href = "manualform.html"; // Redirect to new page
    });
});
