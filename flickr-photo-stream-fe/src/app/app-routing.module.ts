import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './modules/users/users/users.component';
import { FlickrComponent } from './modules/flickr/flickr/flickr.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'photostream', component: FlickrComponent},
  { path: '**', redirectTo: 'catalog' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
