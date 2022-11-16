import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ActiveRouteService } from '../../services/active-route.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //avatar: string = "../../../assets/defaultProfile.png";
  avatar: string = "assets/defaultProfile.png";
  username: string = "Paradox";
  role: string = "Admin";
  photo: string;
  activeDashboard: any;
  activeRouteServiceSubscription: Subscription;
  userSubscription: Subscription;
  sessionExpirySubscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private activeRouteService: ActiveRouteService, private bnIdle: BnNgIdleService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.avatar  = this.authService.profilePic;

    //taking activeDashboard value from dashboard through activeRouteService
    this.activeRouteServiceSubscription = this.activeRouteService.activeDashboard.subscribe(activity => {
      this.activeDashboard = activity;
    });

    // subscribing to user data from server and extracting username and role
    this.userSubscription = this.authService.user.subscribe(userData => {
      this.username = userData.userName;
      this.role = userData.roleName;
    });

    //service for if user is inactive for 180 seconds(3 minute)
    this.sessionExpirySubscription = this.bnIdle.startWatching(180).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.toastr.warning('Session Expired due to inactivity!', '', { timeOut: 20000 });
        this.authService.onLogout();
        this.router.navigate(['/login']);
      }
    });
  }


  goToProfilePage() {
    console.log('you are landing to profile page');
    this.router.navigate(['home/profile']);
  }

  logout() {
    console.log("you are logging out");
    //change afterwards so that user can logout
    this.authService.onLogout();
    this.router.navigate(['/login']);
  }


  ngOnDestroy(): void {
    this.activeRouteServiceSubscription.unsubscribe();
    this.sessionExpirySubscription.unsubscribe();
  }

}
