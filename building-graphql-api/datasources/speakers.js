const { RESTDataSource } = require("apollo-datasource-rest");

class SpeakerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/speakers";
  }

  getSpeakers() {
    return this.get("/");
  }

  getSpeakerById(id) {
    return this.get(`/${id}`);
  }
}

module.exports = SpeakerAPI;
