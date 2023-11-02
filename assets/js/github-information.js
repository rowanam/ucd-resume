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
 * Create an html string with GitHub user repos
 * @param {*} repos - repos array fetched from GitHub
 * @returns html string
 */
function repoInformationHTML(repos) {
    // If no repos present, display this to user
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    // Create an array of the HTML strings for each repo
    let listItemsHTML = repos.map(function (repo) {
        return `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>
        `;
    });

    // Create formatted html string
    let html = `
        <div class="clearfix repo-list">
            <p><strong>Repo List:</strong></p>
            <ul>
                ${listItemsHTML.join("\n")}
            </ul>
        </div>
    `;

    return html;
}

/**
 * Get user and repo information from GitHub
 * @param {*} event 
 */
function fetchGitHubInformation(event) {
    // Clear display divs
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

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
        // Retrieve user information and repos from GitHub API
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        // If fetch successful, display formatted user info on page
        function (firstResponse, secondResponse) {
            let userData = firstResponse[0];
            let repoData = secondResponse[0];

            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        // If an error occurs, display error information
        function (errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `No info found for user ${username}`
                );
            } else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader("X-RateLimit-Reset") * 1000);
                $("#gh-user-data").html(
                    `Too many requests, please wait until ${resetTime.toLocaleTimeString()} to try again`
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

$(document).ready(function () {
    // Display default user github info
    fetchGitHubInformation();

    // Get the username input field
    const usernameInput = document.getElementById("gh-username");

    // Get and display GitHub info from API when site user presses enter
    usernameInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            fetchGitHubInformation(event);
        }
    });
});