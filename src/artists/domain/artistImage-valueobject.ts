import { ValueObject } from 'src/common/domain/ValueObjects/value-object.interface';
import { Result } from 'src/common/domain/logic/Result';

interface ArtistImageProps {
  value: string;
}

export class ArtistImage extends ValueObject<ArtistImageProps> {
    get value(): string {
        return this.props.value;
    }
    
    private constructor(props: ArtistImageProps) {
        super(props);
    }
    
    public static create(image: string): Result<ArtistImage> {
        if (!!image === false || image.length === 0) {
        return Result.fail<ArtistImage>('No puede contener un nombre vacio');
        } else {
        return Result.ok<ArtistImage>(new ArtistImage({ value: image }));
        }
    }
    }