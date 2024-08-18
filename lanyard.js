const config = {
  DISCORD_USER_ID: "374960413583998977",
  API_URL: "api.lanyard.rest",
  HEARTBEAT_INTERVAL: 30000,
};

class LanyardManager {
  constructor() {
    this.socket = null;
    this.heartbeatInterval = null;
    this.statusContent = document.getElementById("discord-status");
  }

  init() {
    this.connectWebsocket();
  }

  connectWebsocket() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

    this.socket = new WebSocket(`wss://${config.API_URL}/socket`);

    this.socket.addEventListener("open", this.handleSocketOpen.bind(this));
    this.socket.addEventListener("message", this.handleSocketMessage.bind(this));
    this.socket.addEventListener("close", this.connectWebsocket.bind(this));
  }

  // future use - if you want to disconnect from the websocket for whatever reason (i.e error handling)
  // disconnect() {
  //     if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

  //     if (this.socket) {
  //         this.socket.removeEventListener("close", this.connectWebsocket);
  //         this.socket.close();
  //     }
  // }

  handleSocketOpen() {
    this.socket.send(
      JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: config.DISCORD_USER_ID,
        },
      })
    );

    this.heartbeatInterval = setInterval(() => {
      this.socket.send(JSON.stringify({ op: 3 }));
    }, config.HEARTBEAT_INTERVAL);
  }

  handleSocketMessage({ data }) {
    const { t, d } = JSON.parse(data);
    if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
      this.updateStatus(d);
    }
  }

  updateStatus(data) {
    if (!data) return;

    const { activities, discord_status } = data;
    const activity = activities[0];
    const activityStatus = activity ? `${activity.name}${activity.state ? `, ${activity.state}` : ""}` : "";

    const statusColours = {
      dnd: "rgb(243, 65, 67)",
      online: "rgb(31, 164, 96)",
      idle: "rgb(240, 177, 66)",
      offline: "rgb(128, 132, 141)",
    };

    const statusText = this.getStatusText(discord_status, activityStatus);
    const statusColour = statusColours[discord_status] || statusColours.offline;

    this.updateStatusDisplay(statusColour, statusText);
  }

  getStatusText(status, activityStatus) {
    const statusMap = {
      dnd: "Do Not Disturb",
      online: "Online",
      idle: "Idle",
      offline: "Offline",
    };

    // nit: prioritize showing activity over status instead of displaying both in the status text
    // you're kinda duplicating yourself considering the status colour already informs the user of your status
    // so if you're dnd and playing a game like vsc for example, just show 'Playing Visual Studio Code' instead of 'Do Not Disturb - Playing Visual Studio Code'
    let text = statusMap[status] || "Offline";
    if (activityStatus) {
      text += ` - Playing ${activityStatus}`;
    }

    return text;
  }

  updateStatusDisplay(colour, text) {
    this.statusContent.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="${colour}" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
        </svg>
        <p id="discord-status-text">${text}</p>
    `;
  }
}

const discordStatus = new LanyardManager();
discordStatus.init();
