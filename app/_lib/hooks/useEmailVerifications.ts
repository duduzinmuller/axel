import { useState, useEffect } from "react";
import {
  EmailVerificationService,
  EmailVerification,
} from "@/app/_api/services/emailVerification";

export const useEmailVerifications = () => {
  const [verifications, setVerifications] = useState<EmailVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const data = await EmailVerificationService.getAll();
      setVerifications(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar verificações de email");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  return { verifications, loading, error, refresh: fetchVerifications };
};
