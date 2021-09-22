import { ObjectType, Field } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
class HistoricalFee extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'numeric', scale: 8 })
  maxFee: number

  @Field()
  @Column({ type: 'numeric', scale: 8 })
  minFee: number

  @Field()
  @Column({ type: 'numeric', scale: 8 })
  midFee: number

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  usd: number

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  eur: number

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  gbp: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date
}

export default HistoricalFee
