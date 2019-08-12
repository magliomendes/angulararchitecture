import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-animals-list-itens',
    templateUrl: './list-itens.component.html',
    styleUrls: ['./list-itens.component.scss'],
})
export class AnimalsItemComponent implements OnInit {

    animalsList: any[] = [];

    constructor() { }

    ngOnInit(): void {
        this.animalsList = new Array(7)
    }

}
