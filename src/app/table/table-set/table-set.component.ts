import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-set',
  templateUrl: './table-set.component.html',
  styleUrls: ['./table-set.component.scss'],
})
export class TableSetComponent implements OnInit {

  tableNumber = 5;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.router.navigateByUrl(`/table/create/${this.tableNumber}`);
  }

}
