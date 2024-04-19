import { ChangeEvent } from "react";

type Props = {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type?: "email" | "text" | "password" | "number";
  textArea?: boolean;
  handleChange: (event: ChangeEvent<any>) => void;
  handleBlur: (event: ChangeEvent<any>) => void;
  value: string | number;
  error: string | undefined;
  touched: boolean | undefined;
  hideLabel?: boolean;
};

const InputField = ({
  id,
  label,
  name,
  required,
  type,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  textArea,
  hideLabel,
}: Props) => {
  return (
    <div className="w-full">
      {!hideLabel && (
        <label
          className="block tracking-wide text-primary text-xl font-bold mb-2"
          htmlFor={id}
        >
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      {textArea ? (
        <textarea
          className="h-[10rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-white focus:outline-none focus:ring-primary focus:border-2 focus:border-primary block w-full p-2.5"
          id={id}
          name={String(name)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      ) : (
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-white focus:outline-none focus:ring-primary focus:border-2 focus:border-primary block w-full p-2.5"
          id={id}
          type={type ?? "text"}
          name={String(name)}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
      )}
      {touched && error && <p className="text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
