import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchuser'
})
export class SearchuserPipe implements PipeTransform {

  public person: Array<any> = [];
  transform(Persons: any[], searchContent: String): any[] {
    console.log("Search text", searchContent);
    if (searchContent) {
      this.person = [];
      Persons.forEach(element => {
        if (element.UserId.includes(searchContent) || element.FullName.fname.includes(searchContent) || element.FullName.mname.includes(searchContent) || element.FullName.lname.includes(searchContent) || element.Address.addr1.includes(searchContent) || element.Address.addr2.includes(searchContent) || element.Address.addr3.includes(searchContent)) {
          console.log(this.person);
          this.person.push(element);
        }
      });
      return this.person;
    }
    else {
      return Persons;
    }


  }

}
