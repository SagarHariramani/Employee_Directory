export class Role{
    public id:number;
    public name:string;
    public locationId:number;
    public departmentId:number;
    public description:string;
    constructor(id:number,name:string,locationId:number,departmentId:number,description:string){
        this.id=id;
        this.name=name;
        this.locationId=locationId;
        this.departmentId=departmentId;
        this.description=description;
    }
}