import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{

  // posts: any[] = [];

  get posts(){
    return this.postService.posts;
  }

  constructor(private postService: PostServiceService){
    // this.posts = this.postService.posts;
  }

  ngOnInit(): void {
      this.postService.loadPosts();
  }
}
