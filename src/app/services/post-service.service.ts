import { Injectable, signal } from '@angular/core';
import { Post } from '../models/Post';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostServiceService {

  constructor(private http: HttpClient) { }

  private postsSignal = signal<Post[]>([]);
  posts = this.postsSignal.asReadonly();

  private apiUrl = 'http://localhost:8080/api/posts';

  loadPosts(){
    this.http.get<Post[]>(this.apiUrl).pipe(tap((data)=> this.postsSignal.set(data))).subscribe();
  }

  getPostById(id:number){
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
  
  addPost(post: Post){
    return this.http.post<Post>(this.apiUrl, post).pipe(
      tap((newPost)=>{
        this.postsSignal.update((posts) => [...posts, newPost]);
      })
    )
  }
  
}
