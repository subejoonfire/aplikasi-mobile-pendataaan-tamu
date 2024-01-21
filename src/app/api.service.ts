import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlTamu = 'http://localhost/pendataan-tamu/api/tamu'; // Sesuaikan dengan URL API Tamu Anda
  private apiUrlPerihal = 'http://localhost/pendataan-tamu/api/perihal'; // Sesuaikan dengan URL API Perihal Anda

  constructor(private http: HttpClient) {}

  // Fungsi Tampil Tamu
  tampilTamu() {
    const url = `${this.apiUrlTamu}/tampil.php`;
    return this.http.get<any[]>(url);
  }

  // Fungsi Tambah Tamu
  tambahTamu(data: { nama: string }) {
    const url = `${this.apiUrlTamu}/tambah.php?nama=${data.nama}`;
    return this.http.get<any>(url);
  }

  // Fungsi Edit Tamu
  editTamu(data: { id: any; nama: string }) {
    const url = `${this.apiUrlTamu}/edit.php?id=${data.id}&nama=${data.nama}`;
    return this.http.get<any>(url);
  }

  // Fungsi Hapus Tamu
  hapusTamu(id: any) {
    const url = `${this.apiUrlTamu}/hapus.php?id=${id}`;
    return this.http.get<any>(url);
  }

  // ------------------------ TAMBAHKAN KODE DIBAWAH INI ------------------------

  // Fungsi Tampil Perihal
  tampilPerihal() {
    const url = `${this.apiUrlPerihal}/tampil.php`;
    return this.http.get<any[]>(url);
  }

  // Fungsi Tambah Perihal
  tambahPerihal(data: { perihal: string; idtamu: string }) {
    const url = `${this.apiUrlPerihal}/tambah.php?perihal=${data.perihal}&idtamu=${data.idtamu}`;
    return this.http.get<any>(url);
  }

  // Fungsi Edit Perihal
  editPerihal(data: { idperihal: any; perihal: string; idtamu: string }) {
    const url = `${this.apiUrlPerihal}/edit.php?idperihal=${data.idperihal}&perihal=${data.perihal}&idtamu=${data.idtamu}`;
    return this.http.get<any>(url);
  }

  // Fungsi Hapus Perihal
  hapusPerihal(idperihal: any) {
    const url = `${this.apiUrlPerihal}/hapus.php?idperihal=${idperihal}`;
    return this.http.get<any>(url);
  }

  // ------------------------ AKHIR PENAMBAHAN KODE ------------------------

}
