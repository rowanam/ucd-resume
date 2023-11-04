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
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );

    return false; // To block from loading a new page
}