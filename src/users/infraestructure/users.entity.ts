//Decoradores
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  Check,
} from 'typeorm';
import { PhoneEntity } from '../../phones/infraestructure/phones.entity';
import { StoredEdition } from '../../users/infraestructure/storedEdition.entity';
import { ReproducedSong } from 'src/common/infrastructure/entities/ReproducedSong.entity';
import { User } from '../domain/user';

@Entity('Users')
export class UserEntity extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  birth_date: Date;

  @Column()
  @Check(`genders IN ('M', 'F')`)
  genders: string;

  @OneToOne(() => PhoneEntity, (phones) => phones.user)
  phones: PhoneEntity;

  @OneToMany(() => StoredEdition, (edition) => edition)
  edition: StoredEdition[];

  @OneToMany(() => ReproducedSong, (reproducedSong) => reproducedSong.user)
  reproducedSong: ReproducedSong[];

  //Decoradores Hooks. [Para que se ejecuten, debes crear(instanciar la entidad) y salvar]
  @AfterInsert()
  logInsert() {
    //Se ejecutará este método cuando hagas algo al usuario (Insert, Update, Delete)
    console.log('Inerted User with id ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Update User whit id ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Remove User whit id ', this.id);
  }
}
