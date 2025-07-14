import React, { useState, useEffect, useCallback } from "react";
import {
  PlanBadge,
  RoleBadge,
  ProviderBadge,
  StatusBadge,
} from "./UsuariosBadges";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { UsuarioDetailsDialog } from "./UsuarioDetailsDialog";
import { UsuarioEditDialog } from "./UsuarioEditDialog";
import { useAppDispatch } from "@/app/store";
import { openEditDialog } from "@/app/store/slice/admin/userEditSlice";

interface UsuariosTableProps {
  filteredUsers: any[];
}

export const UsuariosTable: React.FC<UsuariosTableProps> = ({
  filteredUsers,
}) => {
  const [users, setUsers] = useState(filteredUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers]);

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user: any) => {
    dispatch(openEditDialog(user));
  };

  const handleUserUpdated = useCallback((updatedUser: any) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u)),
    );
  }, []);

  return (
    <div className="mr-5 mb-10 ml-5 flex overflow-x-auto rounded-sm border border-[#23262F] p-3 md:p-5">
      <div className="mx-auto w-full max-w-full min-w-[900px]">
        <div className="mb-2 grid grid-cols-8 gap-2 border-b border-[#23262F] pb-2 md:gap-4">
          <div className="col-span-2 text-left text-[10px] font-semibold text-[#B1B5C3] md:col-span-1 md:text-xs">
            Usuário
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Plano
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Role
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Provider
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Verificado
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Mensagens
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Criado em
          </div>
          <div className="text-center text-[10px] font-semibold text-[#B1B5C3] md:text-xs">
            Ações
          </div>
        </div>
        <div className="space-y-0">
          {users.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-[#777]">
                Nenhum usuário encontrado com os filtros aplicados.
              </p>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-8 items-center gap-2 border-b border-[#23262F] py-2 md:gap-4"
              >
                <div className="col-span-2 text-left md:col-span-1">
                  <div className="text-[10px] font-semibold md:text-xs">
                    {user.name}
                  </div>
                  <div className="text-[9px] text-[#777] md:text-[10px]">
                    {user.email}
                  </div>
                </div>
                <div className="text-center">
                  <PlanBadge plan={user.plan} />
                </div>
                <div className="text-center">
                  <RoleBadge role={user.role} />
                </div>
                <div className="text-center">
                  <ProviderBadge provider={user.provider} />
                </div>
                <div className="text-center">
                  <StatusBadge
                    status={user.isVerified ? "Verificado" : "Pendente"}
                  />
                </div>
                <div className="text-center text-[10px] md:text-xs">
                  {user.messages || 0}
                </div>
                <div className="text-center text-[10px] md:text-xs">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="ml-4 flex justify-center gap-1 md:ml-0 md:gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-[#23262F]"
                    onClick={() => handleViewUser(user)}
                  >
                    <span className="sr-only">Ver</span>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-[#23262F]"
                    onClick={() => handleEditUser(user)}
                  >
                    <span className="sr-only">Editar</span>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-400 hover:bg-[#23262F]"
                  >
                    <span className="sr-only">Excluir</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <UsuarioDetailsDialog
        user={selectedUser}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
      <UsuarioEditDialog onUserUpdated={handleUserUpdated} />
    </div>
  );
};
