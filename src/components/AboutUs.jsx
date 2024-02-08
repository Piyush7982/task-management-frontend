function AboutUs() {
  return (
    <div className="mx-auto bg-black  w-screen min-h-screen flex flex-col items-center p-10">
      <div className="text-center text-green-500 tracking-tight font-bold text-6xl">
        About Us
      </div>
      <div className="w-11/12 flex justify-evenly mt-8 h-[70%]">
        <div className="w-[75%] h-5/6 my-auto bg-[#01693F] p-6 rounded-2xl flex flex-col items-center justify-evenly">
          <div className="font-bold mb-5 text-white text-4xl">
            Meet Our Developer
          </div>
          <div className="text-green-200 p-1 rounded-xl text-start w-11/12 flex flex-col gap-y-5 items-center font-semibold text-xl">
            <div>
              <span className="font-bold scale-105 text-green-50">
                Full Stack Developer:
              </span>{" "}
              Our application is developed by a dedicated full stack developer
              who is currently a second-year student. Passionate about coding
              and problem-solving, our developer has utilized a wide range of
              technologies to build this Task Manager.
            </div>
            <div>
              <span className="font-bold scale-105 text-green-50">
                Commitment to Excellence:
              </span>{" "}
              Our developer is committed to delivering a high-quality,
              user-friendly application that meets your task management needs.
              Your satisfaction is our top priority.
            </div>
            <div>
              <span className="font-bold scale-105 text-green-50">
                Continuous Improvement:
              </span>{" "}
              We believe in continuous learning and improvement. We welcome
              feedback and suggestions to make our Task Manager even better for
              you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
