/**
 * Created by ani41 on 11/5/2017.
 */
import React from 'react'
const VideoDetail = (props) => {
    if (!props.video) {
        return (
            <div>Loading...</div>
        );
    }
    else {
        const video = props.video;
        const videoId = video.id.videoId;
        const url = 'https://www.youtube.com/embed/' + videoId;

        return (
            <div className="video-detail col-md-8">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe src={url} className="embed-responsive-item">
                    </iframe>
                </div>
                <div className="details">
                    <div>{video.snippet.title}</div>
                    <div className="media-heading">{video.snippet.description}</div>
                </div>
            </div>
        );
    }
};
export default VideoDetail;