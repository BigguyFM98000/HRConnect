// Import the Cloudinary classes. 
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';

const myImage = new CloudinaryImage('sample', {cloudName: 'fullstackapps'}).resize(fill().width(100).height(150));

const ProfileImage = () => {

  // Render the image in a React component.
  return (
    <div>
      <img src={myImage} />
    </div>
  )
}


  export default ProfileImage;