export class Product{
    public name!: string;
    public price !: string;
    public count !: number;
    public description !: string;
    public id: any;
    constructor(name: string, price: string, count: number, description: string, id: any){
        this.name = name;
        this.price = price;
        this.count = count;
        this.description = description;
        this.id = id;
    }
}