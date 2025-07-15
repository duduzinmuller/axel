import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  closeDeleteDialog,
  setDeleteLoading,
  setDeleteError,
  setDeleteSuccess,
} from "@/app/store/slice/admin/userDeleteSlice";
import { UserService } from "@/app/_api/services/user";
import { toast } from "sonner";

interface UsuarioDeleteDialogProps {
  onUserDeleted?: (userId: string) => void;
}

export const UsuarioDeleteDialog = ({
  onUserDeleted,
}: UsuarioDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, selectedUser, isLoading } = useAppSelector(
    (s) => s.userDelete,
  );

  const handleDelete = async () => {
    if (!selectedUser) return;
    dispatch(setDeleteLoading(true));
    try {
      await UserService.deleteUserById(selectedUser.id);
      dispatch(setDeleteSuccess(true));
      toast.success("Usuário deletado com sucesso!");
      if (onUserDeleted) onUserDeleted(selectedUser.id);
      dispatch(closeDeleteDialog());
    } catch (err: any) {
      if (
        err?.response?.status === 400 &&
        err?.response?.data?.error ===
          "Não é possível deletar sua própria conta"
      ) {
        toast.error("Não é possível deletar sua própria conta");
        dispatch(setDeleteError("Não é possível deletar sua própria conta"));
      } else if (
        err?.response?.status === 400 &&
        err?.response?.data?.error ===
          "Não é possível deletar outros administradores"
      ) {
        toast.error("Não é possível deletar outros administradores");
        dispatch(
          setDeleteError("Não é possível deletar outros administradores"),
        );
      } else {
        toast.error("Erro ao deletar usuário");
        dispatch(setDeleteError("Erro ao deletar usuário"));
      }
    } finally {
      dispatch(setDeleteLoading(false));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeDeleteDialog())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
        </DialogHeader>
        <div className="mb-4 text-sm text-[#777]">
          Tem certeza que deseja deletar o usuário <b>{selectedUser?.name}</b>?
          Essa ação não pode ser desfeita.
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(closeDeleteDialog())}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deletando..." : "Deletar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
