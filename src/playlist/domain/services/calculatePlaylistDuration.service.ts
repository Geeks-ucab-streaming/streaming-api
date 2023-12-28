import { ISongRepository } from 'src/songs/domain/ISongRepository';
import { Playlist } from '../playlist';
import { Song } from 'src/songs/domain/song';

export class CalculatePlaylistDurationService {
  static instance: CalculatePlaylistDurationService;
  private constructor() {}

  public static getInstance(): CalculatePlaylistDurationService {
    if (!CalculatePlaylistDurationService.instance) {
      CalculatePlaylistDurationService.instance =
        new CalculatePlaylistDurationService();
    }
    return CalculatePlaylistDurationService.instance;
  }

  async execute(playlist: Playlist, songRepository: ISongRepository) {
    let duration = 0;
    const songs: Song[] = await songRepository.findSongsInCollection(
      playlist.PlaylistSong,
    );
    for (const song of songs) {
      duration += song.Duration;
    }
    playlist.setDuration(duration);
  }
}
