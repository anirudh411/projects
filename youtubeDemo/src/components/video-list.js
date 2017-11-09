/**
 * Created by ani41 on 11/5/2017.
 */
import React from 'react';
import VideoListItem from './video-list-item';

const VideoList = (props) => {
    const items = props.videos.map((video) => {
        return ( <VideoListItem
            onVideoSelect={props.onVideoSelect}
            key={video.etag}
            video={video}/>);
    });
    return ( <ul className="col-md-4 list-group">
        {items}
    </ul>);
};
export default VideoList;