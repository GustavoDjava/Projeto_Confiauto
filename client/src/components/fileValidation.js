// fileValidation.js

const tiposPermitidos = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
];

const tamanhoMaximo = 5 * 1024 * 1024; // 5MB
const maxArquivos = 3;

export function validarArquivos(selectedFiles) {
  const arquivosValidos = [];
  const mensagensErro = [];

  selectedFiles.forEach(file => {
    const tipoMime = file.type?.trim(); // Remove espaços extras e evita erro se undefined
    const tipoValido = tiposPermitidos.includes(tipoMime);
    const tamanhoValido = file.size <= tamanhoMaximo;

    if (!tipoValido) {
      mensagensErro.push(`Arquivo "${file.name}" tem tipo inválido: ${file.type || "desconhecido"}`);
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
    arquivosValidos.splice(maxArquivos); // Remove os excedentes
  }

  return { arquivosValidos, mensagensErro };
}