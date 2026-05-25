export class Project {
    constructor(
        public id: string,
        public title: string,
        public type: string,
        public description: string,
        public picturePath: string | null,
        public link: string,
        public annee: number,
        public client: string
    ) { }
}