import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'books', loadChildren: () => import('./books/books.module').then(module => module.BooksModule) },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
