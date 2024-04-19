import React, { useRef, useEffect, useState } from "react";

const MessageInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialHeight = 44; // Initial height in pixels, adjust this to center the placeholder
  const maxHeight = 150; // Maximum height in pixels

  // Adjust the height of the textarea
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${initialHeight}px`; // Start with initial height
      const newHeight = Math.max(
        textareaRef.current.scrollHeight,
        initialHeight
      ); // Calculate new height, respecting initialHeight
      textareaRef.current.style.height = `${Math.min(newHeight, maxHeight)}px`; // Set new height, but not exceeding maxHeight
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
      className="border border-gray-300 p-2 w-full resize-none rounded-xl"
      style={{ height: `${initialHeight}px` }} // Set initial height inline or through CSS classes
      placeholder="New Message..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default MessageInput;
