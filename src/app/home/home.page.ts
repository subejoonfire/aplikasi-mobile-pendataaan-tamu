// home.page.ts

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private _api: ApiService,
    private modalController: ModalController
  ) {}

  perihalList: any;
  tamuList: any;
  modalTerbuka = false;
  perihalEdit: any = {
    idperihal: '',
    perihal: '',
    idtamu: '',
  };

  ngOnInit() {
    this.tampilPerihal();
    this.tampilTamu();
  }

  tampilTamu() {
    try {
      this._api.tampilTamu().subscribe(
        (data) => {
          console.log('Data tamu:', data);
          this.tamuList = data;
        },
        (error) => {
          console.error('Error fetching tamu data:', error);
        }
      );
    } catch (error) {
      console.error('Error in tampilTamu:', error);
    }
  }

  async tampilPerihal() {
    try {
      const data = await this._api.tampilPerihal().toPromise();
      console.log('Data perihal:', data);
      this.perihalList = data;
    } catch (error) {
      console.error('Error fetching perihal data:', error);
    }
  }

  async tambahPerihal() {
    try {
      const data = {
        perihal: this.perihalEdit.perihal,
        idtamu: this.perihalEdit.idtamu,
      };
      console.log(data);
      const response = await this._api.tambahPerihal(data).toPromise();
      console.log('Response after adding data:', response);
      this.tampilPerihal();
      this.perihalEdit = { perihal: '', idtamu: '' };
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  async editPerihal() {
    try {
      const response = await this._api
        .editPerihal(this.perihalEdit)
        .toPromise();
      console.log('Response after editing data:', response);
      window.location.reload()
    } catch (error) {
      console.error('Error editing data:', error);
    }
  }

  async hapusPerihal(idperihal: string) {
    try {
      const response = await this._api.hapusPerihal(idperihal).toPromise();
      console.log('Data deleted successfully');
      // Refresh the list after deleting data
      this.tampilPerihal();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  async tampilModal(perihal: any) {
    this.perihalEdit = { ...perihal, idtamu: perihal.idtamu };
    console.log(this.perihalEdit);
    this.modalTerbuka = true;
    const modal = await this.modalController.create({
      component: 'ion-modal',
      componentProps: {
        perihalEdit: this.perihalEdit,
      },
    });

    modal.onWillDismiss().then((result) => {
      if (result.data) {
        console.log('Data after editing:', result.data);
        // Refresh the list after editing data
        this.tampilPerihal();
      }
    });

    return await modal.present();
  }
  cancel() {
    this.modalTerbuka = false;
  }
}
