import { Convertor, ModelConverter } from '../../helper/model-converter';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PlayerEntity, Team } from '../../model';

@Entity({ name: 'team' })
@Convertor(Team, TeamEntity)
export class TeamEntity extends ModelConverter<Team> {
  @PrimaryGeneratedColumn('uuid')
  public id: uuid;

  @Column({ type: 'int', default: 0 })
  public score: number;

  @ManyToMany(() => PlayerEntity, (player) => player.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  public players: PlayerEntity[];
}
