

//Печать протокола
var btnPrintProtocol = document.querySelector(".printing__button--protocol");

if (btnPrintProtocol) {
  btnPrintProtocol.addEventListener("click", function(event) {
    event.preventDefault();

    var docInfo = {

      info: {
        title: "Дипломы",
        author: "JustCreate",
        subject: "Test"
      },

      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [40, 10, 10, 10],

      content: [
        {text: 'Протокол голосования', style: 'subheader'},
		// 'Each cell-element can set a rowSpan or colSpan',
		{style: 'tableExample',
			color: '#444',
      fontSize: 7,
			table: {
				widths: [15, 'star', 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 30, 30],
				headerRows: 2,
				// keepWithHeaderRows: 1,
				body: [
					[{rowSpan: 2, text: 'ID', style: 'tableHeader', alignment: 'center'}, {rowSpan: 2, text: 'Название номера', style: 'tableHeader', alignment: 'center'},
              {colSpan: 4, text: 'Критерий 1', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {colSpan: 4, text: 'Критерий 2', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {colSpan: 4, text: 'Критерий 3', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {colSpan: 4, text: 'Критерий 4', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {colSpan: 4, text: 'Критерий 5', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {colSpan: 4, text: 'Критерий 6', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {colSpan: 4, text: 'Критерий 7', style: 'tableHeader', alignment: 'center'}, {}, {}, {},
              {rowSpan: 2, text: 'Итоговая оценка', style: 'tableHeader', alignment: 'center'}, {rowSpan: 2, text: 'Присуждаемое место', style: 'tableHeader', alignment: 'center'},
          ],
          //2-я строка
          [{}, {},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {text: 'c1', style: 'tableHeader', alignment: 'center'}, {text: 'c2', style: 'tableHeader', alignment: 'center'}, {text: 'c3', style: 'tableHeader', alignment: 'center'}, {text: 'c4', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //3-я строка
          [{colSpan: 32, text: 'Возрастная категория', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //4-я строка
          [{colSpan: 32, text: 'Категория номинации', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
        [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //4-я строка
          [{colSpan: 32, text: 'Категория номинации', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //4-я строка
          [{colSpan: 32, text: 'Категория номинации', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //3-я строка
          [{colSpan: 32, text: 'Возрастная категория', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //4-я строка
          [{colSpan: 32, text: 'Категория номинации', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //4-я строка
          [{colSpan: 32, text: 'Категория номинации', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //4-я строка
          [{colSpan: 32, text: 'Категория номинации', style: 'tableHeader', alignment: 'center'},
              {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],
          //5-я строка
          [{text: '86'}, {text: "название коллектива/ название номера"},
              {text: '11', style: 'tableHeader', alignment: 'center'}, {text: '12', style: 'tableHeader', alignment: 'center'}, {text: '13', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '21', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '31', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '101', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'}, {text: '', style: 'tableHeader', alignment: 'center'},
              {}, {},
          ],



				]
			},
      layout: {
          hLineWidth: function(i, node) {
            return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
          },
          vLineWidth: function(i, node) {
            return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
          }
        }
		}


      ]
    }
    pdfMake.createPdf(docInfo).open();
//
//     content: [
//   layout: {
//     hLineWidth: function(i, node) {
//       return (i === 0 || i === node.table.body.length) ? 0.1 : 0.1;
//     },
//     vLineWidth: function(i, node) {
//       return (i === 0 || i === node.table.widths.length) ? 0.1 : 0.1;
//     }
//   }
// ]



    // var json_diploma = createDataDiploma();

    // getAjax(json_diploma).then(function(response) {
    //   createDiploma(response);
    // }).catch(function(error) {
    //   console.log("Error!!!");
    //   console.log(error);
    // });
  });
}

function createProtocol(jsonText) {


  var contentDiploma = parseDiploma(jsonText);
  var docInfo = {

    info: {
      title: "Дипломы",
      author: "JustCreate",
      subject: "Test"
    },

    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [30, 380, 30, 50],

    content: [
      {
        table: {
  // headers are automatically repeated if the table spans over multiple pages
  // you can declare how many rows should be treated as headers
  headerRows: 1,
  widths: [ '*', 'auto', 100, '*' ],

  body: [
    [ 'First', 'Second', 'Third', 'The last one' ],
    [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
    [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
  ]
}
      }

    ]
  }
  pdfMake.createPdf(docInfo).print();
}
