
document.getElementById('data-atual').textContent = new Date().toLocaleString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

document.getElementById('download-pdf').addEventListener('click', () => {
  const table = document.querySelector('.table-relatorio');
  const rows = Array.from(table.rows);
  const tableData = rows.map(row =>
    Array.from(row.cells).map(cell => cell.textContent.trim())
  );

  const docDefinition = {
    content: [
      { text: 'Relatório de Métricas - E-commerce', style: 'header' },
      { text: `Dados atualizados em: ${new Date().toLocaleString('pt-BR')}`, style: 'subheader' },
      {
        table: {
          body: tableData,
          widths: ['*', '*'],
        },
        layout: {
          hLineWidth: function() { return 1; },
          vLineWidth: function() { return 1; },
          hLineColor: function() { return '#000'; },
          vLineColor: function() { return '#000'; }
        }
      },
      { text: 'Resumo:', style: 'header', margin: [0, 20, 0, 10] },
      { text: 'Este relatório apresenta as principais métricas de desempenho do nosso e-commerce...', style: 'text' }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 12,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      text: {
        fontSize: 12,
        alignment: 'justify'
      }
    },
    defaultStyle: {
      alignment: 'center'
    }
  };

  pdfMake.createPdf(docDefinition).download('relatorio.pdf');
});
