import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetails, VideoList } from './components'; //the index file directs this to 

import youtube from './api/youtube'; //reference to axios instance

class App extends React.Component {
    state = {
        videos : [],
        selectedVideo : null,
    }


    componentDidMount() {
        this.handleSubmit('javascript mastery youtube clone');
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
        params: {
            part: 'snippet', //return videos as stated in docs
            maxResults: 5, 
            key: 'AIzaSyAOUdG_jUlBSbkwT2YRGUoP3FT4YBaArhw',
            q: searchTerm,
        }
    });
    this.setState({ videos : response.data.items, selectedVideo: response.data.items[0] });
};


    onVideoSelect = (video) => {
        this.setState({ selectedVideo : video})
    }

    render(){
        const {selectedVideo, videos } = this.state
        return (
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetails video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App; 