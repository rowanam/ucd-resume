$(document).ready(function () {
    emailjs.init("1pT7fYLZCwCWXPunk");
});

function sendMail(contactForm) {
    emailjs.send("service_he9sb38", "template_z7dnbie", {
            from_name: contactForm.name.value,
            from_email: contactForm.email.value,
            message: contactForm.projectsummary.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                contactForm.name.value = "";
                contactForm.email.value = "";
                contactForm.projectsummary.value = "";

                // Display success message that clears after 10s
                $("#submitmessage").html(
                    `<p>Your message has been sent.</p>`
                );
                setTimeout(function () {
                    $("#submitmessage").html(``);
                }, 10000);
            },
            function (error) {
                console.log("FAILED", error);

                // Display send failure message
                $("#submitmessage").html(
                    `<p>Sorry, there's been an error and the message couldn't be sent. Please try again or contact me using one of the social media links below.</p>`
                );
            }
        );

    return false; // To block from loading a new page
}