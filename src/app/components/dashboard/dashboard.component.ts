import { Component } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  urlImage = 'https://cdn-icons-png.flaticon.com/512/2640/2640490.png';
  ciudad: string;
  temperatura: number = 0;
  humedad: number = 0;
  clima: string = '';
  query: boolean = false;
  loading: boolean = false;
  mostrarError: boolean = false;
  constructor(private _climaService: ClimaService) {
    this.ciudad = '';
  }

  obtenerClima() {
    this.query = false;
    this.loading = true;
    this._climaService.getClima(this.ciudad).subscribe(
      (data) => {
        console.log(data);
        this.query = true;
        this.temperatura = data.main.temp - 273;
        this.humedad = data.main.humidity;
        this.clima = data.weather[0].main;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.error();
      }
    );
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = ''
    }, 3000);
  }
}
