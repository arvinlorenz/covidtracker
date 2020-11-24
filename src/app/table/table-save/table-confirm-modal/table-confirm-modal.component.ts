import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-confirm-modal',
  templateUrl: './table-confirm-modal.component.html',
  styleUrls: ['./table-confirm-modal.component.scss'],
})
export class TableConfirmModalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  mainMenu() {
    this.router.navigateByUrl('');
  }

}
