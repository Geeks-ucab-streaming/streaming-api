import { ValueObject} from "src/common/domain/ValueObjects/value-object.interface";


export class song_image implements ValueObject<string> {

private image:string;

getValue(): string {
    return this.image;
  }
    
        equals(vo: this): boolean {
            return this.image === vo.image;
        }
    
        isValid(): boolean {
            return this.image !== null && this.image !== undefined;
        }

}