import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Couldn't send a request. Please try again later."
    );
  }

  return resData;
}

export default function useFetch(url, initialData, config ) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialData);

  const sendRequest = useCallback(
    async function sendRequest(configBody) {
      setIsLoading(true);

      try {
        const data = await sendHttpRequest(url, {...config, body: configBody});
        setData(data);
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [url, config, sendHttpRequest]
  );

  useEffect(() => {
    if (!config || (config && (config.method === "GET" || !config.method))) {
      sendRequest();
    }
  }, [sendRequest, config]);

  console.log(initialData)
  return { data, isLoading, error, sendRequest };
}
