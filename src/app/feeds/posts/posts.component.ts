import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  post: any = [];
  urls: any = [];
  x: any;
  postContent: any;
  type: any;
  selectedMessage: any = [];
  showreply: any = 0;
  selectedreply: any  = [];
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  constructor() {
    if (localStorage.getItem('post')) {
      this.post = JSON.parse(localStorage.getItem('post'));
    }
  }

  ngOnInit() {

  }
  creatPost() {
    if (this.postContent || this.urls.length > 0) {
      const data = {
        id: this.post.length,
        post_text: this.postContent,
        post_image: this.urls,
        islike: 0,
        iscomment: [],
        comments_count: 0
      };
      this.post.unshift(data);
      localStorage.setItem('post', JSON.stringify(this.post));
      this.post = JSON.parse(localStorage.getItem('post'));
      this.postContent = '';
      this.urls = [];
      this.closeBtn.nativeElement.click();
    } else {
      alert('please add some contant');
    }
  }
  detectFiles(event) {
    this.urls = [];
    this.x = event.target.files;
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  removeImage(index) {
    this.urls.splice(index, 1);
  }
  likePost(i) {
    this.post[i].islike = 1;
    console.log(this.post[i].islike);
    localStorage.setItem('post', JSON.stringify(this.post));
    this.post = JSON.parse(localStorage.getItem('post'));
  }
  unlikePost(i) {
    this.post[i].islike = 0;
    console.log(this.post[i].islike);
    localStorage.setItem('post', JSON.stringify(this.post));
    this.post = JSON.parse(localStorage.getItem('post'));
  }
  // showSuccess(title, message) {
  //   this.toastr.success(title, message);
  // }
  // showError(title, message) {
  //   this.toastr.error(title, message);
  // }


  checkType(type) {
    this.type = type;
  }

  getComment(i) {
    console.log(i);
    this.selectedMessage.push(i);
  }
  createComment(index, id, message, feed) {
    const data = {
      post_id: index,
      comment: id
    };
    console.log(data);
    this.post[index].iscomment.unshift({ comment: message, id: index + '-' + id, islike: 0, isreply: [], isreplycount: 0 });
    this.post[index].comments_count = this.post[index].iscomment.length;
    feed.message = '';
    localStorage.setItem('post', JSON.stringify(this.post));
    this.post = JSON.parse(localStorage.getItem('post'));
  }
  likeComment(i, j) {
    this.post[i].iscomment[j].islike = 1;
    localStorage.setItem('post', JSON.stringify(this.post));
    this.post = JSON.parse(localStorage.getItem('post'));
  }
  unlikeComment(i, j) {
    this.post[i].iscomment[j].islike = 0;
    localStorage.setItem('post', JSON.stringify(this.post));
    this.post = JSON.parse(localStorage.getItem('post'));
  }
  createreply(index, id, message, feed, j) {
    const data = {
      post_id: index,
      comment: id
    };
    console.log(data);
    this.post[index].iscomment[j].isreply.unshift({ comment: message });
    this.post[index].iscomment[j].isreplycount = this.post[index].iscomment[j].isreply.length;
    feed.message = '';
    localStorage.setItem('post', JSON.stringify(this.post));
    this.post = JSON.parse(localStorage.getItem('post'));
  }
  getreply(i) {
    console.log(i);
    this.selectedreply.push(i);
  }
}
