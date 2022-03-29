import { useAlert } from "react-alert";

export default function useErrorHandler() {
  const alert = useAlert();

  const showError = (err = null) => {
    if (!err) alert.error("Somthing went wrong");
    if (err.code) {
      switch (err.code) {
        case 1:
          alert.error("Account Not found. Try again");
          break;
        case 2:
          alert.error("You must be logged in to perform this action");
          break;
        case 3:
          alert.error("Link Expired");
          break;
        case 4:
          alert.error("Password's don't match");
          break;
        case 5:
          alert.error("Please Login Again");
          break;
        case 6:
          alert.error("Fill in all the details to continue");
          break;
        case 11:
          alert.success("Success");
          break;
        default:
          alert.error("Something is wrong");
      }
    } else if (err.response) {
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
