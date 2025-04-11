import React from 'react';

function CoreHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center  gap-2 sm:gap-4 my-6 sm:my-8">
      {/* Left line */}
      <div className="flex-1 h-[2px] bg-black" />

      {/* Center heading */}
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-black px-2 sm:px-4 py-1 rounded-sm text-amber-600 whitespace-nowrap">
        {title} ☕
      </h1>

      {/* Right line */}
      <div className="flex-1 h-[2px] bg-black" />
    </div>
  );
}

export default CoreHeader;
