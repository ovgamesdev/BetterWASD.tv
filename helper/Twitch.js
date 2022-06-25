const HelperTwitch = {
  "Client-ID": "iteua36t3bn764geiij8px2tr5w5bl",
  getUserID(username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        headers: {
          "Client-ID": HelperTwitch["Client-ID"],
          Authorization: "Bearer " + Cookies.get("BetterWASYA_access_token"),
        },
        url: `https://api.twitch.tv/helix/users?login=${username}`,
        success: (out) => {
          resolve(out.data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(
            `${jqXHR.responseJSON.error}: ${jqXHR.responseJSON.message} ${
              jqXHR.responseJSON.error == "Unauthorized" ? "(Авторизуйтесь с помощью Twicth)" : ""
            }`
          );
        },
      });
    });
  },
  searchUser(username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        headers: {
          "Client-ID": HelperTwitch["Client-ID"],
          Authorization: "Bearer " + Cookies.get("BetterWASYA_access_token"),
        },
        url: `https://api.twitch.tv/helix/search/channels?query=${username}`,
        success: (out) => {
          resolve(out.channels);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(jqXHR.responseJSON.error + ": " + jqXHR.responseJSON.message);
        },
      });

      resolve([]);
    });
  },
};
