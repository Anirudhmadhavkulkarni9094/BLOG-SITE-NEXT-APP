import React from "react";

function CoreParagraph({ block }: { block: { content: string } }) {
  return (
    <p className="text-base text-justify leading-7 first-letter:text-red-500 first-letter:font-semibold first-letter:text-3xl">
      {block.content}
    </p>
  );
}

export default CoreParagraph;
