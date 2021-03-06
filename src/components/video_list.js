import React from "react";
import VideoListItem from "./video_list_item";

const VideoList = props => {
  const videoItems = props.videos.map(cur => {
    return (
      <VideoListItem
        onVideoClick={props.onVideoSelect}
        key={cur.etag}
        video={cur}
      />
    );
  });

  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
