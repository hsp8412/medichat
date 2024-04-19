import React from "react";
import { useFormik } from "formik";
import InputField from "@/app/components/users/inputField";
import { User } from "@/app/services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createThread } from "@/app/services/threadService";
import Spinner from "@/app/components/spinner";
const NewMessageForm = ({
  user,
  setModalOpen,
}: {
  user: User | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const { data: session } = useSession();
  const senderId = session?.user.id;
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Please enter a message"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        console.log("values", values);
        const thread = await createThread({
          message: values.message,
          doctorId: user?.role === "Doctor" ? user.id : senderId,
          patientId: user?.role === "Patient" ? user.id : senderId,
        });
        toast.success("Message sent successfully");
        resetForm();
        setModalOpen(false);
      } catch (e) {
        toast.error("Failed to send message");
      }
      setSubmitting(false);
    },
  });

  const { touched, errors, handleSubmit, handleChange, handleBlur, values } =
    formik;
  return (
    <form onSubmit={handleSubmit}>
      <div className={"text-2xl font-semibold text-primary mb-3"}>
        <FontAwesomeIcon icon={faEnvelope} size={"lg"} className={"me-2"} />
        Send message to {user?.username}
      </div>
      <div>
        <InputField
          id={"new-thread-message"}
          textArea={true}
          label={"Message"}
          name={"message"}
          required={true}
          type={"text"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          value={values.message}
          error={errors.message}
          touched={touched.message}
        />
      </div>
      <button
        type={"submit"}
        className={
          "bg-primary mt-2 p-2 text-white text-xl flex items-center gap-2 rounded hover:scale-110"
        }
      >
        <Spinner show={submitting} />
        Send
      </button>
    </form>
  );
};

export default NewMessageForm;
