class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    const placeholder = {
      id: {
        videoId: '4ZAEBxGipoA'
      },
      snippet: {
        title: 'React JS Tutorial for Beginners - 1 - Introduction',
        description: 'My website - https://www.thenewboston.com/videos.php Have questions about the tutorial or React? Ask them here ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/4ZAEBxGipoA/default.jpg',
            width: 120,
            height: 90
          }
        },
      }
    };
    this.state = {videos: [placeholder], selectedVideo: placeholder, searchSTR: 'Pokemon'};
  }

  componentDidMount() {
    //this function will be called after render()
    this.searchHandler();
  }

  clickHandler(video) {
    this.setState({selectedVideo: video});
  }

  searchHandler() {
    $.get('https://www.googleapis.com/youtube/v3/search', {
      key: window.YOUTUBE_API_KEY,
      part: 'snippet',
      maxResults: 5,
      q: this.state.searchSTR,
      type: 'video',
      videoEmbeddable: true
    }, (data) => {
      this.setState({videos: data.items, selectedVideo: data.items[0]});
    });
  }

  inputHandler(string) {
    this.setState({searchSTR: string});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchHandler={this.searchHandler} inputHandler={this.inputHandler}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.selectedVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} listener={this.clickHandler}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;

ReactDOM.render(
  <App />,
  document.getElementById('app')
);