import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { verifyEmail } from "../../../service/api";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { id, token } = useParams();

  useEffect(() => {
    // Check if params.id and params.token exist and are non-empty
    console.log(id);
    console.log(token);

    const verifyEmailId = async () => {
      try {
        // const url = `http://localhost:8000/${id}/verify/${token}`;
        let data = await verifyEmail({ id, token });
        console.log(data);

        if (data.data.message) {
          setValidUrl(true);
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        setValidUrl(false);
      }
      setLoading(false);
    };
    verifyEmailId();
  }, [id, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!validUrl) {
    return <div>Invalid verification URL.</div>;
  }

  return <div>Email verified successfully!</div>;
}
