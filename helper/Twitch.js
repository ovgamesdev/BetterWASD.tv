const HelperTwitch = {
  getUserID(username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        headers: {
          'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
          Accept: 'application/vnd.twitchtv.v5+json'
        },
        url: `https://api.twitch.tv/kraken/users?login=${username}`,
        success: (out) => {
          resolve(out.users);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(errorThrown)
        }
      });
    });

  },
  searchUser(username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        headers: {
          'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
          Accept: 'application/vnd.twitchtv.v5+json'
        },
        url: `https://api.twitch.tv/kraken/search/channels?query=${username}`,
        success: (out) => {
          resolve(out.channels);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(errorThrown)
        }
      });
    });
  }
}