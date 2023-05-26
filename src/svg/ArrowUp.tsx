const ArrowUp = ({ size = 64 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -0.5 17 17"
      className="z-10"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="white"
      strokeWidth="0.128"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#1f1a1a" />
          <stop offset="50%" stopColor="#000000" />
          <stop offset="100%" stopColor="#1f1a1a" />
        </linearGradient>
      </defs>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_iconCarrier">
        <polygon points="8,5 13,10 3,10" fill="url(#gradient)"></polygon>
      </g>
      <g stroke="white" strokeWidth="0.128" fill="none" fillRule="evenodd">
        <path
          d="M7.96,2.392 C8.541,1.812 9.482,1.812 10.064,2.392 L16.506,8.836 C17.088,9.417 17.345,10.939 15.506,10.939 L2.518,10.939 C0.616,10.939 0.936,9.418 1.517,8.836 L7.96,2.392 L7.96,2.392 Z"
          //   fill="#434343"
          fill="url(#gradient)"
          className=" "></path>
      </g>
    </svg>
  );
};

export default ArrowUp;
