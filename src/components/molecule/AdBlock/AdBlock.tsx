import React, { useState } from "react";

type AdBlockProps = {
  type: "horizontal" | "vertical" | "square";
  src?: string; // Optional custom image
};

export default function AdBlock({ type, src }: AdBlockProps) {
  const [showModal, setShowModal] = useState(false);

  const base =
    "rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300";

  const dimensions = {
    horizontal: "w-full h-28 md:h-32", // 728x90 or 970x90
    vertical: "w-32 md:w-48 h-96",     // 160x600 or 300x600
    square: "w-60 h-60 md:w-72 md:h-72", // 300x250 or 336x280
  };

  return (
    <>
      <div className={`${base} ${dimensions[type]}`}>
        {src ? (
          <img
            src={src}
            alt="Sponsored Ad"
            className="object-cover w-full h-full rounded-2xl"
          />
        ) : (
          <div className="text-center px-4 animate-pulse">
            <h3 className="text-sm font-semibold text-gray-700">
              Advertise Here
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Reach thousands of tech-savvy readers daily.
            </p>
            <button
              className="mt-3 text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              onClick={() => setShowModal(true)}
            >
              Promote Your Brand
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Promote Your Brand
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Want to advertise with us? Reach out with your details.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Submitted! We'll get back to you.");
                setShowModal(false);
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <textarea
                placeholder="Tell us about your brand"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
