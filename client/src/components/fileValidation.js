// fileValidation.js

const tiposPermitidos = ["image/jpeg", "image/png", "application/pdf"];
const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
const maxArquivos = 3;

export function validarArquivos(selectedFiles) {
  const arquivosValidos = [];
  const mensagensErro = [];

  selectedFiles.forEach(file => {
    const tipoValido = tiposPermitidos.includes(file.type);
    const tamanhoValido = file.size <= tamanhoMaximo;

    if (!tipoValido) {
      mensagensErro.push(`Arquivo "${file.name}" tem tipo inválido: ${file.type}`);
    }
    if (!tamanhoValido) {
      mensagensErro.push(`Arquivo "${file.name}" excede o tamanho máximo de 5MB`);
    }

    if (tipoValido && tamanhoValido) {
      arquivosValidos.push(file);
    }
  });

  if (arquivosValidos.length > maxArquivos) {
    mensagensErro.push(`Você pode enviar no máximo ${maxArquivos} arquivos.`);
    arquivosValidos.splice(maxArquivos); // Limita ao máximo permitido
  }

  return { arquivosValidos, mensagensErro };
}
