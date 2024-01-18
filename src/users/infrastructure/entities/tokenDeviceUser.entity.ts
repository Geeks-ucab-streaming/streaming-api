//Decoradores
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn, ManyToOne,
} from 'typeorm';
import {UserEntity} from "./users.entity";

@Entity('TokenDeviceUser')
export class TokenDeviceUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    token: string;

    @ManyToOne(() => UserEntity, (user) => user.tokenDeviceUser)
    @JoinColumn()
    user: UserEntity;
}