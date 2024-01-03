import { GetSongBPlaylistIdService } from "src/songs/application/services/getSongsByPlaylistId.service";
import { Dummy_Songs_Repo } from "../stub/Dummy_Songs_Repo";
import { Playlist } from "src/playlist/domain/playlist";

export class OMGetSongByPlaylistIdService {

    public static getplaylistValid(): string {
        const playlist = "1";
        return playlist;
    }

    public static GetSongByPlaylistIdServicemock(): GetSongBPlaylistIdService {
        const repo = new Dummy_Songs_Repo();

        return new GetSongBPlaylistIdService(repo);
    }

    public static GetplaylistnotValid(): string {
        const dto = "-11";
        return dto;
    }
}

