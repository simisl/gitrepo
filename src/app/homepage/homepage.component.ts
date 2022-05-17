import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface personal{
  avatar_url: string;
  name: string;
  html_url:string;
  location:string;
  bio:string;
  twitter_username:string;
  public_repos:number;
}
interface repo{
  name:string;
  description:string;
  topics:string[];

}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  personalData!: personal;
  personalRepo!: repo[];
  count!: number ;
  p: number = 1;
  pageNumber!:number;
  loading!: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this.pageNumber = 1
    var v = 'simisl'
    this.http.get<personal>('https://api.github.com/users/simisl ').subscribe(data=>{
      this.personalData = data
      this.count = this.personalData.public_repos;
      console.log('data',data)
    })
      this.http.get<repo[]>(`https://api.github.com/users/simisl/repos?q=addClass+simisl:mozilla&per_page=10&page=${this.pageNumber}`).subscribe(data=>{

      this.personalRepo = data
      this.loading = false
    })
  }
  pageChanged(pageNo: number,e:Event){
    this.loading = true
    console.log(pageNo,e)
    this.pageNumber = pageNo;
    this.http.get<repo[]>(`https://api.github.com/users/simisl/repos?q=addClass+simisl:mozilla&per_page=10&page=${this.pageNumber}`).subscribe(data=>{
      this.personalRepo = data
      this.loading = false
    })

  }
}
