import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.css']
})
export class BirthdayComponent implements OnInit {

  colors : Array<string> = [
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red', 
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red', 
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
    'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red',
  ];

  who! : string;
  colorSelected : string = 'red';
  source : Observable<number> = timer(1000, 500);
  public loadExternalScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  constructor(private activatedRoute : ActivatedRoute) {
    this.source.subscribe((val: number) => {
         this.colorSelected = this.colors[val];                    
  });
  }
  ngOnInit(){
    this.loadExternalScript('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js');
    this.loadExternalScript('assets/js/script.js');
  this.loadExternalScript('assets/js/confetti.js');

  this.activatedRoute.queryParams.subscribe((params: Params) => {

    
    if(params['who']) {
        let names : string[] = String(params['who']).split(' '); 
        names.map((name, index, array) => {
          array[index] = name.replace(name.slice(0, 1), name.charAt(0).toUpperCase())
        });
        this.who = names.join(' ');
    } else {
      this.who = 'To You';
    }
  });
  
}
}
