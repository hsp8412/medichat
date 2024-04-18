import React, { useRef, useEffect, useState } from "react";

const MessageInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 150; // Maximum height in pixels

  // Adjust the height of the textarea
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight); // Calculate new height, but not exceeding maxHeight
      textareaRef.current.style.height = `${newHeight}px`; // Set new height
      // If new height reaches maxHeight, enable overflow-y scrolling
      textareaRef.current.style.overflowY =
        newHeight >= maxHeight ? "auto" : "hidden";
    }
  };

  // Adjust height when text changes
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="border border-gray-300 p-2 w-full resize-none rounded-xl" // removed overflow-hidden
      placeholder="New Message..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default MessageInput;
