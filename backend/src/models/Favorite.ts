import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  userId: mongoose.Types.ObjectId | string;
  type: 'shop' | 'product';
  targetId: string;
  createdAt: Date;
}

const FavoriteSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['shop', 'product'], required: true },
    targetId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

FavoriteSchema.index({ userId: 1, type: 1, targetId: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);
