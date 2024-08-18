async function fetchDiscordStatus() {
  try {
    const response = await fetch("https://api.lanyard.rest/v1/users/374960413583998977");
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data);

    const statusContent = document.getElementById("discord-status");

    if (data.success) {
      const { activities, discord_status } = data.data;
      console.log("Activities:", activities);
      console.log("Discord Status:", discord_status);

      const activityName = activities[0].name;
      const activityState = activities[0].state;

      if (activityState){
        var activityStatus = activityName + ", " + activityState;
      } else {
        var activityStatus = activityName;
      }

      var status;
      if (discord_status === "dnd") {
        status = "rgb(243, 65, 67)";
      } else if (discord_status === "online") {
        status = "rgb(31, 164, 96)";
      } else if (discord_status === "idle") {
        status = "rgb(240, 177, 66)";
      } else {
        status = "rgb(128, 132, 141)";
      }

      var status_text;
      if (discord_status === "dnd") {
        if (activityStatus) {
          status_text = `Do Not Disturb - Playing: ${activityStatus}`;
        } else {
          status_text = "Do Not Disturb";
        }
      } else if (discord_status === "online") {
        if (activityStatus) {
          status_text = `Online - Playing: ${activityStatus}`;
        } else {
          status_text = "Online";
        }
      } else if (discord_status === "idle") {
        status_text = "Idle";
      } else {
        status_text = "Offline";
      }

      statusContent.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="${status}" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                </svg>
                <p id="discord-status-text">${status_text}</p>
            `;
    } else {
      statusContent.innerHTML = "Failed to load Discord status.";
    }
  } catch (error) {
    console.error("Error fetching Discord status:", error);
    document.getElementById("discord-status-content").innerHTML = "Error loading Discord status.";
  }
}

fetchDiscordStatus();
