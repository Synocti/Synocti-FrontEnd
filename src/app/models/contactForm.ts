export class ContactForm {
    constructor(
        public fullName: string,
        public email: string,
        public phone: string,
        public contactMethod: string,
        public subject: string,
        public message: string,
    ) { }
}