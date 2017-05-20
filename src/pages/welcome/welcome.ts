import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, ActionSheetController , Platform } from 'ionic-angular';  
import { BirthdayService } from '../../services/birthday.service';  
import { HomePage } from '../home/home';  
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

	
    constructor(private birthdayService: BirthdayService,
        private nav: NavController,
        public platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController,
        public actionsheetCtrl: ActionSheetController) {

    }

    gohome(birthday) {
        let modal = this.modalCtrl.create(HomePage, { birthday: birthday });
        modal.present();
    }
 }