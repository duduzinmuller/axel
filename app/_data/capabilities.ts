import {
  FileText,
  BookOpen,
  Code,
  Languages,
  Lightbulb,
  PieChart,
} from "lucide-react";

export const capabilities = [
  {
    category: "Produtividade",
    icon: FileText,
    items: [
      "Criação e edição de documentos",
      "Organização de tarefas e agenda",
      "Análise de dados e relatórios",
      "Gestão de emails e comunicação",
    ],
  },
  {
    category: "Educação",
    icon: BookOpen,
    items: [
      "Explicações de conceitos complexos",
      "Ajuda com lições de casa",
      "Preparação para provas",
      "Pesquisas acadêmicas",
    ],
  },
  {
    category: "Tecnologia",
    icon: Code,
    items: [
      "Programação e debugging",
      "Análise de código",
      "Soluções técnicas",
      "Automação de processos",
    ],
  },
  {
    category: "Idiomas",
    icon: Languages,
    items: [
      "Tradução em tempo real",
      "Ensino de idiomas",
      "Correção gramatical",
      "Prática de conversação",
    ],
  },
  {
    category: "Criatividade",
    icon: Lightbulb,
    items: [
      "Brainstorming de ideias",
      "Criação de conteúdo",
      "Roteiros e histórias",
      "Design e arte conceitual",
    ],
  },
  {
    category: "Análise",
    icon: PieChart,
    items: [
      "Interpretação de dados",
      "Insights de negócio",
      "Relatórios detalhados",
      "Tendências e padrões",
    ],
  },
];
