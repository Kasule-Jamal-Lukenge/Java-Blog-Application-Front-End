import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{

  posts = this.postService.posts;

  constructor(private postService: PostServiceService){}

  ngOnInit(): void {
      this.postService.loadPosts();
  }
}
