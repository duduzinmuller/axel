"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Calendar, Clock, ArrowLeft, Info, Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet";
import VisaoGeral from "./components/VisaoGeral";
import Usuarios from "./components/Usuarios";
import Pagamentos from "./components/Pagamentos";
import LogsESistema from "./components/LogsESistema";
import { Badge } from "../../components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <style jsx global>{`
        .dashboard-tabs [data-state="active"] {
          background-color: #0e0f11 !important;
          color: white !important;
          border: none !important;
          box-shadow: none !important;
        }
        .dashboard-tabs [data-state="active"]:hover {
          background-color: #0e0f11 !important;
          border: none !important;
        }
        .dashboard-tabs [data-state="active"]:focus {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      {/* Header Gradient */}
      <div className="flex flex-col gap-1 bg-gradient-to-r from-indigo-500 to-purple-700 p-6 pb-4">
        <div className="mx-10 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">
              Painel Administrativo
            </h1>
            <span className="text-xs text-white/80">
              Gestão completa do sistema
            </span>
          </div>
          {/* Menu desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Calendar size={16} />
              <span>segunda-feira, 10 de junho de 2024</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <Clock size={16} />
              <span>14:30</span>
            </div>
            <Button size="icon" variant="ghost" className="text-white">
              <Info size={18} />
            </Button>
          </div>
          {/* Menu mobile/hamburguer */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="text-white">
                  <Menu size={28} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="fixed top-0 right-0 z-[9999] flex h-full w-72 max-w-full flex-col border-none bg-gradient-to-b from-indigo-500 to-purple-700 p-0 text-white"
              >
                <div className="flex flex-col gap-6 p-6 pt-16">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">Painel Administrativo</h1>
                    <span className="text-xs text-white/80">
                      Gestão completa do sistema
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Calendar size={16} />
                    <span>segunda-feira, 10 de junho de 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Clock size={16} />
                    <span>14:30</span>
                  </div>
                  <Badge className="w-fit bg-green-500 text-white">
                    Sistema Online
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-fit text-white"
                  >
                    <Info size={18} />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Voltar e título */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-2 flex items-center gap-2">
          <Button size="icon" variant="outline">
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Dashboard Administrativo</h2>
            <span className="text-muted-foreground text-sm">
              Sistema completo de gestão de usuários e analytics
            </span>
          </div>
        </div>
        {/* Tabs */}
        <Tabs defaultValue="visao-geral" className="dashboard-tabs mt-4 w-full">
          <TabsList
            className="flex w-full"
            style={{ backgroundColor: "#1E293B" }}
          >
            <TabsTrigger
              value="visao-geral"
              className="flex-1 text-xs md:text-sm lg:text-base"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
              }}
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="usuarios"
              className="flex-1 text-xs md:text-sm lg:text-base"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
              }}
            >
              Usuários
            </TabsTrigger>
            <TabsTrigger
              value="pagamentos"
              className="flex-1 text-xs md:text-sm lg:text-base"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
              }}
            >
              Pagamentos
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="flex-1 text-xs md:text-sm lg:text-base"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                outline: "none",
              }}
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
