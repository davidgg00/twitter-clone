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
} from "sequelize-typescript";

@Table({
  tableName: "followers",
  timestamps: true,
})
export default class Follower extends Model<Follower> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    as: "user",
  })
  public user!: User;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  public follower_id!: number;

  @BelongsTo(() => User, {
    as: "follower",
    foreignKey: "follower_id",
  })
  public follower!: User;

  @AllowNull(false)
  @NotEmpty
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  public updatedAt!: Date;
}
