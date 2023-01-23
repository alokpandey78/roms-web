import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
  // Timeline
  mytimelines = [
    {
      from: 'Owen Cavanough',
      time: '(January 15, 2023)',
      image: '../../../../assets/img/rtl-logo-new-icon.jpg',
     // attachment: 'assets/images/big/img2.jpg',
      content:
        'With Digital adoption, RTL will reduce its carbon footprint by removing approx. 100,000 paper forms from our operations.....',
    },
    {
      from: 'Mick Moroney',
      time: '(January 20, 2023)',
      image: '../../../../assets/img/rtl-logo-new-icon.jpg',
      content:
        'Ensure you have updated your app on regular basis to get the most our of ROMS.....',
      // buttons: 'primary',
    },
    {
      from: 'Dharm Yadav',
      time: '(January 21, 2023)',
      image: '../../../../assets/img/rtl-logo-new-icon.jpg',
      // attachment: 'assets/images/big/img1.jpg',
      content:
        'PreStart is our best effort to make ROMS a leading AI based solution for Mining and Earthworks industry ....',
    },
    // {
    //   from: 'Dhiren Adesara',
    //   time: '(1 minute ago)',
    //   image: 'assets/images/users/4.jpg',
    //   content:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    //   buttons: 'warn',
    // }, 
  ];

  constructor() {}
}
