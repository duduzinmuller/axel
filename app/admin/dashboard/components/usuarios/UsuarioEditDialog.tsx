import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  closeEditDialog,
  setEditLoading,
  setEditError,
  setEditSuccess,
  updateSelectedUser,
} from "@/app/store/slice/admin/userEditSlice";
import { UserService } from "@/app/_api/services/user";
import { toast } from "sonner";
import { useUsers } from "@/app/_lib/hooks/useUsers";

const userEditSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  role: z.enum(["USER", "ADMIN"]),
});

type UserEditForm = z.infer<typeof userEditSchema>;

interface UsuarioEditDialogProps {
  onUserUpdated?: (user: any) => void;
}

export const UsuarioEditDialog: React.FC<UsuarioEditDialogProps> = ({
  onUserUpdated,
}) => {
  const dispatch = useAppDispatch();
  const { isOpen, selectedUser, isLoading } = useAppSelector((s) => s.userEdit);
  const { refreshUsers } = useUsers();

  const form = useForm<UserEditForm>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: selectedUser?.name || "",
      email: selectedUser?.email || "",
      role:
        selectedUser?.role === "ADMIN" || selectedUser?.role === "USER"
          ? selectedUser.role
          : "USER",
    },
    values: selectedUser
      ? {
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role as "USER" | "ADMIN",
        }
      : undefined,
  });

  useEffect(() => {
    if (selectedUser) {
      form.reset({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role as "USER" | "ADMIN",
      });
    }
  }, [form, selectedUser]);

  const onSubmit = async (data: UserEditForm) => {
    if (!selectedUser) return;
    dispatch(setEditLoading(true));
    try {
      const updated = await UserService.updateUserById(selectedUser.id, data);
      dispatch(updateSelectedUser(updated));
      dispatch(setEditSuccess(true));
      toast.success("Usuário atualizado com sucesso!");
      if (onUserUpdated) onUserUpdated(updated);
      refreshUsers();
      dispatch(closeEditDialog());
    } catch (err: any) {
      if (
        err?.response?.status === 400 &&
        err?.response?.data?.error ===
          "Não é possível editar outros administradores"
      ) {
        toast.error("Não é possível editar outros administradores");
        dispatch(setEditError("Não é possível editar outros administradores"));
      } else {
        toast.error("Erro ao atualizar usuário");
        dispatch(setEditError("Erro ao atualizar usuário"));
      }
    } finally {
      dispatch(setEditLoading(false));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeEditDialog())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <Input {...form.register("name")} disabled={isLoading} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <Input {...form.register("email")} disabled={isLoading} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Role</label>
            <select
              {...form.register("role")}
              className="w-full rounded border px-2 py-1"
              disabled={isLoading}
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(closeEditDialog())}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
