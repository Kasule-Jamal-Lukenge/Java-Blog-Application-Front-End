import { Component } from '@angular/core';
import { Post } from '../../models/Post';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostServiceService } from '../../services/post-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required] // Later: get from logged-in user
    });
  }

  submit() {
    if (this.postForm.invalid) {
      return;
    }

    const newPost: Post = {
      id: 0, // backend will generate
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      author: this.postForm.value.author,
      createdAt: new Date().toISOString()
    };

    this.postService.addPost(newPost).subscribe({
      next: () => {
        console.log('Post created successfully');
        this.router.navigate(['/posts']);
      },
      error: (err) => console.error('Failed to create post:', err)
    });
  }
}
