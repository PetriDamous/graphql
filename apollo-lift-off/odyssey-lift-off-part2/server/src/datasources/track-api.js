const { RESTDataSource } = require("apollo-datasource-rest");
class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  getTracksForHome() {
    return this.get("tracks");
  }

  getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }

  getTrack(id) {
    return this.get(`track/${id}`);
  }

  getModulesForTrack(id) {
    return this.get(`track/${id}/modules`);
  }

  incrementTrackViews(trackId) {
    return this.patch(`track/${trackId}/numberOfViews`);
  }
}

module.exports = TrackAPI;
