const validateBodyFields = async (req) => {
  const { author, title, banner, article_body, brief_description } = req.body;

  if (!author) return 'Autor inválido.';
  if (!title) return 'Título inválido.';
  if (!banner) return 'Banner inválido';
  if (!article_body) return 'Corpo do aritog inválido';
  if (!brief_description) return 'Descrição inválida.';
  else return null;
}

const retrieveTimeReading = async (data) => {
  let totalWords = 0;
  await data.forEach(element => {
    if (element.type === 'PARAGRAPH') {
      totalWords += element.data.split(' ').length;
    }
  });
  let estimatedTime = parseInt(totalWords / 200);
  if (estimatedTime <= 0) {
    estimatedTime = 1;
  }
  return estimatedTime;
}

export default {
  retrieveTimeReading,
  validateBodyFields,
}
