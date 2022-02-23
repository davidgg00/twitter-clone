import User from "./User";
import {
  AllowNull,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
} from "sequelize-typescript";
import Tweet from "./Tweet";

@Table({
  tableName: "notifications",
  timestamps: true,
})
export default class Notification extends Model<Notification> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    as: "user",
  })
  public user!: User;

  @ForeignKey(() => User)
  @Column
  public user_id_send!: number;

  @BelongsTo(() => User, {
    as: "user_send",
    foreignKey: "user_id_send",
  })
  public user_send!: User;

  @ForeignKey(() => Tweet)
  @AllowNull(true)
  @Column
  public tweet_id?: number;

  @BelongsTo(() => Tweet)
  public tweet!: Tweet;

  @AllowNull(false)
  @Column
  public type!: string;

  @AllowNull(true)
  @Column
  public readed!: boolean;

  @AllowNull(false)
  @NotEmpty
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  public updatedAt!: Date;
}
