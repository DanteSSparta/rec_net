import img1 from '../static/img1.png';
import img2 from '../static/img2.png';
import img3 from '../static/img3.png';

export default function getImage(name){
  switch (name) {
    case 'img1.png':
      return img1;
    case 'img2.png':
      return img2;
    case 'img3.png':
      return img3;
    default:
      return null;
  }
}
