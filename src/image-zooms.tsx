import * as React from 'react';
import classnames from 'classnames';

interface Props {
  src: string;
  // ms
  duration: number;
  // px
  imageBoxSize: number;
}

interface States {
  show: boolean;
  addClass: boolean;
  boxStyle: React.CSSProperties;
  imageTransition: boolean;
  supportObjectFit: boolean;
}

export default class ImageZooms extends React.Component<Props, States> {
  imageBox: React.RefObject<HTMLDivElement>;
  sourceImage: React.RefObject<HTMLImageElement>;
  state: States = {
    show: false,
    addClass: false,
    boxStyle: {
      width: '0px',
      height: '0px',
      top: 0,
      left: 0,
    },
    imageTransition: false,
    supportObjectFit: true,
  };

  static defaultProps: Partial<Props> = {
    duration: 300,
    imageBoxSize: 500,
  };

  constructor(props: Props) {
    super(props);
    this.imageBox = React.createRef();
    this.sourceImage = React.createRef();
  }

  componentDidMount(): void {
    this.detectObjectFit();
  }

  detectObjectFit() {
    if (!('objectFit' in document.documentElement.style)) {
      this.setState({
        supportObjectFit: false,
      });
    }
  }

  toggleZooms = (status: boolean) => {
    const { duration } = this.props;
    if (status) {
      this.setState(
        {
          show: status,
        },
        () => {
          this.setBoxStyle();
          this.setState({
            addClass: status,
            imageTransition: true,
          });
        }
      );
    } else {
      this.setState(
        {
          addClass: status,
        },
        () => {
          setTimeout(
            () =>
              this.setState({
                show: status,
              }),
            duration
          );
        }
      );
    }
  };

  setBoxStyle = () => {
    let newBoxStyle = {};
    const styles = window.getComputedStyle(this.sourceImage.current!);
    const { width, height } = styles;
    if (width && height) {
      newBoxStyle = {
        width,
        height,
      };
    }

    const { top, left } = this.sourceImage.current!.getBoundingClientRect();
    newBoxStyle = {
      ...newBoxStyle,
      top,
      left,
    };

    this.setState({
      boxStyle: newBoxStyle,
    });
  };

  setBoxTransition(
    imageBoxStyles: Partial<React.CSSProperties>,
    seconds: number
  ) {
    const { imageTransition } = this.state;
    if (imageTransition) {
      imageBoxStyles.transition = `transform ${seconds}s`;
    }
  }

  setBoxTransform(imageBoxStyles: Partial<React.CSSProperties>) {
    const { addClass } = this.state;
    if (addClass) {
      let { imageBoxSize } = this.props;
      let { left, top, width, height } = imageBoxStyles;
      left = parseInt(left as string);
      top = parseInt(top as string);
      width = parseInt(width as string);
      height = parseInt(height as string);
      // target = imageLeft+ (sourceImageWidth - imageWidth) / 2 + diffWidth
      // 756 = 408 + (400 - 175) / 2 + diff
      const diffWidth =
        (document.documentElement.clientWidth - imageBoxSize) / 2 -
        left +
        (imageBoxSize - width) / 2;
      const diffheight =
        (document.documentElement.clientHeight - imageBoxSize) / 2 -
        top +
        (imageBoxSize - height) / 2;

      let scale;
      if (width <= height) {
        scale = imageBoxSize / height;
      } else {
        scale = imageBoxSize / width;
      }
      imageBoxStyles.transform = `translate3d(${diffWidth}px, ${diffheight}px, 0) scale3d(${scale}, ${scale}, 1)`;
    }
  }

  setBoxBackground(imageBoxStyles: Partial<React.CSSProperties>) {
    const { supportObjectFit } = this.state;
    const { src } = this.props;
    if (!supportObjectFit && src) {
      const imageUrl = src;
      if (imageUrl) {
        imageBoxStyles.backgroundImage = `url('${imageUrl}')`;
      }
    }
  }

  render() {
    const { show, addClass, boxStyle, supportObjectFit } = this.state;
    const { duration, src } = this.props;
    const seconds = duration / 1000;
    const imageBoxStyles: Partial<React.CSSProperties> = {
      ...boxStyle,
    };
    this.setBoxTransition(imageBoxStyles, seconds);
    this.setBoxTransform(imageBoxStyles);
    this.setBoxBackground(imageBoxStyles);
    return (
      <div className={classnames(['react-image-zooms', { show: show }])}>
        <div
          className="react-image-zooms-box"
          onClick={() => this.toggleZooms(true)}>
          <img src={src} alt="image" ref={this.sourceImage} />
        </div>
        {show && (
          <div
            className={classnames([
              'react-image-zooms-layer',
              {
                show: show,
                fadeIn: addClass,
              },
            ])}
            style={{ transition: `background-color ${seconds}s` }}
            onClick={() => this.toggleZooms(false)}
            onAnimationEnd={() => {}}>
            <div
              className={classnames(['react-image-zooms-layer-box'])}
              style={imageBoxStyles}
              ref={this.imageBox}>
              {supportObjectFit && (
                <img
                  className="react-zooms-image"
                  src={src}
                  alt="zooms-image"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
