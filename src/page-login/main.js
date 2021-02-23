import 'normalize.css/normalize.css';
import '../css/dashboard.css';
import '../css/login.css';

import pic from '../img/StartPic.png';

window.document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-pic').setAttribute('src', pic);
});
