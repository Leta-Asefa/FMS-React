import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" id='footer'>
            <div className="footer-container">
                <div className="footer-column">
            <h4>Our Social Networks</h4>
            <p>For more information and contacts you can type and connect with our business social media. Our FB control are 24/7 accept your requests.We are the right choice for building your IT infrastructure.  <b><u> Security is Our Business Identity</u></b></p>
            <div className="flex justify-between">
              <a href="https://twitter.com/AmonIctSolution" ><img src='/twitter.svg' className='w-10 h-10'/>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61553169913410" >
              <img src='/facebook.svg' className='w-10 h-10'/>
              </a>
              <a href="https://www.instagram.com/amon_ict_solution/" >
              <img src='/instagram.svg' className='w-10 h-10'/>
              </a>
              <a href="https://www.tiktok.com/@amonictsolution" ><img src='/tiktok.svg' className='w-10 h-10'/>
              </a>
              <a href="https://www.linkedin.com/company/amon-ict-solution/mycompany/" >
              <img src='/linkedin.svg' className='w-10 h-10'/>
              </a>
            </div>
                </div>
                <div className="footer-column">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">IT Consulting Services</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">Web and Software Development</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">Cybersecurity Training</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">Advanced CCTV</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">Network Infrastructure</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">Datacenter Facility</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#services">Business Automation</a></li>
            </ul>
          </div>

                <div className="footer-column">
                <h3>Amon Adress</h3>
            <p>
              5 Killo AAiT Campus Near<br></br>
              Addis Ababa, Ethiopia<br></br>
              Ethiopia, Africa <br></br><br></br>
              <strong>Phone:</strong> +25111 154 2690<br></br>
              <strong>Mobile:</strong> +251 911581947<br></br>
              <strong>Email:</strong> marketing@amonict.com<br></br>
              <strong>P.O.Box:</strong> 1000: Addis Ababa, Ethiopia<br></br>
            </p>
                </div>


              
            </div>

     <p className="text-white text-lg font-bold text-center">© 2024 Amon ICT Solutions PLC. All rights reserved.</p>
      
            

        </footer>
    );
};

export default Footer;
