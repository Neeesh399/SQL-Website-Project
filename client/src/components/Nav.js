import React from 'react';

function LoginButton(props){
    return (
      <button id="loginButton" onClick={() => {console.log("Test 1!")}}>Log In</button>
    ); 
  }
function SignUpButton(props){
return (
    <button id="signupButton" onClick={() => {console.log("Test 2!")}}>Sign Up</button>
);
}

class Topbar extends React.Component{
   
    render() {
        return (
        <div id="topbar">
            <h1 className="websiteTitle">Serve.</h1>
        </div>
        );
    }
}
export default Topbar;