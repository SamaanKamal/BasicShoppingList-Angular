import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') className:boolean=false;
  @HostListener('click') clicked(){
    this.className= !this.className;
  }
  constructor() { }

}
