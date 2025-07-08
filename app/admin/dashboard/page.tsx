"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import VisaoGeral from "./components/VisaoGeral";
import Usuarios from "./components/Usuarios";
import Pagamentos from "./components/Pagamentos";
import LogsESistema from "./components/LogsESistema";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0E0F11] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-2 flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Dashboard Administrativo</h2>
            <span className="text-muted-foreground text-sm">
              Sistema completo de gestão de usuários e analytics
            </span>
          </div>
        </div>
        <Tabs defaultValue="visao-geral" className="dashboard-tabs mt-4 w-full">
          <TabsList
            className="flex w-full"
            style={{ backgroundColor: "#1E293B" }}
          >
            <TabsTrigger
              value="visao-geral"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Usuários
            </TabsTrigger>
            <TabsTrigger
              value="pagamentos"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Pagamentos
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="flex-1 text-xs text-white md:text-sm lg:text-base"
            >
              Logs & Sistema
            </TabsTrigger>
          </TabsList>
          <TabsContent value="visao-geral">
            <VisaoGeral />
          </TabsContent>
          <TabsContent value="usuarios">
            <Usuarios />
          </TabsContent>
          <TabsContent value="pagamentos">
            <Pagamentos />
          </TabsContent>
          <TabsContent value="logs">
            <LogsESistema />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
