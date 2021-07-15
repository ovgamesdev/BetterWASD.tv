const HelperTwitch = {
    getUserID(username) {
        return Helper.fetch('https://api.twitch.tv/kraken/users?login=' + username, {
            headers: {
                'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
                Accept: 'application/vnd.twitchtv.v5+json'
            }
        }).then((data) => {
            return data.users;
        });
    },
}