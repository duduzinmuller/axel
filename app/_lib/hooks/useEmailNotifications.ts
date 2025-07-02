import { useState, useEffect } from "react";
import {
  EmailNotificationService,
  EmailNotification,
} from "@/app/_api/services/emailNotification";

export const useEmailNotifications = () => {
  const [emails, setEmails] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const data = await EmailNotificationService.getAll();
      setEmails(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Erro ao carregar notificações de email");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return { emails, loading, error, refresh: fetchEmails };
};
