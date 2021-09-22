import { ObjectType, Field } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
class Rate extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

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
  @UpdateDateColumn()
  updatedAt: Date
}

export default Rate
