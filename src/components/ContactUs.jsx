import { FaGithub } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
function ContactUs() {
  return (
    <div className="mx-auto bg-black  w-screen min-h-screen flex flex-col items-center p-10">
      <div className="text-center text-green-500 tracking-tight font-bold text-6xl">
        Contact Us
      </div>
      <div className="w-11/12 flex justify-evenly mt-8 h-[70%]">
        <div className="w-[85%] h-[22rem] my-auto bg-[#01693F] p-6 rounded-2xl flex flex-col items-center justify-evenly">
          <div className="font-bold mb-5 text-white text-4xl">
            Stay Connected
          </div>
          <div className="text-green-200 p-1 rounded-xl text-start w-11/12 h-4/5 flex flex-col gap-y-5 justify-center  items-start font-semibold text-xl">
            <div>
              <a
                href="https://github.com/Piyush7982"
                className="font-bold scale-105 text-green-50  "
              >
                <FaGithub className="inline mr-6" size={30} />:
              </a>{" "}
              Click Here To Check out our projects on GitHub.
            </div>
            <div>
              <a
                href="https://linkedin.com/in/archit-jain-2b75ba257"
                className="font-bold scale-105 text-green-50 "
              >
                <FaLinkedin className="inline mr-6" size={30} />:
              </a>{" "}
              Click Here To Connect with us on LinkedIn
            </div>
            <div>
              <span className="font-bold scale-105 text-green-50">
                Copyright
                {<FaRegCopyright className="inline ml-3 mr-6" size={25} />}:
              </span>{" "}
              All rights reserved. This Task Manager application is the property
              of <span className="text-2xl font-bold">Archit Jain</span>.
              Unauthorized duplication or distribution is strictly prohibited.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
