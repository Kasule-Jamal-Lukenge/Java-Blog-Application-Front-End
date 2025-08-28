import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { authGuard } from './auth/auth.guard';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { CommentsComponent } from './comments/comments/comments.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'posts', component: PostListComponent},
    {path: 'posts/:id', component: PostDetailComponent, canActivate: [authGuard]},
    {path: 'post-form', component: PostFormComponent, canActivate: [authGuard]},
    {path: 'comments', component: CommentsComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: 'home'}
];
