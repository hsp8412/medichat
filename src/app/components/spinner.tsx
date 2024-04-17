/**
 *
 * Spinner used by buttons to indicate loading state.
 * @param show - Whether to show the spinner or not.
 * @param size - The size of the spinner (optional, default is 6)
 * @param border - The border size of the spinner (optional, default is 4px)
 * @constructor
 */
const Spinner = ({
  show,
  size,
  border,
}: {
  show: boolean;
  size?: number;
  border?: number;
}) => {
  return (
    <div
      className={`${!show && "hidden"}  animate-spin inline-block ${
        size ? `w-${size} h-${size}` : "w-6 h-6"
      } ${
        border ? `border-[${border}px]` : "border-[4px]"
      }  border-current border-t-transparent text-white rounded-full`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
