import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Legal Links */}
        <div className="footer-section">
          <div className="footer-links">
            <a href="/imprint" className="footer-link">Imprint</a>
            <a href="/terms" className="footer-link">Terms & Conditions</a>
            <a href="/privacy" className="footer-link">Privacy Notice</a>
            <a href="/data-preferences" className="footer-link">Data preferences</a>
          </div>
        </div>

        {/* Zalando Apps */}
        <div className="footer-section">
          <div className="footer-apps">
            <span className="apps-title">Zalando Apps:</span>
            <div className="app-stores">
              <a href="#" className="app-store-link">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store"
                  className="app-icon"
                />
              </a>
              <a href="#" className="app-store-link">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play"
                  className="app-icon"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <div className="social-section">
            <span className="social-title">You can also find us on:</span>
            <div className="social-links">
              <a href="#" className="social-link">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
                  alt="Facebook"
                  className="social-icon"
                />
                <span>Facebook</span>
              </a>
              <a href="#" className="social-link">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                  alt="Instagram"
                  className="social-icon"
                />
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                  alt="Telegram"
                  className="social-icon"
                />
                <span>Telegram</span>
              </a>
              <a href="#" className="social-link">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                  alt="LinkedIn"
                  className="social-icon"
                />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="footer-section">
          <div className="additional-info">
            <p className="price-note">
              *The crossed out price indicates the manufacturer's recommended retail price
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2024 Zalando. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
