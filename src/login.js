import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';


function LoginPage() {
    let navigate = useNavigate();

    useEffect(() => {
        //user
        var user = document.getElementById("username");
        var span = document.createElement("span");
        span.setAttribute("id", "usernameHint");
        span.style.display = "none";
        user.parentNode.appendChild(span);
        //pwd
        var pwd = document.getElementById("pwd");
        var span2 = document.createElement("span");
        span2.setAttribute("id", "pwdHint");
        span2.style.display = "none";
        pwd.parentNode.appendChild(span2);
    })

    function submitForm(e) {
        var username = document.getElementById("username").value
        // console.log(username)
        var pwd = document.getElementById("pwd").value
        localStorage.setItem('user', JSON.stringify(username));
        var usernameHintMsg = document.getElementById("usernameHint")
        usernameHintMsg.style.display = "none";
        if (username.length < 1) {
            usernameHintMsg.style.display = "block";
            usernameHintMsg.textContent = "Please enter a valid username!"
            e.preventDefault();
        }
        var pwdHintMsg = document.getElementById("pwdHint")
        pwdHintMsg.style.display = "none";
        if (pwd.length < 6) {
            pwdHintMsg.style.display = "block";
            pwdHintMsg.textContent = "Please enter a valid password, which is at least 6-character long!"
            e.preventDefault();
        }
        if (username.length >= 1 && pwd.length >= 6) {
            navigate("/");
            window.location.reload(false);//refresh page
        }
    }
    return (
        <div>
            <div className="row" style={{ marginTop: '5rem', marginBottom: '40rem' }}>
                <div className="col-md-3"></div>
                <div className="col-md-6"> <h1>User Login</h1>
                    <form id="myForm">
                        <div className="form-group">
                            <label for="Username">Username:</label>
                            <input type="text" className="form-control" placeholder="Username" id="username" style={{ width: '40%', marginBottom: '1rem' }} />
                        </div>
                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" placeholder="Password" id="pwd" style={{ width: '40%', marginBottom: '1rem' }} />
                        </div>
                        {/* <input type="submit" className="btn btn-warning" value="Login" style={{ margin: 20 }} onClick={submitForm}/> */}
                        <Button className='signupButton' type="submit" variant="primary" onClick={submitForm} >Login</Button>{' '}
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );

}

export default LoginPage;
