import { useAlert } from "react-alert";

export default function useErrorHandler() {
  const alert = useAlert();

  const showError = (err = null) => {
    if (!err) alert.error("Somthing went wrong");
    if (err.response) {
      alert.error(err.response.statusText);
    } else if (err.request) {
      if (err.request.response == "") {
        alert.error("Server is down right now. try again later");
      } else {
        alert.error(JSON.stringify(err.request));
      }
    } else {
      alert.error(err.message);
    }
  };

  return showError;
}
