import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [HammerModule, MatSnackBarModule, CommonModule, MatCardModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss'
})
export class ProfileListComponent {
  profiles: any[] = [];
  currentIndex: number = 0;
  swipedLeft = false;
  swipedRight = false;

  constructor(private profileService: ProfileService, private snackBar: MatSnackBar, private router: Router) { }
  ngOnInit() {
    this.getProfiles()
  }
  getProfiles() {
    this.profileService.getProfiles().subscribe(data => {
      this.profiles = data;
    });
  }
  swipeLeft() {
    this.swipedLeft = true;
    this.showToast('Not Interested');
    setTimeout(() => {
      this.swipedLeft = false;
      this.loadNextProfile();
    }, 300); 
  }

  swipeRight() {
    this.swipedRight = true;
    this.showToast('Interested');
    setTimeout(() => {
      this.swipedRight = false;
      this.loadNextProfile();
    }, 300);
  }
  viewProfile(id:any) {
   
    
    this.router.navigate(['/view-profile/'+id])
  }
  manualSwipeLeft() {
    this.swipeLeft();
  }

  manualSwipeRight() {
    this.swipeRight();
  }

  shortlist() {
    this.showToast('Shortlisted');
    this.loadNextProfile();
  }

  loadNextProfile() {
    this.currentIndex = (this.currentIndex + 1) % this.profiles.length;
  }

  showToast(message: string) {
   
    this.snackBar.open(message, 'x', {
      duration: 2000, 
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
}
