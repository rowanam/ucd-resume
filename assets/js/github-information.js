// Get the username input field
const usernameInput = document.getElementById("gh-username");

// Get GitHub user information from API when site user presses enter
usernameInput.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        fetchGitHubInformation(event);
    }
});

/**
 * Create an html string with GitHub user information
 * @param {*} user - JSON user object fetched from GitHub
 * @returns html string
 */
function userInformationHTML(user) {
    let html = `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>
    `;

    return html;
}

/**
 * Get user information from GitHub
 * @param {*} event 
 */
function fetchGitHubInformation(event) {
    let username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html(`Please enter a GitHub username`);
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>`);

    $.when(
        // Retrieve user information from GitHub API
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        // If fetch successful, display formatted user info on page
        function (response) {
            let userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        },
        // If an error occurs, display error information
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `No info found for user ${username}`
                );
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `Error: ${errorResponse.responseJSON.message}`
                );
            }
        }
    );
}