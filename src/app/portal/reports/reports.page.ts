import { Component, OnInit } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

 data = [
    {
      name: 'Test 1',
      age: 13,
      average: 8.2,
      approved: true,
      description: 'using \'Content here, content here\' '
    },
    {
      name: 'Test 2',
      age: 11,
      average: 8.2,
      approved: true,
      description: 'using \'Content here, content here\' '
    },
    {
      name: 'Test 4',
      age: 10,
      average: 8.2,
      approved: true,
      description: 'using \'Content here, content here\' '
    },
  ];
  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  to;
  from;
  constructor() { }

  ngOnInit() {
  }

  generate() {
    console.log( new Date(this.to).getTime());
    // const csvExporter = new ExportToCsv(this.options);
    // csvExporter.generateCsv(this.data);

  }

}
