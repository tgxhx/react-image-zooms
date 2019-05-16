import React from 'react';
import ReactDOM from 'react-dom';
import './app.less';
import ImageZooms from '../../src';
import '../../src/image-zooms.less';

interface Props {}

interface States {}

class Dev extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="image-box">
          <ImageZooms
            src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            duration={300}
            imageBoxSize={600}
          />
          <ImageZooms
            src="http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/04/sentinel-1b_s_first_image/15966791-2-eng-GB/Sentinel-1B_s_first_image_fullwidth.jpg"
            duration={500}
            imageBoxSize={500}
          />
          <ImageZooms
            src="http://en.es-static.us/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg"
            duration={200}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Dev />, document.getElementById('app'));
