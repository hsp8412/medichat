import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/app/components/spinner";

const CloseThreadMessage = ({
  patientUsername,
  handleConfirm,
  setOpen,
  deleting,
}: {
  patientUsername: string;
  handleConfirm: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleting: boolean;
}) => {
  return (
    <>
      <section className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4 text-center">
        <FontAwesomeIcon
          className={"text-rose-500"}
          icon={faTriangleExclamation}
          size="4x"
        />

        <div className="mt-4 text-xl">
          Are you sure to close the thread with {patientUsername}?
        </div>
      </section>

      <section className="flex justify-center gap-4 mt-1 mb-4">
        <button
          className="px-3 py-2 bg-rose-500 rounded text-white hover:bg-rose-300 flex items-center"
          onClick={handleConfirm}
          disabled={deleting}
        >
          <Spinner show={deleting} size={4} />
          <p>Close</p>
        </button>

        <button
          className="px-3 py-2 bg-gray-500 rounded text-white hover:bg-gray-400"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </section>
    </>
  );
};

export default CloseThreadMessage;
