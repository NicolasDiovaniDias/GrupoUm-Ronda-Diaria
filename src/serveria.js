function doGet(e) {
  // Recebe o termo do HTML. Se não vier nada, usa "Renner" como padrão
  const termo = (e.parameter.q || "Renner"); 
  
  // O encodeURIComponent é essencial para limpar aspas e espaços na URL
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(termo)}+when:7d&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
  
  try {
    const xml = UrlFetchApp.fetch(url).getContentText();
    const document = XmlService.parse(xml);
    const root = document.getRootElement();
    const channel = root.getChild('channel');
    const items = channel.getChildren('item');
    
    // Mapeia os dados do XML para um formato mais fácil de ler (JSON)
    const noticias = items.map(item => {
      return {
        title: item.getChild('title').getText(),
        link: item.getChild('link').getText(),
        pubDate: item.getChild('pubDate').getText(),
        source: item.getChild('source').getText()
      };
    });
    
    return ContentService.createTextOutput(JSON.stringify(noticias))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (erro) {
    // Se algo der errado (ex: Google fora do ar), devolve o erro organizado
    return ContentService.createTextOutput(JSON.stringify({error: erro.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}