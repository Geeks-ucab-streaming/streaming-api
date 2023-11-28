import { artist_id } from "../value objects/artist_id_VO";
import { artist_name } from "../value objects/artist_name_VO";
import { artist_image_reference } from "../value objects/artist_image_reference_VO";

export class artist_entity{
private id: artist_id;
private name: artist_name;
private image_reference: artist_image_reference;


constructor (id: artist_id, name: artist_name, image_reference: artist_image_reference){
this.id = id;
this.name = name;
this.image_reference = image_reference;
}

}
