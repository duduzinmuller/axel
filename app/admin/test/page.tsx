"use client";

import { useAdminAuth } from "@/app/_lib/hooks/useAdminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, User } from "lucide-react";

export default function AdminTestPage() {
  const { user, isAdmin, isAuthenticated } = useAdminAuth();

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Página de Teste - Área Administrativa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Status da Autenticação</h3>
              <div className="flex items-center gap-2">
                <Badge variant={isAuthenticated ? "default" : "destructive"}>
                  {isAuthenticated ? "Autenticado" : "Não Autenticado"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Permissões</h3>
              <div className="flex items-center gap-2">
                <Badge variant={isAdmin ? "default" : "destructive"}>
                  {isAdmin ? "Administrador" : "Usuário"}
                </Badge>
              </div>
            </div>
          </div>

          {user && (
            <div className="space-y-2">
              <h3 className="font-semibold">Informações do Usuário</h3>
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Email: {user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Role: {user.role}</span>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-green-800 dark:text-green-200">
              ✅ Se você está vendo esta página, significa que a proteção está
              funcionando corretamente! Apenas usuários com role ADMIN podem
              acessar esta área.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
