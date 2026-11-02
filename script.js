
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

        // Prevent the link from opening the image separately
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
// ENQUIRY FORM FUNCTION
// =========================

const enquiryForm = document.getElementById("enquiryForm");

const enquiryResponse = document.getElementById("enquiryResponse");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        // Prevent the default form submission
        event.preventDefault();


        // Check that all required fields are valid
        if (!enquiryForm.checkValidity()) {

            enquiryForm.reportValidity();

            return;

        }


        // Get the information entered by the visitor
        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const topic = document.getElementById("topic").value;

        const message = document.getElementById("message").value.trim();


        // Select a response based on the enquiry topic
        let responseMessage = "";

        switch (topic) {

            case "general":

                responseMessage =
                    "Thank you for your general enquiry. Your message is ready to be sent.";

                break;

            case "resources":

                responseMessage =
                    "Thank you for your interest in our mental health resources. Your enquiry is ready to be sent.";

                break;

            case "support":

                responseMessage =
                    "Thank you for contacting us about support information. Your enquiry is ready to be sent.";

                break;

            case "volunteer":

                responseMessage =
                    "Thank you for your interest in volunteering. Your enquiry is ready to be sent.";

                break;

            case "sponsor":

                responseMessage =
                    "Thank you for your interest in sponsorship. Your enquiry is ready to be sent.";

                break;

            case "feedback":

                responseMessage =
                    "Thank you for providing website feedback. Your enquiry is ready to be sent.";

                break;

        }


        // Display the response on the website
        enquiryResponse.textContent = responseMessage;

        enquiryResponse.hidden = false;


        // Prepare the email information
        const recipient = "mindstrong@gmail.com";

        const subject = "Mind Strong Enquiry - " + topic;

        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Enquiry Topic: " + topic + "\n\n" +
            "Message:\n" + message;


        // Create an email link
        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);


        // Open the visitor's default email application
        window.location.href = mailtoLink;

    });

}


// =========================
// CONTACT FORM FUNCTION
// =========================

const contactForm = document.getElementById("contactForm");

const contactResponse = document.getElementById("contactResponse");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent the default form submission
        event.preventDefault();


        // Validate the form
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // Collect visitor information
        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const phone = document.getElementById("contactPhone").value.trim();

        const messageType = document.getElementById("messageType").value;

        const message = document.getElementById("contactMessage").value.trim();


        // Prepare the email
        const recipient = "mindstrong@gmail.com";

        const subject = "Mind Strong Contact Message - " + messageType;

        const emailBody =
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Telephone: " + (phone || "Not provided") + "\n" +
            "Message Type: " + messageType + "\n\n" +
            "Message:\n" + message;


        // Create the email link
        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(emailBody);


        // Display confirmation message
        contactResponse.textContent =
            "Your message has been prepared. Your email application will open so you can send it.";

        contactResponse.hidden = false;


        // Open the visitor's email application
        window.location.href = mailtoLink;

    });

}
