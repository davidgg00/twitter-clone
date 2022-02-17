import { DataTypes, Optional } from "sequelize";
import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import db from "../database/config";
import User from "./User";

export interface TweetsAttributes {
  id: number;
  user_id: number;
  tweet_text: string;
  tweet_image?: string;
  original_tweet_id?: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "tweets",
  timestamps: true,
})
export default class Tweet extends Model<Tweet> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column
  public user_id!: number;

  @BelongsTo(() => User)
  public user!: User;

  @AllowNull(false)
  @NotEmpty
  @Column
  public tweet_text!: string;

  @AllowNull(true)
  @Column
  public tweet_image?: string;

  @ForeignKey(() => Tweet)
  @AllowNull(true)
  @Column
  public original_tweet_id?: number;

  @HasMany(() => Tweet)
  public original_tweet!: Tweet;

  @BelongsTo(() => Tweet)
  public original_tweet_user!: Tweet;

  @AllowNull(false)
  @NotEmpty
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  public updatedAt!: Date;
}
