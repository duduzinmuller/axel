"use client";

import { useAppDispatch, useAppSelector } from "@/app/store";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteUserProfile, signOut } from "@/app/store/slice/auth";
import LoadingScreen from "@/app/_components/LoadingScreen";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registre os elementos e escalas necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AlertDialogDelete() {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteUserProfile()).then(() => {
      dispatch(signOut());
      router.push("/login");
    });
  };

  const handleDeleteConfirmed = () => {
    setIsAlertOpen(false);
    handleDelete();
  };

  useEffect(() => {
    setHasMounted(true);
    if (!isLoading && (!user || !isAuthenticated)) {
      router.push("/login");
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (!hasMounted || isLoading || !user) {
    return <LoadingScreen />;
  }

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 w-full cursor-pointer justify-start bg-zinc-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-[#0F0D0D] dark:text-red-500 dark:hover:bg-[#232323]"
        >
          <TrashIcon className="mr-3 h-4 w-4" /> Deletar conta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja deletar sua conta? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirmed}
            className="bg-red-600 text-white"
          >
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
