import React from 'react';
import ReactDOM from  'react-dom';
import _ from 'lodash';
import SearchBar from './components/search-bar'
import VideoList from './components/video-list'
import VideoDetail from './components/video-detail'
import YTsearch from 'youtube-api-search'
const API_KEY = 'AIzaSyB0s6D6kPLq8hZArDie2ENEncfrNE8ZS30';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('trending');
    }

    videoSearch(term) {
        YTsearch({
            key: API_KEY, term: term
        }, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });

        });
    }

    render() {
        const videoSreach = _.debounce((term) => {
            this.videoSearch(term)
        }, 400);
        return (
            <div>
                <SearchBar onsearchTermChange={videoSreach}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo: selectedVideo})}
                           videos={this.state.videos}/>
            </div>);
    }
}
ReactDOM.render(<App />, document.querySelector('.container'));
