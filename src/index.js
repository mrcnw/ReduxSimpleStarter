import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
// API
import YTSearch from "youtube-api-search";
// components
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyA3jJwhjI_xh_co1lc-KUaFl756uVyBsc4";

// create a new component which generate HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    // initial value, default
    this.videoSearch("surfboards");
  }

  // fetching data from API, term will be string
  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// take this component and put in the DOM
ReactDOM.render(<App />, document.querySelector(".container"));
