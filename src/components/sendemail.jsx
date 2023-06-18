import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {useNavigate} from 'react-router-dom';

const SendEmail = () => {
  const form = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xs1xguq', 'template_qdlrue6', form.current, 'wlVGd6gxvdxaizn8i')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail} className="mt-8 card mx-auto rounded flex-shrink-0 w-10/12 max-w-sm shadow-2xl bg-teal-100">
        <div className="card-body">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name of the recipient</span>
            </label>
            <input type="text" placeholder="name" name="to_name" className="input input-bordered rounded" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email of the recipient</span>
            </label>
            <input type="email" placeholder="name" name="to_email" className="input input-bordered rounded" />
          </div>

          <div className="form-control h-auto">
            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered textarea-md h-40 w-full rounded"
              name="message"
              placeholder="Enter your message"

            ></textarea>
          </div>

          <div className="flex justify-between mt-6">
            <label className="btn btn-secondary rounded" onClick={() => navigate('/welcome')}>Back</label>
            <button type="submit" value="Send" className="px-8 btn btn-primary rounded">Send</button>
          </div>

        </div>
      </form>
    </>
  );
};

export default SendEmail;