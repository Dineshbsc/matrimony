
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HammerModule } from '@angular/platform-browser';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [HammerModule, MatSnackBarModule, CommonModule , MatCardModule, MatButtonModule, MatIconModule ],

  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent {
  profileId!: any;
  constructor(private profileService: ProfileService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,  private location: Location){}
  profile: any;
  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.getProfiles()
     }
     getProfiles() {
      this.profileService.getProfiles().subscribe((data: any[]) => {
        console.log('Fetched profiles:', data);
        console.log(this.profileId);
        
        // Filter profiles based on the profileId
        this.profile = data.find((profile) => profile.id === this.profileId);
        console.log(this.profile);
        
      });
    }
  goBack() {
    console.log('Go back');
    // Navigate back to profile list or previous page
    this.location.back()
  }


}
