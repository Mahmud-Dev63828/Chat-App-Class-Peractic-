import moment from "moment";
import { toast, Flip } from "react-toastify";

const _ = {};

_.signUpData = () => {
  const signUpItem = [
    {
      id: 1,
      name: "email",
      requierd: true,
    },
    {
      id: 2,
      name: "fullName",
      requierd: false,
    },
    {
      id: 3,
      name: "password",
      requierd: true,
    },
  ];

  return signUpItem;
};

_.successToast = (msg = "success msg missing") => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });
};

_.errorToast = (msg = "error msg missingggg") => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });
};

_.infoToast = (msg = "info msg missing") => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Flip,
  });
};
// date and time
_.getTimeNow = () => {
  return moment().format("DD MM YYYY hh:mm:ss");
};

export default _;
