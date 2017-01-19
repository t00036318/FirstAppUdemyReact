import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = 'AIzaSyCp2t6MqAvmX4MtMGELFiG7BYsAJXq8gTE';
    
/*const App = () => {
    return (<div>
        <SearchBar />
    </div>);
}
*/
 
class App extends Component{
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('tokio hotel');
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term}, 
        videos => {
            this.setState({  
                videos,
                selectedVideo: videos[0]            
            });
        });
    }
    
    render(){
        const videoSearch = _.debounce( (term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
            </div>
        )
    }
};

ReactDOM.render(<App />, document.querySelector('.container'));
// <App /> = <App></App> It's a self-closing tag--> used in tags on JSX with nothing inside
// App on its own is a class. <App/> is an instance of that class