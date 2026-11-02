

// =========================
// MIND STRONG JAVASCRIPT
// =========================

console.log("Mind Strong JavaScript is working!");


// =========================
// RESOURCE SEARCH FUNCTION
// =========================

const resourceSearch = document.getElementById("resourceSearch");

const resourceCards = document.querySelectorAll(
    "#resourceCards .card"
);

const noResults = document.getElementById("noResults");

const searchMessage = document.getElementById("searchMessage");

if (resourceSearch) {

    resourceSearch.addEventListener("input", function () {

        const searchText = resourceSearch.value.toLowerCase().trim();

        let visibleCards = 0;

        resourceCards.forEach(function (card) {

            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {

                card.style.display = "";

                visibleCards++;

            } else {

                card.style.display = "none";

            }

        });

        // Display a message when no cards match
        if (noResults) {

            noResults.hidden = visibleCards !== 0;

        }

        // Display the number of matching resources
        if (searchMessage) {

            searchMessage.textContent =
                searchText === ""
                    ? ""
                    : visibleCards + " resource(s) found.";

        }

    });

}


// =========================
// FAQ ACCORDION FUNCTION
// =========================

const accordionButtons = document.querySelectorAll(
    ".accordion-question"
);

accordionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const answer = button.nextElementSibling;

        const isOpen = button.getAttribute("aria-expanded") === "true";

        // Close all answers first
        document.querySelectorAll(".accordion-answer").forEach(
            function (item) {

                item.style.display = "none";

            }
        );

        // Reset all question buttons
        accordionButtons.forEach(function (item) {

            item.setAttribute("aria-expanded", "false");

            const symbol = item.querySelector("span");

            if (symbol) {

                symbol.textContent = "+";

            }

        });

        // Open the selected answer
        if (!isOpen && answer) {

            answer.style.display = "block";

            button.setAttribute("aria-expanded", "true");

            const symbol = button.querySelector("span");

            if (symbol) {

                symbol.textContent = "-";

            }

        }

    });

});


// =========================
// IMAGE LIGHTBOX FUNCTION
// =========================

const lightbox = document.getElementById("imageLightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxTrigger = document.querySelector(".lightbox-trigger");

if (lightbox && lightboxImage && lightboxClose && lightboxTrigger) {

    // Open the lightbox when the visitor clicks the image
    lightboxTrigger.addEventListener("click", function (event) {

        event.preventDefault();

        // Get the large image from the link
        lightboxImage.src = lightboxTrigger.href;

        // Copy the image description
        const originalImage = lightboxTrigger.querySelector("img");

        lightboxImage.alt = originalImage.alt;

        // Display the lightbox
        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        // Prevent scrolling behind the lightbox
        document.body.style.overflow = "hidden";

        // Move keyboard focus to the close button
        lightboxClose.focus();

    });

    // Close the lightbox using the close button
    lightboxClose.addEventListener("click", function () {

        closeLightbox();

    });

    // Close the lightbox when clicking the dark background
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

    // Close the lightbox using the Escape key
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });

    // Function to close the lightbox
    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        // Allow the visitor to scroll again
        document.body.style.overflow = "";

        // Return focus to the original image link
        lightboxTrigger.focus();

    }

}


// =========================
// NETLIFY AJAX FORM FUNCTION
// =========================

async function submitNetlifyForm(form, responseElement, successMessage) {

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    // Show a loading message
    responseElement.textContent = "Submitting your message...";

    responseElement.hidden = false;

    // Prevent multiple submissions
    if (submitButton) {

        submitButton.disabled = true;

    }

    try {

        // Convert the form information into URL-encoded data
        const formData = new URLSearchParams(new FormData(form));

        // Submit the form using AJAX
        const response = await fetch("/", {

            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: formData.toString()

        });

        // Check whether Netlify accepted the submission
        if (!response.ok) {

            throw new Error("Form submission failed.");

        }

        // Display the success message
        responseElement.textContent = successMessage;

        // Clear the form after successful submission
        form.reset();

    } catch (error) {

        // Display an error if submission fails
        responseElement.textContent =
            "Sorry, your message could not be submitted. Please try again later.";

        console.error("Form error:", error);

    } finally {

        // Allow the visitor to submit again
        if (submitButton) {

            submitButton.disabled = false;

        }

    }

}


// =========================
// ENQUIRY FORM FUNCTION
// =========================

const enquiryForm = document.getElementById("enquiryForm");

const enquiryResponse = document.getElementById("enquiryResponse");

if (enquiryForm && enquiryResponse) {

    enquiryForm.addEventListener("submit", async function (event) {

        // Prevent the default form submission
        event.preventDefault();

        // Check that all required fields are valid
        if (!enquiryForm.checkValidity()) {

            enquiryForm.reportValidity();

            return;

        }

        // Get the selected enquiry topic
        const topic = document.getElementById("topic").value;

        // Select a response based on the enquiry topic
        let responseMessage = "";

        switch (topic) {

            case "general":

                responseMessage =
                    "Thank you for your general enquiry. Your message has been submitted successfully.";

                break;

            case "resources":

                responseMessage =
                    "Thank you for your interest in our mental health resources. Your enquiry has been submitted successfully.";

                break;

            case "support":

                responseMessage =
                    "Thank you for contacting us about support information. Your enquiry has been submitted successfully.";

                break;

            case "volunteer":

                responseMessage =
                    "Thank you for your interest in volunteering. Your enquiry has been submitted successfully.";

                break;

            case "sponsor":

                responseMessage =
                    "Thank you for your interest in sponsorship. Your enquiry has been submitted successfully.";

                break;

            case "feedback":

                responseMessage =
                    "Thank you for providing website feedback. Your enquiry has been submitted successfully.";

                break;

            default:

                responseMessage =
                    "Thank you. Your enquiry has been submitted successfully.";

        }

        // Submit the enquiry using Netlify Forms
        await submitNetlifyForm(
            enquiryForm,
            enquiryResponse,
            responseMessage
        );

    });

}


// =========================
// CONTACT FORM FUNCTION
// =========================

const contactForm = document.getElementById("contactForm");

const contactResponse = document.getElementById("contactResponse");

if (contactForm && contactResponse) {

    contactForm.addEventListener("submit", async function (event) {

        // Prevent the default form submission
        event.preventDefault();

        // Validate the form
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }

        // Get the selected message type
        const messageType = document.getElementById("messageType").value;

        // Prepare the confirmation message
        const responseMessage =
            "Thank you for contacting Mind Strong about " +
            messageType +
            ". Your message has been submitted successfully.";

        // Submit the contact message using Netlify Forms
        await submitNetlifyForm(
            contactForm,
            contactResponse,
            responseMessage
        );

    });

}
