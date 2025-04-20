import { Convertor, ModelConverter } from '../../helper/model-converter';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from '../../model';

@Entity({ name: 'player' })
@Convertor(Player, PlayerEntity)
export class PlayerEntity extends ModelConverter<Player> {
  @PrimaryGeneratedColumn('uuid')
  public id: uuid;

  @Column({ type: 'varchar', length: 30 })
  public firstName: string;

  @Column({ type: 'varchar', length: 30 })
  public lastName: string;

  @Column({ type: 'boolean', default: false })
  public register: boolean;
}
