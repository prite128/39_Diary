import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { TopicPage } from '../pages/topic/topic';  
import { WelcomePage } from '../pages/welcome/welcome'; 
import { BirthdayService } from '../services/birthday.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    TopicPage,
    WelcomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    TopicPage,
    WelcomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BirthdayService]
})
export class AppModule {}
