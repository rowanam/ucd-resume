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
}