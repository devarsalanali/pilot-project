import React, { useState } from 'react';
import Logo from '../../assets/images/NextGenLogo.png';

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [noticfication, setNotification] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className="font-inter">
      <header className="bg-[#FAFAFA] shadow-sm">
        <nav
          className="flex items-center lg:flex-row flex-col lg:gap-0 gap-4   lg:justify-between justify-center w-11/12 py-2 m-auto  relative font-inter"
          role="navigation"
        >
          <div>
            <img src={Logo} className="w-8/12 lg:m-0 m-auto" alt="" />
          </div>
          <ul className="flex items-center lg:gap-5 gap-2">
            <li>
              <label className="flex cursor-pointer lg:w-24 select-none items-center">
                <div className="relative w-24 h-8">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="sr-only w-full"
                  />
                  <div
                    className={`box block h-8 w-full rounded-full transition-colors relative ${
                      isChecked ? 'bg-[#9389E3]' : 'bg-gray-300'
                    }`}
                  >
                    {isChecked ? (
                      <span className="absolute left-4 top-[7px] text-white text-sm">
                        Arm
                      </span>
                    ) : (
                      <span className="absolute right-3 top-[7px] text-white text-sm">
                        Unarm
                      </span>
                    )}
                  </div>
                  <div
                    className={`absolute top-1 h-6 w-6 rounded-full transition-transform ${
                      isChecked
                        ? 'bg-white translate-x-16'
                        : 'bg-gray-100 translate-x-2'
                    }`}
                  ></div>
                </div>
              </label>
            </li>
            <li
              onClick={() => {
                setNotification(true);
              }}
              className="cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 6.6665C15 5.34042 14.4732 4.06865 13.5355 3.13097C12.5979 2.19329 11.3261 1.6665 10 1.6665C8.67392 1.6665 7.40215 2.19329 6.46447 3.13097C5.52678 4.06865 5 5.34042 5 6.6665C5 12.4998 2.5 14.1665 2.5 14.1665H17.5C17.5 14.1665 15 12.4998 15 6.6665Z"
                  stroke="#848295"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70803 18.3304 9.42117 18.2537 9.16816 18.1079C8.91515 17.9622 8.70486 17.7526 8.55835 17.5"
                  stroke="#848295"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="13.5714"
                  cy="3.5715"
                  r="2.35714"
                  fill="#FF3E3E"
                  stroke="#F1F1F1"
                />
              </svg>
            </li>
            <li className="flex items-center gap-1">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.16931 10.0001C1.16931 7.65806 2.09968 5.41195 3.75575 3.75588C5.41183 2.0998 7.65794 1.16943 9.99998 1.16943C12.342 1.16943 14.5881 2.0998 16.2442 3.75588C17.9003 5.41195 18.8306 7.65806 18.8306 10.0001C18.8306 12.3421 17.9003 14.5883 16.2442 16.2443C14.5881 17.9004 12.342 18.8308 9.99998 18.8308C7.65794 18.8308 5.41183 17.9004 3.75575 16.2443C2.09968 14.5883 1.16931 12.3421 1.16931 10.0001ZM9.99998 2.4361C8.53387 2.43615 7.09937 2.86228 5.87099 3.66264C4.64262 4.463 3.67331 5.6031 3.081 6.94424C2.48869 8.28538 2.29891 9.76975 2.53473 11.2168C2.77055 12.6638 3.42182 14.0111 4.40931 15.0948C5.00872 14.1557 5.83522 13.3829 6.8124 12.8478C7.78958 12.3127 8.88589 12.0326 9.99998 12.0334C11.1141 12.0326 12.2104 12.3127 13.1876 12.8478C14.1647 13.3829 14.9912 14.1557 15.5906 15.0948C16.5781 14.0111 17.2294 12.6638 17.4652 11.2168C17.7011 9.76975 17.5113 8.28538 16.919 6.94424C16.3266 5.6031 15.3573 4.463 14.129 3.66264C12.9006 2.86228 11.4661 2.43615 9.99998 2.4361ZM14.6426 15.9721C14.1711 15.1587 13.4939 14.4835 12.679 14.0145C11.8641 13.5455 10.9402 13.2992 9.99998 13.3001C9.05975 13.2992 8.13582 13.5455 7.32092 14.0145C6.50602 14.4835 5.82883 15.1587 5.35731 15.9721C6.68376 17.0061 8.3181 17.5666 9.99998 17.5641C11.7493 17.5641 13.36 16.9694 14.6426 15.9721ZM6.86665 8.67343C6.86665 7.84242 7.19676 7.04545 7.78438 6.45783C8.37199 5.87022 9.16897 5.5401 9.99998 5.5401C10.831 5.5401 11.628 5.87022 12.2156 6.45783C12.8032 7.04545 13.1333 7.84242 13.1333 8.67343C13.1333 9.50445 12.8032 10.3014 12.2156 10.889C11.628 11.4767 10.831 11.8068 9.99998 11.8068C9.16897 11.8068 8.37199 11.4767 7.78438 10.889C7.19676 10.3014 6.86665 9.50445 6.86665 8.67343ZM9.99998 6.80677C9.75484 6.80677 9.51211 6.85505 9.28564 6.94886C9.05916 7.04267 8.85338 7.18017 8.68005 7.3535C8.50671 7.52684 8.36921 7.73262 8.2754 7.95909C8.18159 8.18557 8.13331 8.4283 8.13331 8.67343C8.13331 8.91857 8.18159 9.1613 8.2754 9.38778C8.36921 9.61425 8.50671 9.82003 8.68005 9.99337C8.85338 10.1667 9.05916 10.3042 9.28564 10.398C9.51211 10.4918 9.75484 10.5401 9.99998 10.5401C10.495 10.5401 10.9698 10.3434 11.3199 9.99337C11.67 9.6433 11.8666 9.1685 11.8666 8.67343C11.8666 8.17836 11.67 7.70357 11.3199 7.3535C10.9698 7.00343 10.495 6.80677 9.99998 6.80677Z"
                    fill="#848295"
                  />
                </svg>
              </p>
              <p className="text-gray-500 text-sm text-semibold">Admin</p>
            </li>
            <li className="flex items-center gap-1">
              <p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.9531 14.2969H15.58C15.4863 14.2969 15.3984 14.3379 15.3398 14.4102C15.2031 14.5762 15.0566 14.7364 14.9023 14.8887C14.2712 15.5204 13.5237 16.0238 12.7011 16.3711C11.8489 16.7311 10.9329 16.9157 10.0078 16.9141C9.07221 16.9141 8.16596 16.7305 7.3144 16.3711C6.49179 16.0238 5.74428 15.5204 5.11323 14.8887C4.48104 14.2591 3.97694 13.5129 3.62885 12.6914C3.26752 11.8399 3.08588 10.9356 3.08588 10C3.08588 9.06448 3.26948 8.16019 3.62885 7.30862C3.97651 6.48636 4.47651 5.74612 5.11323 5.11136C5.74995 4.47659 6.49018 3.97659 7.3144 3.62894C8.16596 3.26956 9.07221 3.08597 10.0078 3.08597C10.9433 3.08597 11.8496 3.26761 12.7011 3.62894C13.5253 3.97659 14.2656 4.47659 14.9023 5.11136C15.0566 5.26565 15.2011 5.42581 15.3398 5.58987C15.3984 5.66214 15.4882 5.70315 15.58 5.70315H16.9531C17.0761 5.70315 17.1523 5.56644 17.0839 5.46292C15.5859 3.1348 12.9648 1.59378 9.98627 1.60159C5.30659 1.61331 1.55463 5.41214 1.60151 10.086C1.64838 14.6856 5.39448 18.3985 10.0078 18.3985C12.9785 18.3985 15.5878 16.8594 17.0839 14.5371C17.1503 14.4336 17.0761 14.2969 16.9531 14.2969ZM18.6894 9.87698L15.9179 7.68948C15.8144 7.60745 15.664 7.68167 15.664 7.81253V9.2969H9.5312C9.44526 9.2969 9.37495 9.36722 9.37495 9.45315V10.5469C9.37495 10.6328 9.44526 10.7032 9.5312 10.7032H15.664V12.1875C15.664 12.3184 15.8164 12.3926 15.9179 12.3106L18.6894 10.1231C18.7081 10.1085 18.7232 10.0898 18.7336 10.0685C18.744 10.0471 18.7494 10.0237 18.7494 10C18.7494 9.97632 18.744 9.95291 18.7336 9.93159C18.7232 9.91027 18.7081 9.8916 18.6894 9.87698Z"
                    fill="#848295"
                  />
                </svg>
              </p>
              <p className="text-gray-400 text-sm text-semibold">Logout</p>
            </li>
          </ul>
        </nav>
      </header>
      {noticfication ? (
        <div
          className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 z-50 "
          onClick={() => {
            setNotification(false);
          }}
        >
          <div className="bg-white absolute lg:w-4/12 w-11/12 rounded-md lg:top-16 top-32 lg:right-56 sm:right-10 right-2 pb-2 overflow-hidden">
            <div className="flex justify-between py-5 px-6 w-full bg-[#F6FAFD] items-center">
              <h1 className="text-lg">Notification</h1>
              <p className="text-md text-gray-500">Mark all as read</p>
            </div>
            <div className="text-center">
              <div className="border-b text-start h-24 flex justify-end">
                <div className=" w-11/12 flex items-center gap-3">
                  <p>
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_251_9211)">
                        <rect
                          x="4"
                          y="3"
                          width="34"
                          height="34"
                          rx="17"
                          fill="white"
                        />
                        <path
                          d="M14.4367 13.6786C14.3947 13.6471 14.3469 13.6242 14.296 13.6111C14.2451 13.5981 14.1921 13.5952 14.1401 13.6027C14.0881 13.6101 14.0381 13.6277 13.9929 13.6544C13.9477 13.6812 13.9082 13.7166 13.8767 13.7586C13.8452 13.8007 13.8223 13.8485 13.8092 13.8994C13.7962 13.9502 13.7933 14.0032 13.8007 14.0552C13.8082 14.1072 13.8257 14.1572 13.8525 14.2024C13.8793 14.2476 13.9147 14.2871 13.9567 14.3186L15.5583 15.5202C15.6003 15.5518 15.6481 15.5747 15.699 15.5877C15.7499 15.6008 15.8029 15.6036 15.8549 15.5962C15.9069 15.5888 15.9569 15.5712 16.0021 15.5444C16.0473 15.5177 16.0868 15.4823 16.1183 15.4402C16.1498 15.3982 16.1728 15.3504 16.1858 15.2995C16.1988 15.2486 16.2017 15.1957 16.1943 15.1437C16.1869 15.0917 16.1693 15.0416 16.1425 14.9964C16.1157 14.9512 16.0803 14.9118 16.0383 14.8802L14.4367 13.6786ZM13.7999 17.6002C13.6938 17.6002 13.5921 17.6424 13.5171 17.7174C13.442 17.7924 13.3999 17.8941 13.3999 18.0002C13.3999 18.1063 13.442 18.2081 13.5171 18.2831C13.5921 18.3581 13.6938 18.4002 13.7999 18.4002H14.9999C15.106 18.4002 15.2077 18.3581 15.2827 18.2831C15.3578 18.2081 15.3999 18.1063 15.3999 18.0002C15.3999 17.8941 15.3578 17.7924 15.2827 17.7174C15.2077 17.6424 15.106 17.6002 14.9999 17.6002H13.7999ZM20.9983 13.6002C23.5175 13.6002 25.5935 15.4674 25.7855 17.8842L25.7967 18.0618L25.7999 18.2418L25.7991 21.1186L26.5391 22.8962C26.5571 22.9394 26.5713 22.9841 26.5815 23.0298L26.5943 23.0986L26.6007 23.2034C26.5998 23.38 26.5406 23.5512 26.4322 23.6906C26.3238 23.8299 26.1724 23.9295 26.0015 23.9738L25.9087 23.9954L25.8007 24.0034H22.9999L22.9959 24.1314C22.9638 24.639 22.7395 25.1152 22.3687 25.4632C21.9979 25.8113 21.5084 26.005 20.9999 26.005C20.4914 26.005 20.0019 25.8113 19.6311 25.4632C19.2603 25.1152 19.036 24.639 19.0039 24.1314L18.9999 24.0034H16.1991C16.1287 24.0034 16.0594 23.9944 15.9911 23.9762L15.8919 23.9418C15.7304 23.8738 15.5957 23.7545 15.5086 23.6025C15.4214 23.4504 15.3866 23.274 15.4095 23.1002L15.4263 22.9986L15.4607 22.8962L16.1991 21.1202L16.1999 18.2346L16.2031 18.0554C16.3015 15.5602 18.4167 13.6002 20.9983 13.6002ZM22.1999 24.0034H19.7999L19.8055 24.1162C19.8324 24.3932 19.9548 24.6523 20.1517 24.849C20.3485 25.0457 20.6077 25.1679 20.8847 25.1946L20.9999 25.2002C21.2982 25.2002 21.5858 25.0891 21.8066 24.8885C22.0275 24.688 22.1657 24.4124 22.1943 24.1154L22.1999 24.0034ZM20.9983 14.4002C18.8999 14.4002 17.1823 15.9386 17.0143 17.9082L17.0031 18.0778L16.9999 18.2418V21.2002L16.9695 21.3538L16.1991 23.2034L25.7655 23.205L25.8015 23.2034L25.0303 21.3538L24.9999 21.2002V18.2498L24.9967 18.0866C24.9127 16.0274 23.1559 14.4002 20.9983 14.4002ZM28.1231 13.7586C28.0594 13.6738 27.9647 13.6177 27.8597 13.6027C27.7546 13.5877 27.648 13.615 27.5631 13.6786L25.9615 14.8802C25.8766 14.9439 25.8205 15.0386 25.8055 15.1437C25.7905 15.2487 25.8178 15.3554 25.8815 15.4402C25.9452 15.5251 26.0399 15.5812 26.1449 15.5962C26.25 15.6112 26.3566 15.5839 26.4415 15.5202L28.0431 14.3186C28.128 14.255 28.1841 14.1602 28.1991 14.0552C28.2141 13.9502 28.1868 13.8435 28.1231 13.7586ZM28.5999 18.0002C28.5999 17.8941 28.5578 17.7924 28.4827 17.7174C28.4077 17.6424 28.306 17.6002 28.1999 17.6002H26.9999C26.8938 17.6002 26.7921 17.6424 26.7171 17.7174C26.642 17.7924 26.5999 17.8941 26.5999 18.0002C26.5999 18.1063 26.642 18.2081 26.7171 18.2831C26.7921 18.3581 26.8938 18.4002 26.9999 18.4002H28.1999C28.306 18.4002 28.4077 18.3581 28.4827 18.2831C28.5578 18.2081 28.5999 18.1063 28.5999 18.0002Z"
                          fill="#221F54"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_251_9211"
                          x="0"
                          y="0"
                          width="42"
                          height="42"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_251_9211"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_251_9211"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </p>
                  <p>
                    <p className="lg:text-md text-sm">
                      You have received alert
                    </p>
                    <p className="lg:text-sm text-[10px] text-gray-500">
                      12-20-2025- 09:50 am
                    </p>
                  </p>
                </div>
              </div>
              <div className="border-b text-start h-24 flex justify-end">
                <div className=" w-11/12 flex items-center gap-3">
                  <p>
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_d_251_9217)">
                        <rect
                          x="4"
                          y="3"
                          width="34"
                          height="34"
                          rx="17"
                          fill="white"
                        />
                        <path
                          d="M21 27C24.866 27 28 23.866 28 20C28 16.134 24.866 13 21 13C17.134 13 14 16.134 14 20C14 23.866 17.134 27 21 27Z"
                          stroke="#221F54"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.9946 22.1002H21.0009M21.0002 20.0002V17.2002"
                          stroke="#221F54"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_251_9217"
                          x="0"
                          y="0"
                          width="42"
                          height="42"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_251_9217"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_251_9217"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </p>
                  <p>
                    <p className="lg:text-md text-sm">
                      User recently changed his password.
                    </p>
                    <p className="lg:text-sm text-[10px] text-gray4500">
                      12-20-2025- 09:50 am
                    </p>
                  </p>
                </div>
              </div>
              <button className="border-b-2 mt-28 border-gray-900 m-auto">
                See All
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Navbar;
