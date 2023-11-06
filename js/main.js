// GET ELEMENT IN HTML****************************
const GITHUB_API_URL = 'https://api.github.com/users';
const TOKEN = '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';

const form = document.getElementById("form");
const input = document.getElementById("search-input");
const main = document.getElementById("main");

// FETCH TO URL FUNCTION**************************
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// USERNAME GET************************************
form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const inputValue = input.value.trim().toLowerCase();
    const GITHUB_LOGIN_SEARCH_URL = `https://api.github.com/search/users?q=${inputValue}`;

    const logins = await fetchData(GITHUB_LOGIN_SEARCH_URL, {
        method: 'GET',
        headers: {
            'Authorization': `token ${TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (logins.total_count === 0) {
        main.innerHTML = `<h3 class="error-message">User not found!</h3>`
    } else {
        const allUsers = await logins.items;
        renderUser(allUsers);
    }
    form.reset();
});

// RENDER 
function renderUser(usersData) {
    main.innerHTML = '';

    usersData.forEach(user => {
        const {
            avatar_url,
            login,
            html_url,
            id,
        } = user;

        const userCard = document.createElement('div');
        userCard.className = "card";

        const imgBox = document.createElement('div');
        const avatar = document.createElement('img');
        avatar.className = "avatar";
        avatar.src = avatar_url;
        avatar.alt = login;

        const userInfo = document.createElement('div');
        userInfo.className = "user-info";

        const userLogin = document.createElement('h2');
        userLogin.textContent = login;

        const toGithub = document.createElement('a');
        toGithub.href = html_url;
        toGithub.className = "to-github"
        toGithub.textContent = "Link to github";

        const userId = document.createElement('div');
        userId.textContent = id;

        imgBox.appendChild(avatar);
        userCard.appendChild(imgBox);
        userCard.append(userInfo);
        userInfo.appendChild(userLogin);
        userInfo.appendChild(toGithub)
        userInfo.appendChild(userId)

        main.appendChild(userCard);
    });
}

// DEFAULT RENDER USERS*****
fetchData(GITHUB_API_URL).then((data) => renderUser(data));