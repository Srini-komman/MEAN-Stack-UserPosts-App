import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  post: Post;
  private displayMode = 'CREATE';
  private postId: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.displayMode === 'CREATE') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.displayMode = 'EDIT';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId)
          .subscribe(postData => {
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            }
          });
      } else {
        this.displayMode = 'CREATE';
        this.postId = null;
      }
    });
  }
}