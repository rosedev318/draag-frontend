import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Email from '../../Images/mail.svg';
import Phone from '../../Images/phone.svg';
import Location from '../../Images/location.svg';

const ContactDetail = (props) => {
  const { data } = props;
  return (
    <div>
      <div className="container">
        <h5 className="contact-title">Contact Details</h5>
        <div style={{ height: '50px' }}>
          <div className="contact-detail pt-3">
            <div className="contact-icons text-secondary">
              <img src={Email} />
            </div>
            <div>
              <div className="d-flex flex-column contact-text">
                <span className="email-head">Email</span>
                <span className="email-text">{data.email}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '50px' }}>
          <div className="contact-detail pt-3">
            <div className="contact-icons text-secondary">
              <img src={Phone} />
            </div>
            <div>
              <div className="d-flex flex-column contact-text">
                <span className="email-head">Phone</span>
                <span className="email-text">{data.phoneNumber}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: '50px' }}>
          <div className="contact-detail pt-3">
            <div className="contact-icons text-secondary">
              <img src={Location} />
            </div>
            <div>
              <div className="d-flex flex-column contact-text">
                <span className="email-head">Address</span>
                <span className="address">{data.address}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="skills-text pt-5">Skills</p>
        <div className="d-flex flex-wrap gap-1">
          {data.skills &&
            data.skills.map((e, index) => {
              return (
                <div key={index} className=" mb-2">
                  <button className="px-4 skill-blue">
                    <CheckIcon /> {e.name}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
