let APIURL = '';

switch(window.location.hostname) {
    case 'localhost':
        APIURL = 'http://localhost:3000';
        break;
    case 'lam-artGallery-client':
        APIURL = 'https://lam-art-gallery-client.herokuapp.com/'
}

export default APIURL;