import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class ToastService {

  duration: number = 3500;
  icon: string = 'close';
  role: string = 'cancel';

  constructor(
    private toastController: ToastController
  ) { }

  async errorToast(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message: message,
      position: 'bottom',
      color: 'danger',
      duration: this.duration,
      buttons: [
        {
        icon: this.icon,
        role: this.role
        }
      ]
    });
    await toast.present();
  }

  async successToast(message: string): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message: message,
      position: 'bottom',
      color: 'success',
      duration: this.duration,
      buttons: [
        {
        icon: this.icon,
        role: this.role
        }
      ]
    });
    await toast.present();
  }


}
