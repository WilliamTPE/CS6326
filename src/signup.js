import React, { useEffect } from "react"
import { Link, useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';

function SignUpPage(){
    let navigate = useNavigate();
    useEffect(()=>{
        //there will be one span element for each input field
        // when the page is loaded, we create them and append them to corresponding input elements 
        // they are initially empty and hidden
        //------------------------------------------
        //pwd
        var pwd = document.getElementById("pwd");
        var span2 = document.createElement("span");
        span2.setAttribute("id", "pwdHint");
        span2.style.display = "none"; 
        pwd.parentNode.appendChild(span2);
        var span2Text = "Password should contain at least six characters";
        appendMessage(span2, span2Text);
        
        //confirm pwd
        var confirm = document.getElementById("confirm");
        var span3 = document.createElement("span");
        span3.setAttribute("id", "confirmHint");
        span3.style.display = "none"; 
        confirm.parentNode.appendChild(span3);
        var span3Text = "Password should match";
        appendMessage(span3, span3Text);
        //---functions-----
        //hint messages
        function appendMessage(span0, textMessage){
            var textNode = document.createTextNode(textMessage);
            span0.appendChild(textNode);
        }
       
        //pwd
        pwd.onfocus = function(){
            var curSpan = document.getElementById("pwdHint")
            curSpan.style.display = "block";
            curSpan.textContent = span2Text;
        }
        pwd.onblur = function(){
            var curSpan = document.getElementById("pwdHint")
            curSpan.style.display = "none";
            pwd.classList.remove("error");
        }
        //confirm
        confirm.onfocus = function(){
            var curSpan = document.getElementById("confirmHint")
            curSpan.style.display = "block";
            curSpan.textContent = span3Text;
        }
        confirm.onblur = function(){
            var curSpan = document.getElementById("confirmHint")
            curSpan.style.display = "none";
            confirm.classList.remove("error");
        }
    })
    function submitForm(e){
        //---submission validation---
        var form = document.getElementById("myForm");
        form.onsubmit = function(e){
            var flag = true;
            var pwd = document.getElementById("pwd");
            var confirm = document.getElementById("confirm");

            var pwdHintMsg = document.getElementById("pwdHint")
            var confirmHintMsg = document.getElementById("confirmHint")

            if(pwd.value.length < 6){
                pwdHintMsg.style.display = "block";
                pwdHintMsg.textContent = "Please enter a valid password!"
                pwd.classList.add("error");
                flag = false;
                e.preventDefault();
            }
            if(pwd.value !== confirm.value){
                confirmHintMsg.style.display = "block";
                confirmHintMsg.textContent = "Password does not match!"
                pwdHintMsg.style.display = "none";
                pwd.classList.add("error");
                confirm.classList.add("error");
                flag = false;
                e.preventDefault();
            }
            if (flag) { //if pass the check
                pwd.classList.remove('error');
                confirm.classList.remove('error');
                navigate("/");
                window.location.reload(false);//refresh page
                var username = document.getElementById("username").value
                localStorage.setItem('user', JSON.stringify(username));
            }

            return flag;
        }
    }
   
    return(
        <div>
            <div className="row" style={{marginTop:'5rem', marginBottom:'40rem'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6"> <h1>User Signup</h1>

                    <form id="myForm">
                        <div className="form-group">
                            <label for="username">UserName:</label>
                            <input type="text" className="form-control" placeholder="Name" id="username" style={{width:'40%', marginBottom:'1rem'}}/>
                        </div>

                        <div className="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" className="form-control" placeholder="Password" id="pwd" style={{width:'40%', marginBottom:'1rem'}}/>
                        </div>

                        <div className="form-group">
                            <label for="pwd">Confirm Password:</label>
                            <input type="password" className="form-control" placeholder="Password" id="confirm" style={{width:'40%', marginBottom:'1rem'}}/>
                        </div>

                        <div className="form-group form-check" style={{marginBottom:'1rem'}}>
                            <input type="checkbox" className="form-check-input" checked  id="agree"  />
                            <h5>I agree to the terms of service and privacy policy.</h5>
                        </div>
                        {/* <input type="submit" className="submitButton" value="Submit" style={{backgroundColor: '#6A79A6', border: '2px solid #6A79A6'}} /> */}
                        <Button className='signupButton' type="submit" variant="primary" onClick={submitForm} >Sign-up</Button>{' '}

                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}
export default SignUpPage;