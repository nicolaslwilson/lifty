import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './home/home.page';
import { WorkoutPage } from './workout/workout.page';
import { WorkoutHistoryPage} from './workout-history/workout-history.page';
import { LoginPage } from '../authentication/login/login';

@Component({
  templateUrl: 'menu.html'
})
export class Menu {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    // Add your pages to be displayed in the menu
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Recent Workouts', component: WorkoutHistoryPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.nav.setRoot(LoginPage);
  }
}
