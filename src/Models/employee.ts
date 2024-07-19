export class Employee {
    public id: number;
    public empId: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNo: string;
    public roleId: number;
    public dob: Date;
    public joiningDate: Date;
    public projectId: number;
    public managerId: number;
    public profilePicture: string;
    public status: string;
    public isDeleted: boolean;

    constructor(id: number, empId: string, firstName: string, lastName: string, email: string, phone: string, roleId: number, dob: Date, joiningDate: Date, projectId: number, managerId: number,profilePicture:string,status:string, isDeleted: boolean) {
        this.id = id;
        this.empId = empId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNo = phone;
        this.roleId = roleId;
        this.dob = dob;
        this.joiningDate = joiningDate;
        this.projectId = projectId;
        this.managerId = managerId;
        this.profilePicture = profilePicture;
        this.status = status;
        this.isDeleted = isDeleted;
    }


}