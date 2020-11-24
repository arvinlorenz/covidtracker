import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.page.html',
  styleUrls: ['./portal.page.scss'],
})
export class PortalPage implements OnInit {

  constructor(private authService: AuthService) { }

  uid;

  ngOnInit() {
    this.authService.getUser().subscribe(a => {
      if (a) {
        console.log(a.id);
        this.uid = a.id;
      }
    });
  }

}
