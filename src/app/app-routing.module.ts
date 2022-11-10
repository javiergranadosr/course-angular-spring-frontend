import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { FormComponent } from './clients/form/form.component';

const routes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/create', component: FormComponent },
  { path: 'clients/edit/:id', component: FormComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
