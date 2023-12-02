import { artist_entity } from "src/artists/domain/artist_v2";
import { song_name_VO } from "./song_name_VO";
import { creation_date_song } from "./creation_date_song_VO";
import { song_reference } from "./song_reference_VO";
import { song_preview } from "./song_preview_VO";
import { song_image } from "./song_image_VO";
import { song_genres } from "./song_genres_VO";
import { Idsong } from "./id_song_VO";
import { song_reproductions } from "./song_reproductions_VO";

export class song_entity{

id:Idsong;
name:song_name_VO;
creation:creation_date_song;
reference:song_reference;
preview:song_preview;
image:song_image;
reproductions:song_reproductions;
genres:song_genres;
artist:artist_entity;


}