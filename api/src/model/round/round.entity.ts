import { Convertor, ModelConverter } from '../../helper/model-converter';
import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm';
import { MatchEntity, Round } from '../../model';

@Entity({ name: 'round' })
@Convertor(Round, RoundEntity)
export class RoundEntity extends ModelConverter<Round> {
  @PrimaryGeneratedColumn('uuid')
  public id: uuid;

  @Column({ type: 'int' })
  public roundNumber: number;

  @OneToMany(() => MatchEntity, (m) => m.round, { onDelete: 'CASCADE' })
  public matchs: MatchEntity[];
}
