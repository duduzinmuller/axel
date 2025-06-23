import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/app/store";
import { updatePayment } from "@/app/store/slice/payment";

export function usePaymentPolling(externalId: string, onPaid: () => void) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!externalId) return;

    const poll = async () => {
      const action = await dispatch(
        updatePayment({ paymentId: externalId, data: {} }) as any,
      );
      if (
        action.meta.requestStatus === "fulfilled" &&
        action.payload.status === "paid"
      ) {
        onPaid();
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    intervalRef.current = setInterval(poll, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [externalId, dispatch, onPaid]);
}
