import React from "react";
import './footer.css'
import { Navbar, Container } from 'react-bootstrap';


const FooterPage = () => {
    return (
        <Navbar className='main-footer' collapseOnSelect expand="sm" bg="#FFFFFF" variant="light">
            <Container >
                <div className="row">
                    {/* Col 1 */}
                    <div className="social ">
                        <img className="img-footer-logo" width="50px" height="50px" src="/img/logo.png" alt="a logo" />
                        <ul className="list-unstyled">
                            <h6 className="buy">  Buying a satisfying house</h6>
                            <li className="icon">
                                <img className="img-responsive" width="24px" height="24px" src="/img/figmaIcon.png" alt="a logo" />
                                <img className="img-responsive" width="24px" height="24px" src="/img/twitterIcon.png" alt="a logo" />
                                <img className="img-responsive" width="24px" height="24px" src="/img/insIcon.png" alt="a logo" />
                            </li>
                        </ul>
                    </div>
                    {/* Col 2 */}
                    <div className="alllink">
                        <h5 > COMPANY </h5>
                        <ul className="list-unstyled">
                            <li ><a className="list-item-text" href="#a"> About </a></li>
                            <li ><a className="list-item-text" href="#a"> Blog </a></li>
                            <li ><a className="list-item-text" href="#a"> Twitter </a></li>
                        </ul>
                    </div>
                    {/* Col 3 */}
                    <div className="alllink ">
                        <h5 > PRODUCT </h5>
                        <ul className="list-unstyled">
                            <li ><a className="list-item-text" href="#a"> Pricing </a></li>
                            <li ><a className="list-item-text" href="#a"> Features </a></li>
                            <li ><a className="list-item-text" href="#a"> Templates </a></li>
                        </ul>
                    </div>
                    {/* Col 4 */}
                    <div className="alllink ">
                        <h5 > RESOURCES </h5>
                        <ul className="list-unstyled">
                            <li ><a className="list-item-text" href="#a"> Support </a></li>
                            <li ><a className="list-item-text" href="#a"> Terms </a></li>
                            <li ><a className="list-item-text" href="#a"> Privacy </a></li>
                        </ul>
                    </div>
                    {/* Footer Bottom
                    <div className="footer-bottom">
                        <p className="text-xs-center">
                            &copy; {new Date().getFullYear()} HouseHero - All Rights Reserved
                        </p>
                    </div> */}
                </div>
            </Container>

        </Navbar>

    );
}

export default FooterPage;