import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
  },
];

@NgModule({
  declarations: [PersonComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule, MatProgressBarModule, MatButtonModule, MatIconModule],
  exports: [PersonComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PersonModule {}
