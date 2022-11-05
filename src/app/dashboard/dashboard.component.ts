import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  throttle = 500;
  itemcount=3;
  scrollDistance = 1;
  scrollUpDistance = 2;
  showMore: boolean = false;
  showContentMore: boolean = false;
  public allArticles: any = [];
  public articles: any = [];
  selectedIndex: number = 0;

  constructor(private userService: UserService) {}
  ngOnInit() {
    console.log('inside ngoninit');
    this.getNewsFeed();
  }
  onScrollDown(){
    this.getNextItems()
  }

  getNextItems(): boolean {
    if (this.articles.length >= this.allArticles.length) {
      return false;
    }
    const remainingLength = Math.min(
      this.itemcount,
      this.allArticles.length - this.articles.length
    );
    this.articles.push(
      ...this.allArticles.slice(
        this.articles.length,
        this.articles.length + remainingLength
      )
    );
    return true;
  }
  showMoreInfo(event: boolean, index: number) {
    this.showMore = true;
    this.selectedIndex = index;
  }

  showMoreContent(event: boolean, index: number) {
    this.showContentMore = true;
    this.selectedIndex = index;
  }


  getNewsFeed() {
    console.log('inside function');
    this.userService.getNewsFeed().subscribe((result: any) => {
      if (result && result.articles && result.articles.length > 0) {
        console.log(result,'Result')
        this.allArticles = result.articles;
        this.articles.push(...this.allArticles.slice(0, this.itemcount));
      }
    });
  }
}
