import { Routes } from '@angular/router';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';

export const routes: Routes = [
    { path: 'profiles', component: ProfileListComponent },
    { path: 'view-profile/:id', component: ProfileDetailComponent },
    { path: '', redirectTo: '/profiles', pathMatch: 'full' },
];
