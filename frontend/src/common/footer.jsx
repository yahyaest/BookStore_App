import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
  return (
    <MDBFooter color="red darken-1" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="8">
            <h5 className="title">Social Links</h5>
            <p>CONNECT</p>
            <a
              className="footer__socialLink"
              href="https://www.facebook.com/Goodreads/"
            >
              <img
                alt="Facebook"
                src="//s.gr-assets.com/assets/site_footer/footer_facebook-ea4ab848f8e86c5f5c98311bc9495a1b.svg"
              />
            </a>
            <a
              className="footer__socialLink"
              href="https://twitter.com/goodreads"
            >
              <img
                alt="Twitter"
                src="//s.gr-assets.com/assets/site_footer/footer_twitter-126b3ee80481a763f7fccb06ca03053c.svg"
              />
            </a>
            <a
              className="footer__socialLink"
              href="https://www.instagram.com/goodreads/"
            >
              <img
                alt="Instagram"
                src="//s.gr-assets.com/assets/site_footer/footer_instagram-d59e3887020f12bcdb12e6c539579d85.svg"
              />
            </a>
            <a
              className="footer__socialLink"
              href="https://www.linkedin.com/company/goodreads-com/"
            >
              <img
                alt="LinkedIn"
                src="//s.gr-assets.com/assets/site_footer/footer_linkedin-5b820f4703eff965672594ef4d10e33c.svg"
              />
            </a>
            <a
              className="footer__socialLink"
              href="https://github.com/yahyaest"
            >
              <img
                alt="Github"
                src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                style={{ width: "30px", color: "#b48484" }}
              />
            </a>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/books">Books</a>
              </li>
              <li className="list-unstyled">
                <a href="https://covid-19-tracker-44022.web.app/">
                  Covid Tracker
                </a>
              </li>
              <li className="list-unstyled">
                <a href="https://games-api-finder.web.app/">Game Finder</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://github.com/yahyaest/BookStore_App">BookStore App</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
