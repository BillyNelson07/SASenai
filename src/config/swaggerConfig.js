const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MentorAI",
      version: "1.0.0",
      description: "Documentação da API da aplicação MentorAI",
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;
