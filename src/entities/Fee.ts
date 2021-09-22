import { ObjectType, Field } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity()
class Fee extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number

  @Field()
  @Column({ type: 'numeric', scale: 8 })
  amount: number

  @Field()
  @Column()
  time: number

  @Field()
  @Column({ type: 'numeric', scale: 2 })
  probability: number
}

export default Fee
