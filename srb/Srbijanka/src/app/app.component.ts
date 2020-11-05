import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  title = 'Srbijanka';

  sakri:boolean=false;

  @HostListener('document:scroll',[])
 public scrollfunction(event){
  console.log('dafsdfasdfasdf')
 
    if(document.body.scrollTop>100 || document.documentElement.scrollTop>100){
      this.sakri=true
      console.log('dafsdfasasdfasddfasdf')

    }else{
      this.sakri=false
    }

  }
 


}
