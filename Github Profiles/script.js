const URL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.querySelector(".search-input");

const getData = async (username) => {
    try {
        const res = await axios.get(URL + username);
        const data = await res.data;
        createCard(data);
        getRepos(username);
    } catch (err) {
        console.log(err);
        if (err) {
            createErrCard("Profile with this username doesn't exist");
        }
    }
};

const getRepos = async (username) => {
    try {
        const res = await axios.get(URL + username + "/repos");
        const repoData = await res.data;
        addRepos(repoData);
        console.log(repoData);
    } catch (err) {
        console.log(err);
        if (err) {
            console.log(err);
            createErrCard("Error while fetching repo");
        }
    }
};

const addRepos = (data) => {
    const reposEl = document.getElementById("repos");
    console.log("repo" + reposEl);
    data.slice(0, 5).forEach((repo) => {
        repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.target = "_blank";
        repoEl.href = repo.html_url;
        repoEl.innerText = repo.name;
        console.log("repo:  " + reposEl);
        reposEl.appendChild(repoEl);
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = search.value;
    if (userName) {
        getData(userName);
        search.value = "";
    }
});

const createCard = (userData) => {
    cardHTML = `
	<div class="card">
            <div class="img-container">
                <img src="${userData.avatar_url}" alt="${
        userData.login
    }" class="user-img">
            </div>

            <div class="info-container">
                <h2>${
                    userData.name != null ? userData.name : userData.login
                }</h2>
                <p class="bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sit sint ab velit in
                    consequatur exercitationem fugit magnam, fugiat beatae.</p>
                <ul>
                    <li>${userData.followers} <strong>Followers</strong></li>
                    <li>${userData.following} <strong>Following</strong></li>
                    <li>${
                        userData.public_repos
                    } <strong>Repositiories</strong></li>

                </ul>
                <div class="repos" id = "repos">

                </div>
            </div>

        </div>`;

    main.innerHTML = cardHTML;
};

const createErrCard = (msg) => {
    main.innerHTML = `
		<div class="card">
			<h1>${msg}</h1>
		</div>
	`;
};
