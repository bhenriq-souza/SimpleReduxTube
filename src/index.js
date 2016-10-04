import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetails from './components/video-details';
const API_KEY = 'AIzaSyCoNfKUW2-64ATaE5mveL_1FjEjsNcCXh0';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          videos: [],
          selectedVideo: null
        };
        this.videoSearch('surfboards');
    }
    videoSearch(term){
      YTSearch({key: API_KEY, term: term}, (data) => {
        this.setState({
          videos: data,
          selectedVideo: data[0]
        }); //If I have the property name equals the argument name, I could say just this.setState({videos}) (ES6)
      });
    }
    render(){
      const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

      return(
          <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetails video={this.state.selectedVideo} />
            <VideoList
              onVideoSelect={selectedVideo => this.setState({selectedVideo: selectedVideo})}
              videos={this.state.videos} />
          </div>
      );
    }
}
ReactDOM.render(<App />, document.getElementById('container'));
