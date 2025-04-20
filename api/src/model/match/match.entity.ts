import { Convertor, ModelConverter } from '../../helper/model-converter';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Match, RoundEntity, TeamEntity } from '../../model';

@Entity({ name: 'match' })
@Convertor(Match, MatchEntity)
export class MatchEntity extends ModelConverter<Match> {
  @PrimaryGeneratedColumn('uuid')
  public id: uuid;

  @OneToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public teamOne: TeamEntity;

  @OneToOne(() => TeamEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  public teamTwo: TeamEntity;

  @ManyToOne(() => RoundEntity, { onDelete: 'CASCADE' })
  public round: RoundEntity;
}
