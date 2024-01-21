import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tamu',
  templateUrl: './tamu.page.html',
  styleUrls: ['./tamu.page.scss'],
})
export class TamuPage implements OnInit {

  constructor(
    private _api: ApiService,
    private modalController: ModalController
  ) {}

  namaTamu: any;
  tamuList: any[] = [];
  tamuEdit: any = {
    idtamu: '', // Sesuaikan dengan atribut yang sesuai di database
    nama: ''
  };
  modalTerbuka = false;

  ngOnInit() {
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

  tambahTamu() {
    try {
      this._api.tambahTamu({ nama: this.namaTamu }).subscribe(
        (response) => {
          console.log('Response after adding tamu:', response);
          this.tampilTamu(); // Refresh list setelah menambah tamu
        },
        (error) => {
          console.error('Error adding tamu:', error);
        }
      );
    } catch (error) {
      console.error('Error in tambahTamu:', error);
    }
  }

  async tampilModal(tamu: any) {
    this.tamuEdit = tamu;
    this.modalTerbuka = true;

    const modal = await this.modalController.create({
      component: 'ion-modal',
      componentProps: {
        tamuEdit: this.tamuEdit
      }
    });

    modal.onWillDismiss().then((result) => {
      if (result.data) {
        console.log('Data after editing:', result.data);
        this.tampilTamu(); // Refresh list setelah mengedit tamu
      }
      this.modalTerbuka = false;
    });

    return await modal.present();
  }

  cancel() {
    this.modalTerbuka = false;
  }

  async editTamu() {
    console.log(this.tamuEdit)
    try {
      const response = await this._api.editTamu(this.tamuEdit).toPromise();
      console.log('Response after editing tamu:', response);
      this.modalController.dismiss({ data: response });
    } catch (error) {
      console.error('Error editing tamu:', error);
    }
  }

  hapusTamu(idtamu: any) {
    try {
      this._api.hapusTamu(idtamu).subscribe(
        () => {
          console.log('Tamu deleted successfully');
          this.tampilTamu(); // Refresh list setelah menghapus tamu
        },
        (error) => {
          console.error('Error deleting tamu:', error);
        }
      );
    } catch (error) {
      console.error('Error in hapusTamu:', error);
    }
  }
}
