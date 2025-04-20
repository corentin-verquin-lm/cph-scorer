import { Convertor, ModelConverter } from '../../helper/model-converter';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PlayerEntity, Ranking, RankingType } from '../../model';

@Entity({ name: 'ranking' })
@Convertor(Ranking, RankingEntity)
export class RankingEntity extends ModelConverter<Ranking> {
  @PrimaryGeneratedColumn('uuid')
  public id: uuid;

  @Column({ type: 'int', default: 1 })
  public participation: number;

  @Column({ type: 'int', default: 0 })
  public point: number;

  @Column({ type: 'int', default: 0 })
  public goalAverage: number;

  @Column({ type: 'enum', enum: RankingType })
  public type: RankingType;

  @ManyToMany(() => PlayerEntity, (player) => player.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  public players: PlayerEntity[];
}
