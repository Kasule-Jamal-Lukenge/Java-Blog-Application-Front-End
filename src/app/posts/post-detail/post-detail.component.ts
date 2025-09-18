import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';
import { PostServiceService } from '../../services/post-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [
    CommonModule
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {

  post?: Post;

  constructor(private route: ActivatedRoute, private postService: PostServiceService){}

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.postService.getPostById(id).subscribe(
        (p) => this.post = p
      );
  }
}
