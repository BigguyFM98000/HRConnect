import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const [user, setUser] = useState({});
  const [familyname, setFamilyName] = useState('');
  const [givenname, setGivenName] = useState('');
  const [picture, setPicture] = useState('');
  const navigate = useNavigate();

  const successLogin = (response) => {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    setGivenName(userObject.given_name);
    setFamilyName(userObject.family_name);
    setPicture(userObject.picture);
    navigate('/welcome');
  };

  useEffect(() => {
    // console.log(...user);
    console.log(givenname);
    console.log(familyname);
    console.log(picture);
    localStorage.setItem("given_name", givenname);
    localStorage.setItem("family_name", familyname);
    localStorage.setItem("picture", picture);
  }, []);

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => successLogin(credentialResponse)}
      /* {credential: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM5YWZkYTM2ODJlYmYwOW…JwW89WzJpPWBwn9H5riYdsNSDIXHx2CBv1VZNmUJZzSWmbbsw', clientId: '1090611813560-vkabsu4t7seet7aqk9p9d4brifq58c4r.apps.googleusercontent.com', select_by: 'btn_add_session'} */
      onError={() => {
        console.log('Login Failed');
      }}
    />
  )
}

export default GoogleSignIn;