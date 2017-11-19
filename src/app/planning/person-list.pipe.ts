import { Pipe, PipeTransform } from "@angular/core";
import { PersonPlanning } from "../app.model";

@Pipe({
  name: "personList"
})
export class PersonListPipe implements PipeTransform {

  transform(value: Array<PersonPlanning>, args?: any): string {
    if (!value) {
      return "";
    }
    return value.map(v => {
      if (v.phone) {
        return v.familly + " " + v.firstName + " (" + v.phone + ")";
      }
      return v.familly + " " + v.firstName;
    }).sort().map(v => "<div class='v-name'>" + v + "</div>").join("");
  }

}
