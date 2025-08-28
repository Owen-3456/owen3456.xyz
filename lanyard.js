const config = {
  DISCORD_USER_ID: "374960413583998977",
  API_URL: "api.lanyard.rest",
  HEARTBEAT_INTERVAL: 30000,
};

class LanyardManager {
  constructor() {
    this.socket = null;
    this.heartbeatInterval = null;
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

    const statusText = this.getStatusText(discord_status, activityStatus);
    this.updateStatusDisplay(discord_status, statusText);
  }

  getStatusText(status, activityStatus) {
    const statusMap = {
      dnd: "Do Not Disturb",
      online: "Online",
      idle: "Idle",
      offline: "Offline",
    };

    let text = statusMap[status] || "Offline";
    if (activityStatus) {
      text += ` - ${activityStatus}`;
    }

    return text;
  }

  updateStatusDisplay(status, text) {
    const statusElement = document.getElementById("discord-status");
    const statusTextElement = document.getElementById("discord-status-text");

    if (statusElement && statusTextElement) {
      // Update status class for indicator color
      statusElement.className = `status ${status}`;
      statusTextElement.textContent = text;
    }
  }
}

const discordStatus = new LanyardManager();
discordStatus.init();
