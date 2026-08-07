import api from "../api/api";

const pollService = {
    createPoll(data) {
        return api.post("/polls", data);
    },

    getPoll(code) {
        return api.get(`/polls/${code}`);
    },

    vote(code, optionId, voterToken) {
        return api.post(`/polls/${code}/vote`, {
            optionId,
            voterToken
        });
    },

    getResults(code) {
        return api.get(`/polls/${code}/results`);
    },

    closePoll(code, creatorToken) {
        return api.post(`/polls/${code}/close`, {
            creatorToken
        });
    }
};

export default pollService;