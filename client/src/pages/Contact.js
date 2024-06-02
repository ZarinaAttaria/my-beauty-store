import React from 'react'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layoutt from '../components/Layout/Layoutt'
import "../styles/Homepage.css"

const Contact = () => {
  return (
    <div className='allPage'>
    <Layoutt title={"Contact us - BeautyStore"}>
    <div className="row contactus ">
    <div className="col-md-6 ">
      <img
        src="contact.png"
        alt="contactus"
        style={{ width: "100%" }}
      />
    </div>
    <div className="col-md-4">
      <h1 className="contactus1 p-2 text-white text-center">CONTACT US</h1>
      <div className='contactcard'>

            <p className="text-justify mt-2">
        any query and info about prodduct feel free to call anytime we 24X7
        vaialible
      </p>
      <p className="mt-3">
        <BiMailSend /> : www.help@ecommerceapp.com
      </p>
      <p className="mt-3">
        <BiPhoneCall /> : 012-3456789
      </p>
      <p className="mt-3">
        <BiSupport /> : 1800-0000-0000 (toll free)
      </p>
      </div>

    </div>
  </div>
    </Layoutt>
    </div>
  )
}

export default Contact
