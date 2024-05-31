import React from 'react';

import '../styles/Policy.css'; // Import CSS file for styling
import Layoutt from '../components/Layout/Layoutt';

const Policy = () => {
  return (
    <Layoutt title="Privacy Policy - BeautyStore">
      <div className="policy-container">
        <div className="policy-image">
          <img src="privacy.png" alt="contactus" />
        </div>
        <div className="policy-content">
        <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tristique ex id nibh tempor, sed tincidunt risus maximus. Aliquam
            erat volutpat. Maecenas vel suscipit quam. Donec sed turpis
            ullamcorper, commodo quam eget, gravida lectus. Suspendisse
            potenti. Duis sed est nec urna dignissim consequat. Curabitur nec
            semper velit. Nam ac felis et magna accumsan venenatis.
          </p>
          <p>
            Integer at erat arcu. Vivamus dignissim, lectus a tempus
            sollicitudin, lorem metus commodo dolor, vitae dapibus nulla nunc
            non metus. Nulla facilisi. Donec viverra libero in sem blandit
            dictum. Sed finibus, elit at aliquet feugiat, urna justo faucibus
            metus, sit amet tincidunt urna urna in est. Curabitur ullamcorper
            gravida purus nec congue. Integer tincidunt urna sit amet magna
            fermentum, at hendrerit lacus dictum.
          </p>
          {/* Add more paragraphs with your privacy policy content */}
        </div>
      </div>
    </Layoutt>
  );
};

export default Policy;
