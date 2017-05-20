import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, ActionSheetController , Platform ,NavParams, ViewController } from 'ionic-angular';  
import { BirthdayService } from '../../services/birthday.service';  
import { DetailsPage } from '../details/details';  
import {ElementRef, HostListener, Directive, OnInit} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";
  }
}




@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html'
})
export class TopicPage {  
    public birthday: any = {};
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

    constructor(private birthdayService: BirthdayService,
        private nav: NavController,
        public platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController,
        private navParams: NavParams,
        public actionsheetCtrl: ActionSheetController,
        private viewCtrl: ViewController) {

    }

   
    ionViewDidLoad() {
        let editBirthday = this.navParams.get('birthday');

        if (editBirthday) {
            this.birthday = editBirthday;
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.birthday.Date.toISOString().slice(0, 10);
        }
    }

    delete() {
        this.birthdayService.delete(this.birthday)
            .catch(console.error.bind(console));

        this.dismiss();
    }
     dismiss() {
        this.viewCtrl.dismiss(this.birthday);
    }
    sent(){
      let modal = this.modalCtrl.create(DetailsPage, { birthday: this.birthday });
        modal.present();
    }
      openMenu() {
    
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.delete();
          }
        },
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.sent();
          }
        },
        {
          text: 'Back',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.dismiss();
          }
        }
        
      ]
    });
    actionSheet.present();
  }
}