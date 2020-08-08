import * as React from "react";
import styled from 'styled-components';

enum VideoStatus {
  Loaded,
  Playing,
  Paused,
  Ended
}

type State = {
  muted: boolean;
  videoStatus: VideoStatus;
  current: number;
  duration: number;
  width: number;
  height: number;
  showControls: boolean;
}

type Props = {
  path: string;
  type: string;
}

export class Video extends React.Component<Props, State> {
  private videoRef: React.RefObject<HTMLVideoElement>
  constructor(props: Props) {
    super(props);
    this.state = {
      muted: true,
      videoStatus: VideoStatus.Playing,
      current: 0,
      duration: 0,
      width: 0,
      height: 0,
      showControls: false,
    };
    this.videoRef = React.createRef();
  }

  setMetaData = (e: any) => {
    this.setState({
      duration: e.target!.duration as number,
      width: e.target!.width as number,
      height: e.target!.height as number
    });
  }

  handleTimeUpdate = (e: any) => {
    this.setState({
      current: e.target!.currentTime as number,
    });
  }

  toRenderableTime = (s: number) => {
    const sec = Math.floor(s);
    return '0:' + (sec >= 10 ? sec : '0' + sec);
  }

  handlePlay = () => {
    this.videoRef.current!.play()
    this.setState({ videoStatus: VideoStatus.Playing });
  }

  handleStop = () => {
    this.videoRef.current!.pause();
    this.setState({ videoStatus: VideoStatus.Paused });
  }

  handleEnded = () => {
    this.setState({ videoStatus: VideoStatus.Ended });
  }

  renderPlayingControlButton = (status: VideoStatus) => {
    switch (status) {
      case VideoStatus.Playing:
        return <PauseButton onClick={this.handleStop} />;
      case VideoStatus.Paused:
        return <PlayButton onClick={this.handlePlay} />;
      case VideoStatus.Ended:
        return <ReplayButton onClick={this.handlePlay} />;
      default:
        return null;
    }
  }


  render() {
    const { path, type } = this.props
    const { showControls, videoStatus, muted, current, duration } = this.state;
    return (
      <VideoWrapper
        onMouseOver={() => this.setState({ showControls: true })}
        onMouseLeave={() => this.setState({ showControls: false })}
      >
        <video
          autoPlay
          muted
          playsInline
          onLoadedMetadata={this.setMetaData}
          onEnded={this.handleEnded}
          onTimeUpdate={this.handleTimeUpdate}
          ref={this.videoRef}
          width="640"
          height="360"
        >
          <source src={path} type={type} />
          I'm sorry, your browser doesn't support HTML5 video in WebM with
          VP8/VP9 or MP4 with H.264.
        </video>
        {showControls && (
          <>
            <ControlsWrapper>
              {this.renderPlayingControlButton(videoStatus)}
              {muted ? (
                <MuteButton onClick={() => this.setState({ muted: false })} />
              ) : (
                  <NotMuteButton
                    onClick={() => this.setState({ muted: true })}
                  />
                )}
              <TimeBar>
                <span>{this.toRenderableTime(current)}</span>
                <span>/</span>
                <span>{this.toRenderableTime(duration)}</span>
              </TimeBar>
            </ControlsWrapper>
            <SeekBar />
            <Progress
              width={(current / duration) * 100 + '%'}
            />
          </>
        )}
      </VideoWrapper>
    );
  }
}

// styled components
const VideoWrapper = styled.div`
  position: relative;
  width: 640px;
  height: 360px;
`;

const ControlsWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 27px;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-start;
  align-items: center;
`;

const ControlButton = styled.div`
  margin: 0px 5px 0px 15px;
  width: 15px;
  height: 15px;
  display: block;
  position: relative;
  cursor: pointer;
  pointer-events: auto;
`;

const PlayButton = styled(ControlButton)`
  background: url("https://s.yimg.jp/bdv/yahoo/icons/premiumvision/play.png")
    50% 50% / contain no-repeat transparent;
  order: 1;
  width: 15px;
`;

const PauseButton = styled(ControlButton)`
  background: url("https://s.yimg.jp/bdv/yahoo/icons/premiumvision/stop.png")
    50% 50% / contain no-repeat transparent;
  order: 1;
  width: 15px;
`;

const ReplayButton = styled(ControlButton)`
  background: url("https://s.yimg.jp/bdv/yahoo/icons/premiumvision/replay.png")
    50% 50% / contain no-repeat transparent;
  order: 1;
  width: 15px;
`;

const MuteButton = styled(ControlButton)`
  background: url("https://s.yimg.jp/bdv/yahoo/icons/premiumvision/volume0.png")
    50% 50% / contain no-repeat transparent;
  order: 2;
  width: 25px;
`;
const NotMuteButton = styled(ControlButton)`
  background: url("https://s.yimg.jp/bdv/yahoo/icons/premiumvision/volume3.png")
    50% 50% / contain no-repeat transparent;
  order: 2;
  width: 25px;
`;

const TimeBar = styled.div`
  order: 3;
  color: #fff;
  display: flex;
  margin-left: auto;
  margin-right: 15px;
  font-size: 14px;

  > span {
    margin: 0px 5px 0px 0px;
  }
`;

const SeekBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 27px;
  height: 5px;
  width: 100%;
  background-color: #222;
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  bottom: 27px;
  height: 5px;
  width: ${(props: { width: string }) => props.width || "0%"};
  background-color: #555;
`;