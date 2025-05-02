import React, { useState } from 'react';
import logo from '../../assets/images/NextGenLogo.png';
import CameraImg from '../../assets/images/firstImg.png';

const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(true);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.username === '') {
      setError('userError');
    } else if (input.password === '') {
      setError('password');
    } else {
      alert('Login successfully');
      setError(true);
      setInput({
        username: '',
        password: '',
      });
    }
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="w-5/12 h-screen hidden lg:block">
          <div className="flex  flex-col justify-between relative h-full">
            <img src={logo} className="m-auto mt-8 z-20" alt="logo" />
            <img
              src={CameraImg}
              alt=""
              className="absolute top-0 w-full h-full"
            />
            <p className="bg-[#f5f4fa87] p-3 font-bold text-center z-20 text-gray-800">
              Copyright © 2025 NexGen. All Rights Reserved{' '}
            </p>
            <br />
          </div>
        </div>
        <div className="lg:w-6/12 m-auto w-full lg:px-16 px-6">
          <div className="flex flex-col justify-between h-full ">
            <img
              src={logo}
              className="m-auto mt-8 block lg:hidden"
              alt="logo"
            />
            <br />
          </div>
          <div className="lg:text-start text-center">
            <h1 className="sm:text-3xl text-2xl text-gray-700 font-bold font-inter">
              Login
            </h1>
            <p className="sm:text-lg  text-gray-600 font-light font-inter sm:leading-loose">
              Enter your information below{' '}
            </p>
          </div>
          <form action="" className="sm:mt-8 mt-4" onSubmit={handleSubmit}>
            <p>
              <label
                htmlFor="name"
                className="font-semibold lg:text-xl text-lg text-gray-700 font-inter"
              >
                Username
              </label>{' '}
              <br />
              <p className="relative">
                <svg
                  className="absolute lg:top-7 top-5 left-4"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.8889 21V19C18.8889 17.9391 18.4909 16.9217 17.7824 16.1716C17.0739 15.4214 16.1131 15 15.1111 15H7.55555C6.55362 15 5.59273 15.4214 4.88426 16.1716C4.17579 16.9217 3.77777 17.9391 3.77777 19V21"
                    stroke="#221F54"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.3334 11C13.4198 11 15.1111 9.20914 15.1111 7C15.1111 4.79086 13.4198 3 11.3334 3C9.24694 3 7.55557 4.79086 7.55557 7C7.55557 9.20914 9.24694 11 11.3334 11Z"
                    stroke="#221F54"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  className="border mt-2 rounded-lg lg:h-16 h-12 focus:outline-none font-inter sm:text-lg text-md font-light sm:px-16 px-12 bg-gray-50 w-full"
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  id="name"
                  value={input.username}
                  onChange={handleChange}
                />
                {error === 'userError' ? (
                  <p className="text-red-600 text-sm font-inter">
                    Enter username
                  </p>
                ) : (
                  ''
                )}
              </p>
            </p>
            <p className="lg:mt-8 mt-3">
              <label
                htmlFor="password"
                className="font-semibold lg:text-xl text-lg text-gray-700 font-inter"
              >
                Password
              </label>{' '}
              <br />
              <p className="relative">
                <svg
                  className="absolute lg:top-7 top-5  left-4"
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 11.9583H5C3.89543 11.9583 3 12.891 3 14.0416V21.3333C3 22.4838 3.89543 23.4166 5 23.4166H19C20.1046 23.4166 21 22.4838 21 21.3333V14.0416C21 12.891 20.1046 11.9583 19 11.9583Z"
                    stroke="#221F54"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11.9583V7.79159C7 6.41025 7.52678 5.08549 8.46446 4.10874C9.40214 3.13199 10.6739 2.58325 12 2.58325C13.3261 2.58325 14.5978 3.13199 15.5355 4.10874C16.4732 5.08549 17 6.41025 17 7.79159V11.9583"
                    stroke="#221F54"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  className="border mt-2 rounded-lg lg:h-16 h-12 focus:outline-none lg:text-lg sm:text-md font-light sm:px-16 px-12 font-inter bg-gray-50 w-full"
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  id="password"
                  value={input.password}
                  onChange={handleChange}
                />
                {error === 'password' ? (
                  <p className="text-red-600 text-sm font-inter">
                    Enter Password
                  </p>
                ) : (
                  ''
                )}
              </p>
            </p>
            <button className="bg-[#DA3F3F] w-full mt-8 h-16 rounded-lg text-white font-semibold text-lg font-inter">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
