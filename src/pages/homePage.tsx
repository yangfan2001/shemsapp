import React from "react";
import { useSnackbar } from "../components/SnackbarProvier";
 
export default function HomePage() {
  const showSnackbar = useSnackbar();

  const handleAction = () => {
    // This is where you want to show a snackbar message
    showSnackbar('Action was successful!', 'success');
  };

  return   <div>
  <button onClick={handleAction}>Click me</button>
</div>
}
