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
}
