import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { RulesComponent } from './pages/rules.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rules', component: RulesComponent },
  { path: '**', redirectTo: '' },
];
