import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (callId: string | string[]) => {
  const streamClient = useStreamVideoClient();
  const [call, setCall] = useState<Call | undefined>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  useEffect(() => {
    if (!streamClient) {
      return;
    }
    const fetchCall = async () => {
      const { calls } = await streamClient.queryCalls({
        filter_conditions: {
          id: callId,
        },
      });
      if (calls.length > 0) {
        setCall(calls[0]);
      }
      setIsCallLoading(false);
    };
    fetchCall();
  }, [streamClient, callId]);
  return { call, isCallLoading };
};
