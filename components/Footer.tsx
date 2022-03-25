import React from "react";

const Footer = () => {
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-t w-full inline-block border-blue-400 text-center text-white py-8">
                © Copyright {new Date().getFullYear()} CuliCoder
            </div>
        </div>
    );
};

export default Footer;
