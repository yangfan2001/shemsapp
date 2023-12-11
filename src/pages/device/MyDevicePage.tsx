import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../components/SnackbarProvier";
import { getAllDevices } from "../../services/device";

export default function MyDevicePage() {
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // declare a function fetchData that is async and calls getAllDevices
    const fetchData = async () => {
      try {
        const response = await getAllDevices();
        console.log(response.data);
      } catch (error: any) {
        if (error.message) {
          showSnackbar(error.message, 'error')
        } else {
          showSnackbar('Server Error', 'error')
        }
      } finally{
        setIsLoading(false)
      }
    }
    // call fetchData
    fetchData()
  }, [])
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      test
    </div>
  );
}