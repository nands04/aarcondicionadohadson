import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "d68f56a4-25d9-4abc-8f61-0236724469c9",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "9fc539a544350030c9a4e49fbafd104f8af06564",

  build: {
    outputFolder: "admin",
    publicFolder: ".",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: ".",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "global",
        label: "Configurações Globais",
        path: "content/data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "info",
        },
        fields: [
          { type: "string", name: "heroTitle", label: "Título Principal (Hero)" },
          { type: "string", name: "heroDescription", label: "Descrição (Hero)", ui: { component: "textarea" } },
          { type: "string", name: "phoneLabel", label: "Telefone de Exibição" },
          { type: "string", name: "phoneWhatsapp", label: "Número do WhatsApp (apenas números, com código de área)" },
          { type: "string", name: "email", label: "E-mail" },
          { type: "string", name: "address", label: "Endereço Físico" },
          { type: "image", name: "heroImage", label: "Imagem da Seção Hero" },
          { type: "image", name: "aboutImage", label: "Imagem da Seção Sobre" },
          { type: "image", name: "servicesImage", label: "Imagem da Seção Serviços" },
          { type: "image", name: "pmocImage", label: "Imagem da Seção PMOC" },
          { type: "string", name: "servicesLead", label: "Texto Descritivo de Serviços", ui: { component: "textarea" } },
        ],
      },
    ],
  },
});
