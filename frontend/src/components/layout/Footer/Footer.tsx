// import React from "react";
import "./Footer.scss";
import AppleIcon from "@mui/icons-material/Apple";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-left-1">
            <div className="footer-left-1-1">
              <a href="https://www.google.com/">
                <AppleIcon /> <span>get in applestore</span>
              </a>
            </div>
            <div className="footer-left-1-1">
              <a href="https://www.google.com/">
                <AppSettingsAltIcon /> <span>get in android store</span>
              </a>
            </div>
          </div>

          <div></div>
        </div>
        <div className="footer-center">
          <h1>Ecommmm</h1>
          <p>find amazing product</p>
        </div>
        <div className="footer-right">
          <h3>find Us at</h3>
          <div className="social_icons_footer">
            <a href="https://www.google.com/">
              {" "}
              <FacebookIcon />{" "}
            </a>

            <a href="https://www.google.com/">
              <InstagramIcon />{" "}
            </a>

            <a href="https://www.google.com/">
              {" "}
              <TwitterIcon />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
