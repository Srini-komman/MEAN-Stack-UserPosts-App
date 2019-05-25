import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostCreateComponent } from './components/post/post-create.component';

const routes: Routes = [
    { path: '', component: PostListComponent},
    { path: 'create', component: PostCreateComponent },
    { path: 'edit/:postId', component: PostCreateComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
