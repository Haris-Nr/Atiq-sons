import { Footer } from "antd/es/layout/layout";
import React from "react";

const Foot = () => {
  return (
    <Footer className="text-center bg-neutral-100 text-neutral-200 dark:bg-neutral-300 dark:text-neutral-200 ">
      <h4 className="mb-2 sm:mb-0">
        <a href="tel:+123456789" className="flex justify-center mb-4 font-semibold uppercase md:justify-start">
          +123456789
        </a>
      </h4>
      <h4 className="flex justify-center mb-4 font-semibold uppercase md:justify-start">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </h4>
      <h4 className="mb-2 text-purple-500 sm:mb-0">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          Terms of Use
        </a>
      </h4>
    </Footer>
  );
};

export default Foot;
