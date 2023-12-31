export class UserSnapShot{
  public id: string;
  public phoneId: string;
  public phoneNumber: string;
  public lineId: string;
  public lineName: string;
  public email: string;
  public name: string;
  public birth_date: Date;
  public gender: string;
  //public token: string[];

  constructor(id: string,
     phoneId: string,
      phonNumber: string, 
      lineId: string, 
      lineName: string,
 ) {
    this.id = id;
    this.phoneId = phoneId;
    this.phoneNumber = phonNumber;
    this.lineId = lineId;
    this.lineName = lineName;
  
  } 

  get Id(): string {
    return this.id;
  }
  
  get PhoneId(): string {
    return this.phoneId;
  }

  get PhoneNumber(): string {
    return this.phoneNumber;
  } 

  get LineId(): string {
    return this.lineId;
  }

  get LineName(): string {
    return this.lineName;
  }

  get Email(): string {
    return this.email;
  }

  get Name(): string {
    return this.name;
  }

  get BirthDate(): Date {
   return this.birth_date;
  }

  get Gender(): string {
    return this.gender;
  }

}