import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagarrayService {
  calculate(tags){
    var list = [];
    if (tags.isIt){list.push(1);}
    if (tags.isMaths){list.push(2);}
    if (tags.isPhysics){list.push(3);}
    if (tags.isChemistry){list.push(4);}
    if (tags.isElectronics){list.push(5);}
    if (tags.isTeaching){list.push(6);}
    if (tags.isPresentations){list.push(7);}
    if (tags.isForeign_languages){list.push(8);}
    if (tags.isErasmus_students){list.push(9);}
    if (tags.isConferences){list.push(10);}
    if (tags.isPhysical){list.push(11);}
    if (tags.isSport){list.push(12);}
    console.log(list);
    return list;
  }
  constructor() { }
}
