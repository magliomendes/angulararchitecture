import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-animals-list-itens',
    templateUrl: './list-itens.component.html',
    styleUrls: ['./list-itens.component.scss'],
})
export class AnimalsItemComponent implements OnInit {

    animalsList: any[] = [];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.animalsList = new Array(7)
    }

}
