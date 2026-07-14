export function usuarioValidator(schema) {
  return (req, res, next) => {
    try {
      const usuarioValidado = schema.safeParse(req.body);

      if (!usuarioValidado.success) {
        return res.status(400).json({ error: usuarioValidado.error.issues });
      }
      next();
    } catch (error) {
      return res.status(400).json({ error: "Validação falhou" });
    }
  };
}
