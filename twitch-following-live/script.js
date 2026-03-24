const CLIENT_ID = "xpanxsbrd1vpp9t4s1e7357vytvty0";
const REDIRECT_URI = "https://thommydude.github.io/twitch-following-live/";

const list = document.getElementById("streamList");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// --------------------
// AUTH
// --------------------

function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

const urlToken = getTokenFromUrl();
if (urlToken) {
  localStorage.setItem("twitch_token", urlToken);
  window.location.hash = ""; // clean URL
}

function getAccessToken() {
  return localStorage.getItem("twitch_token");
}

// --------------------
// LOGIN / LOGOUT
// --------------------

function login() {
  const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user:read:follows`;
  window.location.href = url;
}

function logout() {
  localStorage.removeItem("twitch_token");
  toggleLoginLogoutButtons();  // Show login button after logout
  list.innerHTML = "Logged out";
}

function toggleLoginLogoutButtons() {
  const token = getAccessToken();
  if (token) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
}

// --------------------
// FETCH LIVE CHANNELS FOLLOWED
// --------------------

async function loadStreams() {
  const token = getAccessToken();

  if (!token) {
    alert("Please log in first.");
    return;
  }

  list.innerHTML = "Loading...";

  try {
    const userResponse = await fetch(
        "https://api.twitch.tv/helix/users",
        {
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const userData = await userResponse.json();
    const userId = userData.data[0].id;

    const streamsResponse = await fetch(
        `https://api.twitch.tv/helix/streams/followed?user_id=${userId}`,
        {
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const streamsData = await streamsResponse.json();

    list.innerHTML = "";

    if (streamsData.data.length === 0) {
      list.innerHTML = "No live streams from channels you're following!";
    }
    
    streamsData.data.forEach(
        stream => {
            const li = document.createElement("li");
            li.className = "stream";

            const thumbnail = stream.thumbnail_url
                .replace("{width}", "300")
                .replace("{height}", "170");

            li.innerHTML = `
                <img src="${thumbnail}" alt="thumbnail" />
                <p><strong>${stream.user_name}</strong></p>
                <p>${stream.title}</p>
                <p>Category: ${stream.game_name}</p>
                <p>${stream.viewer_count} viewers</p>
                <a href="https://twitch.tv/${stream.user_login}" target="_blank">
                    Watch Stream
                </a>
                `;

            list.appendChild(li);
        }
    );

  } catch (err) {
      console.error(err);
      list.innerHTML = "Error loading streams";
  }
}

// --------------------
// INIT
// --------------------

document.addEventListener(
    "DOMContentLoaded",
    () => {
        toggleLoginLogoutButtons();
        const token = getAccessToken();
  
        if (token) {
            loadStreams();
        }
    }
);