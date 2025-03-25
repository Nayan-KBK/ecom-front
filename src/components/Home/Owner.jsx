import React from "react";
import owner from '../../assets/global/owner.webp'

const OwnerTalk = () => {
    return (
        <div className="my-10 px-5 md:px-20 lg:px-40 flex flex-col md:flex-row items-center gap-10">
            {/* Left Side - Owner Image */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden"> {/* Overflow hidden for image clipping */}
                    <img
                        src={owner}
                        alt="Owner"
                        className="object-cover w-full h-full transition duration-300 ease-in-out transform scale-105 hover:scale-110" // Added hover effect
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 mix-blend-overlay opacity-20"></div> {/* Subtler gradient */}
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg pointer-events-none"></div> {/* Border and shadow on top */}
            </div>
            {/* Right Side - Content */}
            <div className="text-center md:text-left max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                    Owner's Talk
                </h2>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Welcome to our creative space! As the founder, I believe in delivering
                    exceptional designs that not only look great but also create a lasting
                    impression. Our team is dedicated to turning your vision into reality
                    with stunning visuals and innovative solutions. Let's create something
                    amazing together!
                </p>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">
                    Explore Our Designs
                </button>
            </div>
        </div>
    );
};

export default OwnerTalk;
