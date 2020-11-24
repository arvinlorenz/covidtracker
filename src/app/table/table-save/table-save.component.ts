import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/_services/auth.service';
import { TableService } from 'src/app/_services/table.service';
import { TableConfirmModalComponent } from './table-confirm-modal/table-confirm-modal.component';

@Component({
  selector: 'app-table-save',
  templateUrl: './table-save.component.html',
  styleUrls: ['./table-save.component.scss'],
})
export class TableSaveComponent implements OnInit {
  tables = [];
  userEmail = null;
  tableNumber;
  tablesForm: FormGroup;
  tablesArray = new FormArray([]);
  createMode = false;
  editMode = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private tableService: TableService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController) { }

  get controls() { // a getter!
    return (this.tablesForm.get('tables') as FormArray).controls;
  }

  ngOnInit() {
    this.authService.getUserEmail().subscribe(email => {
      if (email) {
        this.userEmail = email;
        this.setTableForm();
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      if (!params.tableNumber) {
        this.createMode = false;
        this.tableService.fetchTables().subscribe();
        this.tableService.getTables().subscribe((tables) => {
          if (tables) {
            this.tables = tables;
          }
        });
      } else {
        this.createMode = true;
        this.tableNumber = params.tableNumber;

        for (let i = 0; i < this.tableNumber; i++) {
          this.tablesArray.push(new FormControl(`Table ${i + 1}`));
        }

        this.setTableForm();
      }



    });
  }

  setTableForm() {
    this.tablesForm = this.fb.group({
      tables: this.tablesArray,
      email: [this.userEmail, Validators.required]
    });
  }
  updateTable() {
    this.editMode = true;
    for (const table of this.tables) {
      this.tablesArray.push(new FormControl(`${table}`));
    }

    this.setTableForm();
  }

  // async presentLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Please wait...',
  //     duration: 2000
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed!');
  // }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'QR codes successfully generated',
      message: 'Please check your email',
      position: 'top',
      buttons: [
        {
          side: 'end',
          // icon: 'star',
          text: 'Proceed to portal',
          handler: () => {
            this.router.navigateByUrl('/portal');
          }
        }
      ]
    });

    toast.onDidDismiss()
      .then(() => {
        this.editMode = null;
        this.createMode = null;
        this.tablesArray = new FormArray([]);
    });
    toast.present();
  }
  async presentModal(formValues) {
    const modal = await this.modalCtrl.create({
      component: TableConfirmModalComponent,
    });

    // modal.onDidDismiss()
    //   .then((data: any) => {
    //     if (data.data.confirmed) {
    //       this.router.navigateByUrl('/table');
    //     }
    // });

    return await modal.present();
  }

  addTable() {
    const tableNumber = (this.tablesForm.get('tables') as FormArray).controls.length + 1;
    (this.tablesForm.get('tables') as FormArray).push(
      new FormControl(`Table ${tableNumber}`)
    );
  }

  onDeleteTable(index: number) {
    (this.tablesForm.get('tables') as FormArray).removeAt(index);
  }


  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    }).then((loadingEl) => {
      loadingEl.present();
      this.tableService.saveTables(this.tablesForm.value.email, this.tablesForm.value.tables).subscribe(
        (a) => {
          loadingEl.dismiss();
          this.presentToastWithOptions();
        }
      );
    });


  }

}
