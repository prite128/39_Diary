import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, ActionSheetController , Platform } from 'ionic-angular';  
import { BirthdayService } from '../../services/birthday.service';  
import { DetailsPage } from '../details/details';  
import { TopicPage } from '../topic/topic';  





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
    public birthdays = [];

    constructor(private birthdayService: BirthdayService,
        private nav: NavController,
        public platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController,
        public actionsheetCtrl: ActionSheetController) {

    }









    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.birthdayService.initDB();

            this.birthdayService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.birthdays = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }




    showDetail(birthday) {
        let modal = this.modalCtrl.create(TopicPage, { birthday: birthday });
        modal.present();
    }
    gosave(birthday) {
        let modal = this.modalCtrl.create(DetailsPage , { birthday: birthday });
        modal.present();
    }
      openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}