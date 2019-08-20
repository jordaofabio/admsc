import { Component, OnInit } from '@angular/core';
import { Post, ConfirmPost } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  confirmPost: ConfirmPost;
  hideModal = true;
  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.confirmPost = new ConfirmPost();
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((ret: any) => {
      this.posts = ret.rows;
    });
  }

  Confirm(page: ConfirmPost) {
    this.hideModal = false;
    this.confirmPost = page;
  }

  deletePost() {
    this.postService.deletePost(this.confirmPost.id).subscribe(
      (ret: any) => {
        this.hideModal = true;
        this.posts.splice(this.posts.findIndex(x => x.id === this.confirmPost.id), 1);
      }
    );
  }
}
